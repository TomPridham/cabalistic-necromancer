FROM node:12-alpine as builder
COPY ./package*.json ./
RUN npm ci
COPY . .
RUN npm run build && \
    npm prune --production

FROM node:10-alpine
COPY --from=builder ./dist ./dist
COPY --from=builder ./package.json .
COPY --from=builder ./node_modules ./node_modules
USER node
ENV NODE_ENV=production \
    PORT=3000
EXPOSE 3000
CMD ["node", "."]
