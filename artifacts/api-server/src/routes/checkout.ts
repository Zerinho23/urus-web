import { Router } from "express";
import { z } from "zod/v4";
import { TEBEX_PACKAGES } from "../tebex-packages";

const router = Router();

const TEBEX_SECRET = process.env["TEBEX_SECRET_KEY"];
const TEBEX_WEBSTORE_ID = process.env["TEBEX_WEBSTORE_ID"];
const TEBEX_BASE = "https://headless.tebex.io/api";

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

router.post("/checkout", async (req, res) => {
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

    const basketData = (await basketRes.json()) as {
      data: { ident: string; links?: { checkout?: string } };
    };
    const { ident, links } = basketData.data;
    req.log.info({ ident, links }, "Tebex basket created");

    const skipped: string[] = [];

    for (const item of items) {
      const packageId = TEBEX_PACKAGES[item.name];
      if (!packageId) { skipped.push(item.name); continue; }

      const pkgRes = await fetch(`${TEBEX_BASE}/baskets/${ident}/packages`, {
        method: "POST",
        headers: tebexHeaders,
        body: JSON.stringify({ package_id: packageId, quantity: item.quantity }),
      });

      if (!pkgRes.ok) {
        const err = await pkgRes.text();
        req.log.warn({ packageId, item: item.name, err }, "Failed to add package to basket");
      }
    }

    if (skipped.length === items.length) {
      res.status(422).json({
        error: "products_not_configured",
        message: "Estos productos aún no están vinculados a Tebex. Contacta al soporte.",
        skipped,
      });
      return;
    }

    const checkoutUrl = links?.checkout ?? `https://checkout.tebex.io/checkout/${ident}`;

    res.json({ checkoutUrl, basketIdent: ident, skipped });
  } catch (err) {
    req.log.error({ err }, "Error during Tebex checkout");
    res.status(500).json({ error: "Error interno al procesar el checkout" });
  }
});

export default router;
