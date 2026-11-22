# syntax=docker/dockerfile:1
ARG NODE_VERSION=26

# ---------- base: 共通の土台 ----------
FROM node:${NODE_VERSION}-slim AS base
RUN apt-get update -y \
 && apt-get install -y --no-install-recommends openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# ---------- deps: 依存パッケージのインストール ----------
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---------- builder: Prisma Client生成 + Next.jsビルド ----------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# ビルド中はDBに接続しない。モジュール読み込み時の存在チェックを通すためのダミー値
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build"
RUN npx prisma generate
RUN npm run build

# ---------- runner: 本番で動かす最小のイメージ ----------
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]