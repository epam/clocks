FROM node:14-alpine AS build
WORKDIR /App
COPY package* ./
RUN npm ci
COPY public ./public
COPY src ./src
COPY tsconfig.json ./
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /code
COPY --from=build /App/build .
EXPOSE 8080:8080


