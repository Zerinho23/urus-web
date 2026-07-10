import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod/v4";
import { TEBEX_PACKAGES } from "../tebex-packages";

const router = Router();

const TEBEX_SECRET = process.env["TEBEX_SECRET_KEY"];
const TEBEX_WEBSTORE_ID = process.env["TEBEX_WEBSTORE_ID"];
const TEBEX_BASE = "https://headless.tebex.io/api";

// Prevent abuse/DoS of the Tebex basket-creation flow (each call hits Tebex's API).
const checkoutLimiter = rateLimit({
  windowMs: 60_000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Demasiadas solicitudes de pago. Intenta de nuevo en un momento." },
});

const checkoutSchema = z.object({
  items: z.array(
    z.object({
      name: z.string(),
      quantity: z.number().int().min(1).default(1),
    })
  ).min(1),
  completeUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

router.post("/checkout", checkoutLimiter, async (req, res) => {
  if (!TEBEX_SECRET || !TEBEX_WEBSTORE_ID) {
    res.status(503).json({
      error: "tebex_not_configured",
      message: "Tebex no está configurado aún. Contacta al soporte por Discord.",
    });
    return;
  }

  const parsed = checkoutSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Datos inválidos", details: parsed.error.issues });
    return;
  }

  const { items, completeUrl, cancelUrl } = parsed.data;

  const tebexHeaders = {
    "X-Tebex-Secret": TEBEX_SECRET,
    "Content-Type": "application/json",
  };

  try {
    const basketRes = await fetch(`${TEBEX_BASE}/accounts/${TEBEX_WEBSTORE_ID}/baskets`, {
      method: "POST",
      headers: tebexHeaders,
      body: JSON.stringify({
        complete_url: completeUrl ?? "https://panelurus.com?checkout=success",
        cancel_url: cancelUrl ?? "https://panelurus.com?checkout=cancelled",
        complete_auto_redirect: true,
      }),
    });

    if (!basketRes.ok) {
      const err = await basketRes.text();
      req.log.error(
        { status: basketRes.status, webstoreId: TEBEX_WEBSTORE_ID, err: err.slice(0, 200) },
        "Tebex basket creation failed"
      );
      res.status(502).json({
        error: "No se pudo crear el basket en Tebex",
        detail: `Tebex respondió ${basketRes.status}. Verifica que TEBEX_WEBSTORE_ID sea el Public Token.`,
      });
      return;
    }

    const basketRaw = await basketRes.json() as Record<string, unknown>;
    req.log.info({ basketRaw }, "Tebex basket raw response");

    // Support both {data:{ident}} and flat {ident}
    const basketData = (basketRaw["data"] ?? basketRaw) as { ident?: string; links?: { checkout?: string } };
    const ident = basketData["ident"];
    const links = basketData["links"];

    if (!ident) {
      req.log.error({ basketRaw }, "Tebex basket missing ident");
      res.status(502).json({
        error: "Tebex basket sin ident",
        detail: "Respuesta inesperada de Tebex al crear basket",
        basketRaw,
      });
      return;
    }
    req.log.info({ ident, links }, "Tebex basket created");

    const skipped: string[] = [];
    const failed: string[] = [];
    let addedCount = 0;
    let authRequired = false;

    for (const item of items) {
      const packageId = TEBEX_PACKAGES[item.name];
      if (!packageId) {
        skipped.push(item.name);
        req.log.warn({ itemName: item.name }, "No Tebex package_id configured for item");
        continue;
      }

      // Tebex Headless: add package via POST /baskets/{ident}/packages (no account prefix)
      const pkgRes = await fetch(`${TEBEX_BASE}/baskets/${ident}/packages`, {
        method: "POST",
        headers: tebexHeaders,
        body: JSON.stringify({ package_id: packageId, quantity: item.quantity }),
      });

      if (!pkgRes.ok) {
        const errText = await pkgRes.text();
        req.log.error(
          { packageId, itemName: item.name, status: pkgRes.status, err: errText.slice(0, 300) },
          "Tebex rejected package"
        );
        // 422 "User must login" = Tebex requires game-account auth on their checkout page
        // Treat as success path — user will authenticate directly on Tebex
        if (pkgRes.status === 422 && errText.toLowerCase().includes("login")) {
          authRequired = true;
          addedCount++;
          req.log.info({ packageId, itemName: item.name }, "Package needs auth on Tebex checkout — redirecting anyway");
        } else {
          failed.push(`${item.name} (Tebex ${pkgRes.status}: ${errText.slice(0, 120)})`);
        }
      } else {
        addedCount++;
        req.log.info({ packageId, itemName: item.name }, "Package added to basket");
      }
    }

    // Only block checkout if ALL items are unconfigured (packageId = 0)
    if (addedCount === 0 && skipped.length === items.length) {
      res.status(422).json({
        error: "products_not_configured",
        message: "Estos productos aún no están vinculados a Tebex. Contacta al soporte por Discord.",
        skipped,
      });
      return;
    }

    // Non-auth hard failures with nothing added → block
    if (addedCount === 0 && failed.length > 0) {
      res.status(422).json({
        error: "products_not_configured",
        message: "No se pudieron agregar los productos al basket de Tebex. Revisa los IDs en tebex-packages.ts.",
        failed,
      });
      return;
    }

    const checkoutUrl = links?.checkout ?? `https://checkout.tebex.io/checkout/${ident}`;
    req.log.info({ checkoutUrl, authRequired, skipped, failed }, "Redirecting to Tebex checkout");
    res.json({ checkoutUrl, basketIdent: ident, skipped, failed, authRequired });
  } catch (err) {
    req.log.error({ err }, "Error during Tebex checkout");
    res.status(500).json({ error: "Error interno al procesar el checkout" });
  }
});

export default router;
