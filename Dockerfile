FROM node:18-alpine as builder
WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production --silent

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/ .
RUN yarn
