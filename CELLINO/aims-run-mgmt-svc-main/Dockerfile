FROM node:lts-bullseye-slim As build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
WORKDIR /app
COPY . /app
RUN npm ci
RUN npm run build
RUN npm ci --omit=dev

FROM node:lts-bullseye-slim
ENV NODE_ENV production
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER node
WORKDIR /app
COPY --chown=node:node --from=build /app/node_modules /app/node_modules
COPY --chown=node:node --from=build /app/dist /app
CMD ["dumb-init", "node", "src/main.js" ]
