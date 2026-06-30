import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = req.body as Record<string, unknown>;
  const type = body?.type as string | undefined;

  console.log("Tebex webhook received:", type);

  if (type === "validation.webhook") {
    res.status(200).json({ success: true });
    return;
  }

  if (type === "payment.completed") {
    console.log("Payment completed:", JSON.stringify(body.subject));
  }

  res.status(200).json({ received: true });
}
