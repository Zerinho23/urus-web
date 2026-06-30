import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    if (!process.env.DATABASE_URL) {
      res.json([]);
      return;
    }
    try {
      const { Pool } = await import("pg");
      const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
      const { rows } = await pool.query(
        `SELECT * FROM reviews WHERE approved = true ORDER BY created_at DESC LIMIT 50`
      );
      res.json(rows);
    } catch {
      res.json([]);
    }
    return;
  }

  if (req.method === "POST") {
    if (!process.env.DATABASE_URL) {
      res.status(503).json({ error: "Base de datos no configurada aún" });
      return;
    }
    const b = req.body as Record<string, unknown>;
    const { discordUsername, discordDisplayName, discordAvatarUrl, content, product, rating, imageUrl } = b;
    if (!discordUsername || !discordDisplayName || !content) {
      res.status(400).json({ error: "Faltan campos obligatorios" });
      return;
    }
    try {
      const { Pool } = await import("pg");
      const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
      await pool.query(`CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY, discord_username TEXT NOT NULL,
        discord_display_name TEXT NOT NULL, discord_avatar_url TEXT,
        content TEXT NOT NULL, product TEXT, rating INTEGER NOT NULL DEFAULT 5,
        image_url TEXT, approved BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`);
      const { rows } = await pool.query(
        `INSERT INTO reviews (discord_username, discord_display_name, discord_avatar_url, content, product, rating, image_url)
         VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
        [discordUsername, discordDisplayName, discordAvatarUrl ?? null, content, product ?? null, typeof rating === "number" ? rating : 5, imageUrl ?? null]
      );
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error("reviews POST error:", err);
      res.status(500).json({ error: "Error al guardar la reseña" });
    }
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
