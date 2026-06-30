FROM node:20-alpine

  WORKDIR /app

  # In node:20-alpine npm global bin (/usr/local/bin) is always in PATH
  RUN npm install -g pnpm@9.15.4

  # Copy entire workspace
  COPY . .

  # Install ALL deps (devDeps needed for esbuild during build)
  RUN pnpm install --no-frozen-lockfile

  # Bundle everything into dist/index.mjs
  RUN pnpm --filter @workspace/api-server run build

  EXPOSE 8080

  CMD ["node", "--enable-source-maps", "artifacts/api-server/dist/index.mjs"]
  