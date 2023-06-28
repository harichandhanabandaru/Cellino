FROM node:lts-bullseye-slim AS build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
WORKDIR /app
COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
# install all the deps required for building the react app
RUN yarn install --frozen-lockfile
COPY --chown=node:node . .
RUN yarn run build
RUN yarn install --frozen-lockfile --production=true && yarn cache clean


FROM node:lts-bullseye-slim
ENV NODE_ENV production
COPY --chown=node:node --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER node
WORKDIR /app
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/build ./build
COPY --chown=node:node --from=build /app/server/server.js ./server.js
COPY --chown=node:node --from=build /app/server/app.js ./app.js
CMD ["dumb-init", "node","server.js"]
