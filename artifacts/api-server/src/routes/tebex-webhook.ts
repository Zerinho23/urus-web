import { Router } from "express";
import { createHmac, timingSafeEqual } from "node:crypto";

const router = Router();

const TEBEX_WEBHOOK_SECRET = process.env["TEBEX_WEBHOOK_SECRET"];

/**
 * Tebex signs webhook payloads by sending an HMAC-SHA256 of the JSON-encoded
 * `subject` field (hex-encoded) inside `body.signature`. Without verifying
 * this, anyone who finds the webhook URL could POST a fake
 * "payment.completed" event and trick the store into treating an unpaid
 * order as paid.
 *
 * Get the webhook secret from Tebex Creator → Webhooks, and set it as
 * TEBEX_WEBHOOK_SECRET in Railway.
 */
function isValidTebexSignature(body: Record<string, unknown>): boolean {
  if (!TEBEX_WEBHOOK_SECRET) return false;
  const signature = body["signature"] as string | undefined;
  if (!signature) return false;

  const expected = createHmac("sha256", TEBEX_WEBHOOK_SECRET)
    .update(JSON.stringify(body["subject"] ?? {}))
    .digest("hex");

  const expectedBuf = Buffer.from(expected, "hex");
  const receivedBuf = Buffer.from(signature, "hex");
  if (expectedBuf.length !== receivedBuf.length) return false;
  return timingSafeEqual(expectedBuf, receivedBuf);
}

router.post("/tebex/webhook", (req, res) => {
  const body = req.body as Record<string, unknown>;
  const type = body?.type as string | undefined;

  // Tebex's initial "validation.webhook" handshake carries no signature yet —
  // it's how Tebex confirms the endpoint exists before enabling real events.
  if (type === "validation.webhook") {
    req.log.info("Tebex webhook validation handshake received");
    res.status(200).json({ success: true });
    return;
  }

  if (!TEBEX_WEBHOOK_SECRET) {
    req.log.error("TEBEX_WEBHOOK_SECRET is not set — rejecting webhook event to avoid trusting unverified payment data.");
    res.status(503).json({ error: "Webhook no configurado" });
    return;
  }

  if (!isValidTebexSignature(body)) {
    req.log.warn({ type }, "Tebex webhook rejected: invalid or missing signature");
    res.status(401).json({ error: "Firma inválida" });
    return;
  }

  req.log.info({ type }, "Tebex webhook received");

  if (type === "payment.completed") {
    const subject = body.subject as Record<string, unknown> | undefined;
    req.log.info({ subject }, "Tebex payment completed");
  }

  res.status(200).json({ received: true });
});

export default router;
