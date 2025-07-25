# IU Alumni Portal - Frontend

[![Nuxt](https://img.shields.io/badge/Nuxt-3-00DC82?logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Frontend for the IU Alumni Portal built with Nuxt 3, Vue 3, and TypeScript.

## 📋 Table of Contents

- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Development](#-development)
- [Building for Production](#-building-for-production)
- [Docker](#-docker)
- [Code Style](#-code-style)
- [Git Hooks](#-git-hooks)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Releases](#-releases)
- [License](#-license)

## 🏗️ Project Structure

```
├── assets/          # Uncompiled assets (SCSS, images, fonts)
├── components/      # Reusable Vue components
├── layouts/         # Layout components
├── pages/           # Application views and routes
├── public/          # Static files
├── server/          # Server middleware and API routes
├── store/           # Pinia stores
├── utils/           # Utility functions
└── nuxt.config.ts   # Nuxt configuration
```

## 📋 Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm (recommended)

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   # Using pnpm (recommended)
   pnpm install
   
   # Or using yarn
   yarn install
   
   # Or using npm
   npm install
   ```


2. **Start the development server**
   ```bash
   pnpm dev
   ```
   The application will be available at `http://localhost:3000`

## 🛠 Development

### Code Style

This project uses:
- ESLint for code linting
- Prettier for code formatting

Run the linter:
```bash
pnpm lint
```

## 🏗 Building for Production

1. Build the application:
   ```bash
   pnpm build
   ```

2. Preview the production build locally:
   ```bash
   pnpm preview
   ```

## 🐳 Docker

### Development

```bash
# Build the image
docker build -t iu-alumni-frontend .

# Run the container
docker run -p 3000:3000 iu-alumni-frontend
```

### Production

For production, use a multi-stage build with Nginx:

```bash
# Build the production image
docker build -t iu-alumni-frontend:production -f Dockerfile.prod .

# Run the production container
docker run -p 80:80 iu-alumni-frontend:production
```

## 🔒 Git Hooks

This project uses Husky for Git hooks and lint-staged for efficient pre-commit checks:

- Pre-commit: Runs lint-staged to check and format staged files, builds the project

## 🚀 Deployment

### Prerequisites
- Node.js 18+ installed on the server
- PM2 or similar process manager (recommended)
- Nginx or Apache as a reverse proxy (recommended)

### Deployment Steps

1. Clone the repository on your server
2. Install dependencies: `pnpm install --prod`
3. Build the application: `pnpm build`
4. Start the server: `pnpm start`

For production, consider using PM2 to manage the Node.js process:

```bash
# Install PM2 and pnpm globally
npm install -g pm2 pnpm

# Start the application
pm2 start pnpm --name "iu-alumni-frontend" -- start

# Save the process list and startup script
pm2 save
pm2 startup
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Changes that do not affect the meaning of the code
- `refactor:` A code change that neither fixes a bug nor adds a feature
- `perf:` A code change that improves performance
- `test:` Adding missing tests or correcting existing tests
- `chore:` Changes to the build process or auxiliary tools

## 🚀 Releases

This project follows [Semantic Versioning](https://semver.org/) (SemVer) for versioning.

### Version Format

Given a version number **MAJOR.MINOR.PATCH**:

- **MAJOR** version for incompatible API changes
- **MINOR** version for added functionality in a backward-compatible manner
- **PATCH** version for backward-compatible bug fixes

### Release Process

1. **Development Phase**
   - All new features and fixes are merged into the `dev` branch
   - The `dev` branch is always in a deployable state

2. **Release Preparation**
   - When ready for a release, create a pull request from `dev` to `main`
   - Update the version number in `package.json` following SemVer:
     ```bash
     # For a patch release (0.0.x)
     pnpm version patch
     
     # For a minor release (0.x.0)
     pnpm version minor
     
     # For a major release (x.0.0)
     pnpm version major
     ```
   - Update the changelog with the new version and changes

3. **Release**
   - Merge the pull request to `main`
   - Create a new release tag:
     ```bash
     git tag -a v1.0.0 -m "Release v1.0.0"
     git push origin v1.0.0
     ```
   - The CI/CD pipeline will automatically build and deploy the new version

4. **Hotfixes**
   - For critical bugs in production, create a hotfix branch from the latest release tag
   - After testing, merge the hotfix into both `main` and `dev` branches
   - Create a new patch release

### Version Tags

- Release versions are tagged as `vX.Y.Z` (e.g., `v1.0.0`)
- Pre-release versions can use `-alpha.X`, `-beta.X`, or `-rc.X` suffixes (e.g., `v1.0.0-rc.1`)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.