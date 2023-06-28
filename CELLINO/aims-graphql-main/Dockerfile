FROM node:lts-bullseye-slim AS build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
WORKDIR /app
COPY --chown=node:node . /app
RUN npm ci
RUN npm run build
RUN npm ci --omit=dev --ignore-scripts=true

FROM node:lts-bullseye-slim
ENV NODE_ENV production
COPY --chown=node:node --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER node
WORKDIR /app
COPY --chown=node:node --from=build /app/package.json .
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./src
CMD ["dumb-init", "node","src/index.js"]