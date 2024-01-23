FROM node:18-alpine AS builder

RUN mkdir -p /app

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .
RUN yarn build

FROM node:18-alpine

RUN apk update && apk add --upgrade apk-tools && apk upgrade --available
RUN apk --no-cache add curl

RUN mkdir -p /app
RUN mkdir -p /app/dist/data
RUN chown -R node:node /app
RUN chmod -Rf 775 /app/dist/data

WORKDIR /app

USER root

COPY --from=builder /app .
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/tmp ./tmp
# COPY --from=builder /app/docker-compose.yml ./docker-compose.yml
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/yarn.lock ./yarn.lock

# CMD ["yarn", "start"]

CMD yarn ts-node-dev -r tsconfig-paths/register --inspect --transpile-only --ignore-watch node_modules src/shared/infra/http/server.ts
