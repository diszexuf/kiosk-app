FROM node:alpine AS build
WORKDIR /app

COPY admin-panel-frontend/package.json admin-panel-frontend/package-lock.json ./
RUN npm ci

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY api-contract/openapi.yml ../api-contract/openapi.yml
COPY admin-panel-frontend/ .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY admin-panel-frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80