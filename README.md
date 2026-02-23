# IU Alumni — Frontend

Nuxt 3 / Vue 3 / TypeScript frontend for the IU Alumni Portal.

## Local Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Set `NUXT_PUBLIC_API_BASE=http://localhost:8080` in `.env` to point at a local backend.

## Deployment

Automatic on push to `develop` (testing) or `main` (production).  
See [iu-alumni-infra](../iu-alumni-infra/README.md) for full deployment guide and secrets reference.
