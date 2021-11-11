FROM node:14-alpine AS build
WORKDIR /app
COPY package* yarn.lock ./
RUN yarn install
COPY public ./public
COPY src ./src
RUN yarn build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /code
COPY --from=build /app/build .
EXPOSE 8080:8080
