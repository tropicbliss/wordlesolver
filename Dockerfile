FROM node:16 as build
WORKDIR /usr/src/app
COPY . .
RUN npm ci --silent
RUN npm install
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]