FROM node:20-alpine AS base

ENV NODE_ENV=production
ENV TURBO_TELEMETRY_DISABLED=1
ENV NEXT_TELEMETRY_DISABLED=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable pnpm
RUN pnpm install --global turbo@^2

FROM base AS builder
WORKDIR /app

COPY . .

# https://turbo.build/repo/docs/guides/tools/docker#the-solution
RUN turbo prune docs --docker

# Rebuild the source code only when needed
FROM base AS installer
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN turbo build --filter=docs

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=installer /app/apps/docs/next.config.ts .
COPY --from=installer /app/apps/docs/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/docs/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/docs/.next/static ./apps/docs/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/docs/public ./apps/docs/public

USER nextjs

EXPOSE 3001

ENV PORT=3001

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "apps/docs/server.js"]
