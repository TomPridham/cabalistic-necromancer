FROM node:10-alpine as builder
COPY ./package*.json ./
RUN npm ci
COPY . .
RUN npm run build && \
    npm prune --production

FROM node:10-alpine
COPY --from=builder ./dist .
COPY --from=builder ./node_modules ./node_modules
COPY --chown=node:node . .
USER node
ENV NODE_ENV=production \
    TERM=linux \
    PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]
