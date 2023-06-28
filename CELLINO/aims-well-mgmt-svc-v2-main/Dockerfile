FROM node:lts-bullseye-slim As build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
WORKDIR /app
COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
RUN yarn install --frozen-lockfile
COPY --chown=node:node . .
RUN yarn run build
RUN yarn install --frozen-lockfile --production=true && yarn cache clean

FROM node:lts-bullseye-slim
ENV NODE_ENV production
COPY --chown=node:node --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER node
WORKDIR /app
COPY --chown=node:node --from=build /app/node_modules /app/node_modules
COPY --chown=node:node --from=build /app/dist /app
CMD ["dumb-init", "node", "src/main.js" ]
