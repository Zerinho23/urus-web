FROM node:20-alpine
  WORKDIR /app
  RUN mkdir -p /home/runner && ln -s /app /home/runner/workspace
  COPY artifacts/api-server/dist ./artifacts/api-server/dist
  EXPOSE 8080
  CMD ["node", "--enable-source-maps", "artifacts/api-server/dist/index.mjs"]
  