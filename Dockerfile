FROM node:20-alpine

  WORKDIR /app

  RUN npm install -g pnpm@9.15.4

  # Copy only backend-relevant packages
  COPY package.json ./
  COPY lib/api-zod ./lib/api-zod/
  COPY lib/db ./lib/db/
  COPY artifacts/api-server ./artifacts/api-server/

  # Generate a minimal workspace — only backend packages, no Replit/frontend deps
  RUN printf 'packages:\n  - artifacts/api-server\n  - lib/api-zod\n  - lib/db\ncatalog:\n  zod: ^3.25.0\n  drizzle-orm: ^0.45.2\n  "@types/node": ^22.0.0\n' > pnpm-workspace.yaml

  # Install including devDeps (esbuild is a devDep)
  RUN pnpm install --no-frozen-lockfile

  # Bundle everything into a single file
  RUN pnpm --filter @workspace/api-server run build

  EXPOSE 8080

  CMD ["node", "--enable-source-maps", "artifacts/api-server/dist/index.mjs"]
  