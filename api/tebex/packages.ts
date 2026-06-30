import type { VercelRequest, VercelResponse } from "@vercel/node";

const TEBEX_WEBSTORE_ID = process.env.TEBEX_WEBSTORE_ID;
const TEBEX_BASE = "https://headless.tebex.io/api";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  if (!TEBEX_WEBSTORE_ID) {
    res.status(503).json({ error: "TEBEX_WEBSTORE_ID no configurado" });
    return;
  }

  try {
    const r = await fetch(
      `${TEBEX_BASE}/accounts/${TEBEX_WEBSTORE_ID}/categories?includePackages=1`
    );

    if (!r.ok) {
      const txt = await r.text();
      res.status(502).json({ error: `Tebex respondió ${r.status}`, detail: txt.slice(0, 300) });
      return;
    }

    const data = (await r.json()) as {
      data: Array<{
        id: number;
        name: string;
        packages: Array<{ id: number; name: string; base_price: number; currency: string }>;
      }>;
    };

    const packages = data.data.flatMap((cat) =>
      (cat.packages ?? []).map((pkg) => ({
        category: cat.name,
        id: pkg.id,
        name: pkg.name,
        price: pkg.base_price,
        currency: pkg.currency,
      }))
    );

    res.json({ total: packages.length, packages });
  } catch (err) {
    console.error("Tebex packages error:", err);
    res.status(500).json({ error: "Error interno" });
  }
}
