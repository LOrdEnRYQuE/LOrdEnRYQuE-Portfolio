# LOrdEnRYQuE Portfolio

Production website for **LOrdEnRYQuE | Advanced Digital Solution**.

## Stack

- Next.js 15
- React 19
- TypeScript
- Convex
- Tailwind CSS
- OpenNext for Cloudflare
- Cloudflare Workers

## Local development

Install dependencies:

```bash
pnpm install
```

Run the Next.js app:

```bash
pnpm dev
```

Run Next.js and Convex together:

```bash
pnpm dev:full
```

## Production target

**Cloudflare Workers is the only production deployment target for this repository.**

The application is adapted for Workers with `@opennextjs/cloudflare`.

Build the Cloudflare artifact:

```bash
pnpm build
```

The build must produce:

```text
.open-next/worker.js
.open-next/assets/
```

Preview in the Cloudflare Workers runtime:

```bash
pnpm preview
```

Deploy to Cloudflare Workers:

```bash
pnpm deploy
```

Generate Cloudflare binding types:

```bash
pnpm cf-typegen
```

## Deployment source of truth

Production builds must use:

- Git provider: GitHub
- Repository: `LOrdEnRYQuE/LOrdEnRYQuE-Portfolio`
- Production branch: `main`
- Root directory: repository root
- Runtime: Cloudflare Workers
- Adapter: OpenNext
- Build command: `pnpm build`

The active Worker identity and custom-domain binding are managed in Cloudflare and must match the production Worker before any Worker-name change is committed.

## Environment configuration

Build/runtime secrets and environment variables belong in Cloudflare configuration, not in committed source files.

Typical required values include Convex, authentication, email and other service credentials used by the application.

## Release verification

Before production promotion:

```bash
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit
pnpm build
```

Then verify that the OpenNext worker and asset directory exist.

## Next.js documentation

Framework documentation: https://nextjs.org/docs
