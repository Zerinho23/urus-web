import type { VercelRequest, VercelResponse } from "@vercel/node";
import { TEBEX_PACKAGES } from "./_tebex-packages";

const TEBEX_SECRET = process.env.TEBEX_SECRET_KEY;
const TEBEX_WEBSTORE_ID = process.env.TEBEX_WEBSTORE_ID;
const TEBEX_BASE = "https://headless.tebex.io/api";

function isValidItems(items: unknown): items is Array<{ name: string; quantity: number }> {
  return (
    Array.isArray(items) &&
    items.length > 0 &&
    items.every(
      (i) =>
        typeof i === "object" &&
        i !== null &&
        typeof (i as Record<string, unknown>).name === "string" &&
        typeof (i as Record<string, unknown>).quantity === "number"
    )
  );
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!TEBEX_SECRET || !TEBEX_WEBSTORE_ID) {
    res.status(503).json({
      error: "tebex_not_configured",
      message: "Tebex no está configurado. Contacta al soporte por Discord.",
    });
    return;
  }

  const body = req.body as Record<string, unknown>;
  const { items, completeUrl, cancelUrl } = body;

  if (!isValidItems(items)) {
    res.status(400).json({ error: "Datos inválidos: items debe ser un array con name y quantity" });
    return;
  }

  const tebexHeaders = {
    "X-Tebex-Secret": TEBEX_SECRET,
    "Content-Type": "application/json",
  };

  try {
    const basketRes = await fetch(`${TEBEX_BASE}/accounts/${TEBEX_WEBSTORE_ID}/baskets`, {
      method: "POST",
      headers: tebexHeaders,
      body: JSON.stringify({
        complete_url: (completeUrl as string) ?? "https://panelurus.com?checkout=success",
        cancel_url: (cancelUrl as string) ?? "https://panelurus.com?checkout=cancelled",
        complete_auto_redirect: true,
      }),
    });

    if (!basketRes.ok) {
      const err = await basketRes.text();
      res.status(502).json({
        error: "No se pudo crear el basket en Tebex",
        detail: `Tebex respondió ${basketRes.status}: ${err.slice(0, 200)}`,
      });
      return;
    }

    const basketData = (await basketRes.json()) as {
      data: { ident: string; links?: { checkout?: string } };
    };
    const { ident, links } = basketData.data;

    const skipped: string[] = [];

    for (const item of items) {
      const packageId = TEBEX_PACKAGES[item.name];
      if (!packageId) { skipped.push(item.name); continue; }

      await fetch(`${TEBEX_BASE}/baskets/${ident}/packages`, {
        method: "POST",
        headers: tebexHeaders,
        body: JSON.stringify({ package_id: packageId, quantity: item.quantity }),
      });
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
    console.error("Tebex checkout error:", err);
    res.status(500).json({ error: "Error interno al procesar el checkout" });
  }
}
