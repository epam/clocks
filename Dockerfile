FROM node:14-alpine AS build
WORKDIR /app
COPY package* ./
RUN npm ci
COPY public ./public
COPY src ./src
COPY tsconfig.json ./
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /code
COPY --from=build /app/build .
EXPOSE 8080:8080
