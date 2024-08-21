FROM node:bullseye as build
WORKDIR /app
COPY . .
RUN npm install -g pnpm@8
RUN pnpm install
RUN npm run build-storybook

FROM nginx:alpine
RUN apk upgrade --update && apk add --no-cache \
    curl \
    bash \
    && rm -f /var/cache/apk/*

COPY --from=build /app/sb-dist /usr/share/nginx/html
# copy package.json only to scan it with trivy
RUN mkdir /app
COPY --from=build /app/package.json /app

ARG COMMIT_SHA
ENV COMMIT_SHA="${COMMIT_SHA}"

ARG _PROJECT_NAME
ENV _PROJECT_NAME="${_PROJECT_NAME}"

ARG _PROJECT_PATH
ENV _PROJECT_PATH="${_PROJECT_PATH}"

ARG _COMMIT_NAME
ENV _COMMIT_NAME="${_COMMIT_NAME}"

ARG GITLAB_TOKEN
ENV GITLAB_TOKEN="${GITLAB_TOKEN}"

ARG _PROJECT_ID
ENV _PROJECT_ID="${_PROJECT_ID}"

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
