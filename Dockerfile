FROM node:10-alpine
COPY . /src
WORKDIR /src
RUN yarn && yarn ci && yarn build
