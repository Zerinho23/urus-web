import { Router } from "express";
import { db, reviewsTable } from "@workspace/db";
import { desc } from "drizzle-orm";
import { z } from "zod/v4";

const router = Router();

const createReviewSchema = z.object({
  discordUsername: z.string().min(1).max(64),
  discordDisplayName: z.string().min(1).max(64),
  discordAvatarUrl: z.string().url().optional().nullable(),
  content: z.string().min(1).max(1000),
  product: z.string().max(128).optional().nullable(),
  rating: z.number().int().min(1).max(5).default(5),
  imageUrl: z.string().url().optional().nullable(),
});

router.get("/reviews", async (req, res) => {
  try {
    const reviews = await db
      .select()
      .from(reviewsTable)
      .orderBy(desc(reviewsTable.createdAt))
      .limit(50);
    res.json(reviews);
  } catch (err) {
    req.log.error(err, "Error fetching reviews");
    res.status(500).json({ error: "Error al obtener reseñas" });
  }
});

router.post("/reviews", async (req, res) => {
  const parsed = createReviewSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Datos inválidos", details: parsed.error.issues });
    return;
  }

  try {
    const [review] = await db
      .insert(reviewsTable)
      .values({
        discordUsername: parsed.data.discordUsername,
        discordDisplayName: parsed.data.discordDisplayName,
        discordAvatarUrl: parsed.data.discordAvatarUrl ?? null,
        content: parsed.data.content,
        product: parsed.data.product ?? null,
        rating: parsed.data.rating,
        imageUrl: parsed.data.imageUrl ?? null,
      })
      .returning();
    res.status(201).json(review);
  } catch (err) {
    req.log.error(err, "Error creating review");
    res.status(500).json({ error: "Error al guardar la reseña" });
  }
});

export default router;
