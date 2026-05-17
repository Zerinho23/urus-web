import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { reviewsTable } from "@workspace/db/schema";
import { eq, desc } from "drizzle-orm";
import { z } from "zod/v4";

const router: IRouter = Router();

const submitReviewSchema = z.object({
  discordUsername: z.string().min(2).max(64),
  discordDisplayName: z.string().min(2).max(64),
  content: z.string().min(10).max(1000),
  product: z.string().max(64).optional(),
  rating: z.number().int().min(1).max(5).default(5),
});

router.get("/reviews", async (req, res) => {
  try {
    const reviews = await db
      .select()
      .from(reviewsTable)
      .where(eq(reviewsTable.approved, true))
      .orderBy(desc(reviewsTable.createdAt))
      .limit(50);
    res.json(reviews);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch reviews");
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

router.post("/reviews", async (req, res) => {
  const parsed = submitReviewSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Datos inválidos", details: parsed.error.issues });
    return;
  }

  const { discordUsername, discordDisplayName, content, product, rating } = parsed.data;

  try {
    const [review] = await db
      .insert(reviewsTable)
      .values({
        discordUserId: `web_${Date.now()}`,
        discordUsername,
        discordDisplayName,
        discordAvatarUrl: null,
        content,
        product: product ?? null,
        support: null,
        rating,
        imageUrl: null,
        approved: true,
      })
      .returning();
    res.status(201).json(review);
  } catch (err) {
    req.log.error({ err }, "Failed to save review");
    res.status(500).json({ error: "No se pudo guardar la reseña" });
  }
});

export default router;
