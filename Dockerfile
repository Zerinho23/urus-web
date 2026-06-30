FROM node:20-alpine

  WORKDIR /app

  RUN npm install -g pnpm@9.15.4

  # Copy only what the API server needs
  COPY package.json ./
  COPY lib/api-zod ./lib/api-zod/
  COPY artifacts/api-server ./artifacts/api-server/

  # Write a minimal workspace — only backend packages, no frontend/Replit deps
  RUN printf 'packages:\n  - artifacts/api-server\n  - lib/api-zod\ncatalog:\n  zod: ^3.25.0\n  drizzle-orm: ^0.45.2\n  "@types/node": ^22.0.0\n' > pnpm-workspace.yaml

  # Install all deps (--prod=false keeps devDeps like esbuild)
  RUN pnpm install --no-frozen-lockfile

  # Build (esbuild bundles everything into a single file)
  RUN pnpm --filter @workspace/api-server run build

  EXPOSE 8080

  CMD ["node", "--enable-source-maps", "artifacts/api-server/dist/index.mjs"]
  