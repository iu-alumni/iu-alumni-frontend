# IU Alumni — Frontend

Admin portal for the IU Alumni platform, built with Nuxt 3 and Vue 3.

## Tech Stack

- **Nuxt 3** · **Vue 3** · **TypeScript**
- **Pinia** (state management) · **Axios** (HTTP client)
- **Shadcn-Vue** / **Reka UI** · **Tailwind CSS**

## Pages

| Route | Description |
|---|---|
| `/` | Dashboard |
| `/events` | Event management |
| `/users` | User management |

## Local Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Set `NUXT_PUBLIC_API_BASE=http://localhost:8080` in `.env` to point at a local backend.

## Deployment

Automatic on push to `develop` (testing) or `main` (production).  
See [iu-alumni-infra](https://github.com/iu-alumni/iu-alumni-infra) for the full deployment guide and secrets reference.
