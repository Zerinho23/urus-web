import { Router } from "express";
import { logger } from "../lib/logger";

const router = Router();

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

  if (!res.ok) throw new Error(`PayPal auth failed: ${res.status}`);
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

// POST /paypal/create-order
router.post("/paypal/create-order", async (req, res) => {
  try {
    const { amount, items } = req.body as {
      amount: number;
      items: Array<{ name: string; quantity: number; price: number }>;
    };

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
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount.toFixed(2),
              breakdown: {
                item_total: { currency_code: "USD", value: amount.toFixed(2) },
              },
            },
            items: items.map((i) => ({
              name: i.name.slice(0, 127),
              quantity: String(i.quantity),
              unit_amount: {
                currency_code: "USD",
                value: i.price.toFixed(2),
              },
            })),
          },
        ],
      }),
    });

    const order = (await orderRes.json()) as { id: string };
    res.json({ id: order.id });
  } catch (err) {
    logger.error(err, "PayPal create-order error");
    res.status(500).json({ error: "Failed to create PayPal order" });
  }
});

// POST /paypal/capture-order/:orderID
router.post("/paypal/capture-order/:orderID", async (req, res) => {
  try {
    const { orderID } = req.params;
    const accessToken = await getAccessToken();

    const captureRes = await fetch(
      `${PAYPAL_BASE}/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const capture = await captureRes.json();
    res.json(capture);
  } catch (err) {
    logger.error(err, "PayPal capture-order error");
    res.status(500).json({ error: "Failed to capture PayPal order" });
  }
});

export default router;
