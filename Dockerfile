FROM paas-images.epam.com/proxy/library/node:14-alpine AS build
WORKDIR /App
COPY build ./build

FROM paas-images.epam.com/proxy/library/nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /code
COPY --from=build /App/build .
EXPOSE 8080:8080
