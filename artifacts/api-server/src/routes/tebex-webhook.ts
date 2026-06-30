import { Router } from "express";

const router = Router();

/**
 * Tebex Webhook Endpoint
 *
 * Tebex llama a este endpoint cuando ocurre un evento (pago completado, etc.)
 * También lo usa para VALIDAR el webhook antes de permitir paquetes sin deliverable.
 *
 * URL pública: https://<tu-dominio>/api/tebex/webhook
 */
router.post("/tebex/webhook", (req, res) => {
  const body = req.body as Record<string, unknown>;
  const type = body?.type as string | undefined;

  req.log.info({ type }, "Tebex webhook received");

  // Tebex validation handshake — siempre responder 200
  if (type === "validation.webhook") {
    res.status(200).json({ success: true });
    return;
  }

  // Pago completado
  if (type === "payment.completed") {
    const subject = body.subject as Record<string, unknown> | undefined;
    req.log.info({ subject }, "Tebex payment completed");
    // Aquí puedes agregar lógica: notificar Discord, guardar en BD, etc.
  }

  res.status(200).json({ received: true });
});

export default router;
