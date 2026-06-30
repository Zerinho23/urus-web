# Urus Store

Tienda gaming en español para cheats de Free Fire y BloodStrike (Panel Xtreme, Panel Supreme, Bypass APK, etc.). Checkout vía Tebex, reseñas importadas desde Discord.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — API server (port 8080)
- `pnpm --filter @workspace/urus-store run dev` — Vite frontend (port 22749)
- `pnpm run typecheck` — typecheck completo
- `pnpm run build` — build todas las packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerar hooks y Zod desde OpenAPI
- `pnpm --filter @workspace/db run push` — aplicar schema a la DB (solo dev)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite + shadcn/ui + TailwindCSS v4
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validación: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (desde OpenAPI spec)
- Build: esbuild (CJS bundle)
- Discord bot: discord.js ^14
- Checkout: Tebex Headless API

## Where things live

- `lib/api-spec/openapi.yaml` — fuente de verdad del contrato API
- `lib/db/src/schema/reviews.ts` — tabla `reviews` en Drizzle
- `artifacts/api-server/src/routes/` — endpoints: health, reviews, checkout, tebex-webhook
- `artifacts/api-server/src/tebex-packages.ts` — mapeo producto → ID de paquete Tebex
- `artifacts/api-server/src/discord-bot.ts` — bot que captura reseñas del canal Discord
- `artifacts/urus-store/src/` — frontend React (componentes, contexto carrito, páginas)

## Architecture decisions

- Tebex Headless para checkout (no Stripe), compatible con la plataforma del cliente
- Discord bot lee el canal de reseñas y las guarda en DB automáticamente
- Todos los colores CSS son variables HSL; tema oscuro gaming (#050608 fondo, cyan #00ffed acento)
- `zod/v4` (no `zod`) — el monorepo usa el subpath `/v4` en todas partes
- Los IDs de paquetes Tebex van en `tebex-packages.ts` con valor `0` hasta que el owner los configure

## Product

- Landing page completa: Hero, Productos (Free Fire + BloodStrike), Productos gratis, Reseñas, Features, Footer
- Carrito con drawer lateral, integración de checkout a Tebex
- Bot de Discord que guarda reseñas del canal configurado automáticamente

## User preferences

_Populate as you build._

## Gotchas

- `zod/v4` no `zod` en imports del servidor — esbuild no resuelve `zod` sin el subpath
- `TEBEX_WEBSTORE_ID` debe ser el **Public Token** de Tebex, no el Store ID numérico
- El bot de Discord requiere `DISCORD_BOT_TOKEN` y `DISCORD_REVIEW_CHANNEL_ID` en env vars
- `TEBEX_SECRET_KEY` es la clave privada (API key) del webstore en Tebex Creator

## Pointers

- Ver skill `pnpm-workspace` para estructura del workspace, TypeScript y detalles de packages
