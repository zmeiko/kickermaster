FROM node:8-alpine

ARG PORT=8080
ENV PORT $PORT
EXPOSE $PORT

WORKDIR /app/
COPY package.json yarn.lock* ./
RUN yarn install --production && yarn cache clean --force

COPY . .

USER node

ENTRYPOINT ["/app/docker-entrypoint.sh"]

CMD ["node", "server.js"]
