import { Router } from "express";

const router = Router();

const TEBEX_WEBSTORE_ID = process.env["TEBEX_WEBSTORE_ID"];
const ADMIN_TOKEN = process.env["ADMIN_TOKEN"];
const TEBEX_BASE = "https://headless.tebex.io/api";

router.get("/tebex/packages", async (req, res) => {
  // This lists every package in the Tebex store — internal info, not meant
  // for public consumption. Require an admin token if one is configured.
  if (ADMIN_TOKEN && req.header("x-admin-token") !== ADMIN_TOKEN) {
    res.status(401).json({ error: "No autorizado" });
    return;
  }
  if (!ADMIN_TOKEN) {
    req.log.warn("ADMIN_TOKEN is not set — /api/tebex/packages is publicly accessible to anyone.");
  }

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

    const result = data.data.flatMap((cat) =>
      (cat.packages ?? []).map((pkg) => ({
        category: cat.name,
        id: pkg.id,
        name: pkg.name,
        price: pkg.base_price,
        currency: pkg.currency,
      }))
    );

    res.json({ total: result.length, packages: result });
  } catch (err) {
    req.log.error({ err }, "Error fetching Tebex packages");
    res.status(500).json({ error: "Error interno" });
  }
});

export default router;
