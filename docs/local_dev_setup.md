# Local Dev Setup

This guide explains how to set up the Book A Gig Angular frontend for local development.

## Prerequisites

- Node.js 16 or newer
- npm
- Git

The Angular CLI is included in the project dependencies, so a global Angular CLI install is optional. Use `npm run` commands from the app directory to use the project version.

## Project Location

The Angular app lives in the `BookingWebApp/` directory.

From the repository root:

```bash
cd BookingWebApp
```

Most development commands should be run from this directory, not from the repository root.

## Install Dependencies

```bash
npm install
```

This installs Angular, Angular Material, Bootstrap, RxJS, TypeScript, Karma, and the other packages used by the frontend.

## Backend API

For local development, the frontend reads its API base URL from:

```text
BookingWebApp/src/environments/environment.ts
```

The current local API URL is:

```ts
apiBaseUrl: 'http://localhost:8085'
```

Before signing in or using API-backed screens, make sure the Book A Gig backend is running locally on port `8085`. If your backend uses a different port, update `apiBaseUrl` in `BookingWebApp/src/environments/environment.ts`.

The production API URL is defined separately in:

```text
BookingWebApp/src/environments/environment.prod.ts
```

## Start the App

From `BookingWebApp/`, run:

```bash
npm start
```

This runs `ng serve` and starts the Angular dev server at:

```text
http://localhost:4200
```

The app reloads automatically when source files change.

## Useful Commands

```bash
# Start the local dev server
npm start

# Build the production bundle
npm run build

# Run unit tests with Karma
npm test

# Run Angular CLI commands through the local project dependency
npm run ng -- generate component path/to/component-name
```

## Where to Make Changes

- App module and global wiring: `BookingWebApp/src/app/app.module.ts`
- App routing: `BookingWebApp/src/app/app-routing.module.ts`
- Auth pages and components: `BookingWebApp/src/app/modules/auth/`
- Host features: `BookingWebApp/src/app/modules/host/`
- Performer features: `BookingWebApp/src/app/modules/performer/`
- API services: `BookingWebApp/src/app/services/`
- Route guards: `BookingWebApp/src/app/guards/`
- Shared models: `BookingWebApp/src/app/models/`
- Static assets: `BookingWebApp/src/assets/`
- Environment config: `BookingWebApp/src/environments/`

## Development Workflow

1. Start the backend API on `http://localhost:8085`.
2. Open a new terminal and go to `BookingWebApp/`.
3. Run `npm install` if dependencies are not installed yet.
4. Run `npm start`.
5. Open `http://localhost:4200`.
6. Make frontend changes under `BookingWebApp/src/app/`.
7. Run tests or a production build before submitting changes.

## Notes

- Authentication uses JWTs returned from the backend `/login` endpoint.
- The app stores the JWT, user ID, and role in `localStorage`.
- API requests include the JWT as a bearer token for protected endpoints.
- The default route redirects to `/login`.
