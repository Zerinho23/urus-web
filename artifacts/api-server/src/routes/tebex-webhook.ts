import { Router } from "express";

const router = Router();

router.post("/tebex/webhook", (req, res) => {
  const body = req.body as Record<string, unknown>;
  const type = body?.type as string | undefined;

  req.log.info({ type }, "Tebex webhook received");

  if (type === "validation.webhook") {
    res.status(200).json({ success: true });
    return;
  }

  if (type === "payment.completed") {
    const subject = body.subject as Record<string, unknown> | undefined;
    req.log.info({ subject }, "Tebex payment completed");
  }

  res.status(200).json({ received: true });
});

export default router;
