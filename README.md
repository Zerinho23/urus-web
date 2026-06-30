# Urus Store

Tienda web para venta de productos. Frontend en **Vercel**, backend en **Railway**.

## Estructura del proyecto

```
artifacts/
  urus-store/   → Frontend (React + Vite) → Vercel
  api-server/   → Backend (Express)        → Railway
lib/
  db/           → Schema Drizzle ORM
  api-spec/     → Contrato OpenAPI
  api-zod/      → Schemas Zod generados
```

## Deploy

### Backend en Railway

1. Conecta el repositorio en Railway
2. Railway detecta `nixpacks.toml` y `railway.toml` automáticamente
3. Configura estas variables de entorno en Railway:

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | Railway lo genera automáticamente al añadir PostgreSQL |
| `TEBEX_SECRET_KEY` | Tu clave secreta de Tebex |
| `TEBEX_WEBSTORE_ID` | Tu Public Token de Tebex |
| `CORS_ORIGIN` | URL de tu frontend en Vercel (ej: `https://tu-app.vercel.app`) |

### Frontend en Vercel

1. Conecta el repositorio en Vercel
2. **Root Directory**: `artifacts/urus-store`
3. Vercel detecta `vercel.json` automáticamente
4. Configura esta variable de entorno en Vercel:

| Variable | Descripción |
|---|---|
| `VITE_API_BASE_URL` | URL del backend en Railway + `/api` (ej: `https://tu-api.up.railway.app/api`) |

## Desarrollo local

```bash
# Instalar dependencias
pnpm install

# Levantar el backend
pnpm --filter @workspace/api-server run dev

# Levantar el frontend (en otra terminal)
# En artifacts/urus-store:
npm run dev
```

En local, el frontend usa `/api` relativo (sin necesidad de `VITE_API_BASE_URL`).
