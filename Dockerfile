# ── Stage 1: build the static site ──────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies against the lockfile for reproducible builds.
COPY package.json package-lock.json ./
RUN npm ci

# Build the production bundle.
COPY . .
RUN npm run build

# ── Stage 2: serve with nginx ───────────────────────────────────────────────
FROM nginx:1.27-alpine AS runtime

# SPA routing + gzip + security headers + asset caching.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Static assets produced by `vite build`.
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Basic container healthcheck.
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
