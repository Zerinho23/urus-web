import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import rateLimit from "express-rate-limit";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();
const isProduction = process.env["NODE_ENV"] === "production";

// Trust Railway's proxy so req.ip / X-Forwarded-For are read correctly for rate limiting.
app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

// CORS: allow the Vercel frontend (set CORS_ORIGIN env var in Railway).
// In production, an unset CORS_ORIGIN blocks all cross-origin requests instead
// of silently allowing every origin — fail closed, not open.
const allowedOrigin = process.env["CORS_ORIGIN"];
if (!allowedOrigin) {
  if (isProduction) {
    logger.warn("CORS_ORIGIN is not set in production — cross-origin requests will be blocked. Set it to your Vercel domain(s).");
  } else {
    logger.warn("CORS_ORIGIN is not set — allowing all origins (development only).");
  }
}
app.use(
  cors(
    allowedOrigin
      ? {
          origin: allowedOrigin.split(",").map((o) => o.trim()),
          credentials: true,
        }
      : isProduction
        ? { origin: false }
        : undefined,
  ),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// General rate limit for all API traffic.
app.use(
  "/api",
  rateLimit({
    windowMs: 60_000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Demasiadas solicitudes. Intenta de nuevo en un momento." },
  }),
);

app.use("/api", router);

app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  const status = (err as { status?: number; statusCode?: number })?.status ?? (err as { statusCode?: number })?.statusCode ?? 500;
  const rawMessage = (err as { message?: string })?.message ?? "Error interno del servidor";
  logger.error({ err, url: req.url, method: req.method }, "Unhandled error");
  // Never leak internal error details (stack traces, DB messages, etc.) to the client in production.
  const message = isProduction && status >= 500 ? "Error interno del servidor" : rawMessage;
  res.status(status).json({ error: message });
});

export default app;
