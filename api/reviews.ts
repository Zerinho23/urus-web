import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Pool } from "pg";

let pool: Pool | null = null;

function getPool(): Pool | null {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  return pool;
}

async function ensureTable(p: Pool) {
  await p.query(`
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      discord_username TEXT NOT NULL,
      discord_display_name TEXT NOT NULL,
      discord_avatar_url TEXT,
      content TEXT NOT NULL,
      product TEXT,
      rating INTEGER NOT NULL DEFAULT 5,
      image_url TEXT,
      approved BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const p = getPool();

  if (req.method === "GET") {
    if (!p) { res.json([]); return; }
    try {
      await ensureTable(p);
      const { rows } = await p.query(
        `SELECT * FROM reviews WHERE approved = true ORDER BY created_at DESC LIMIT 50`
      );
      res.json(rows);
    } catch (err) {
      console.error("reviews GET error:", err);
      res.status(500).json({ error: "Error al obtener reseñas" });
    }
    return;
  }

  if (req.method === "POST") {
    if (!p) {
      res.status(503).json({ error: "Base de datos no configurada" });
      return;
    }
    const b = req.body as Record<string, unknown>;
    const { discordUsername, discordDisplayName, discordAvatarUrl, content, product, rating, imageUrl } = b;

    if (!discordUsername || !discordDisplayName || !content) {
      res.status(400).json({ error: "Faltan campos obligatorios" });
      return;
    }

    try {
      await ensureTable(p);
      const { rows } = await p.query(
        `INSERT INTO reviews (discord_username, discord_display_name, discord_avatar_url, content, product, rating, image_url)
         VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
        [
          discordUsername,
          discordDisplayName,
          discordAvatarUrl ?? null,
          content,
          product ?? null,
          typeof rating === "number" ? rating : 5,
          imageUrl ?? null,
        ]
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
