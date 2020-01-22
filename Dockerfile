FROM node:lts
LABEL maintainer="Ilkka Poutanen <ilkka.poutanen@futurice.com>"

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

EXPOSE 3000
ENTRYPOINT [ "yarn", "start" ]
