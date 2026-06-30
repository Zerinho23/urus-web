FROM node:20-alpine
  WORKDIR /app
  RUN npm install -g pnpm@9.15.4
  COPY package.json ./
  COPY lib/api-zod ./lib/api-zod/
  COPY lib/db ./lib/db/
  COPY artifacts/api-server ./artifacts/api-server/
  RUN printf 'packages:\n  - artifacts/api-server\n  - lib/api-zod\n  - lib/db\ncatalog:\n  zod: ^3.25.0\n  drizzle-orm: ^0.45.2\n  drizzle-zod: ^0.7.0\n  "@types/node": ^22.0.0\n' > pnpm-workspace.yaml
  RUN echo '{"compilerOptions":{"strict":true,"moduleResolution":"bundler"}}' > tsconfig.base.json
  RUN pnpm install --no-frozen-lockfile
  RUN pnpm --filter @workspace/api-server run build
  EXPOSE 8080
  CMD ["node", "--enable-source-maps", "artifacts/api-server/dist/index.mjs"]
  