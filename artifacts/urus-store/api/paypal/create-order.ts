import type { VercelRequest, VercelResponse } from "@vercel/node";

const PAYPAL_BASE =
  process.env["PAYPAL_MODE"] === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

async function getAccessToken(): Promise<string> {
  const clientId = process.env["PAYPAL_CLIENT_ID"];
  const secret = process.env["PAYPAL_SECRET"];
  if (!clientId || !secret) throw new Error("PayPal credentials not configured");
  const credentials = Buffer.from(`${clientId}:${secret}`).toString("base64");
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`PayPal auth failed ${res.status}: ${txt}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.status(200).end(); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  try {
    const { amount } = req.body as { amount: number };

    if (!amount || amount <= 0) {
      res.status(400).json({ error: "Invalid amount" });
      return;
    }

    const accessToken = await getAccessToken();

    const orderRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{
          amount: {
            currency_code: "USD",
            // Use exactly 2 decimal places — PayPal rejects more
            value: Number(amount).toFixed(2),
          },
        }],
      }),
    });

    if (!orderRes.ok) {
      const txt = await orderRes.text();
      console.error("PayPal create-order API error:", txt);
      res.status(500).json({ error: `PayPal error: ${txt}` });
      return;
    }

    const order = (await orderRes.json()) as { id: string };
    res.json({ id: order.id });
  } catch (err) {
    console.error("PayPal create-order error:", err);
    res.status(500).json({ error: String(err) });
  }
}
