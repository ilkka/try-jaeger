FROM node:lts
LABEL maintainer="Ilkka Poutanen <ilkka.poutanen@futurice.com>"

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./

ARG port=3000
EXPOSE ${port}
ENTRYPOINT [ "yarn", "start" ]
