# MyBookPaperid

MyBookPaperid is a take-home front-end engineering project for Paper.id, built with Angular. Live preview [https://my-book-paperid.vercel.app](https://my-book-paperid.vercel.app)

## Prerequisites

- Node.js `22.22.3` or later (or `24.15.0+`)
- npm `10.9.2` or later
- Angular CLI `22.1.8`

You can check your installed versions with:

```bash
node --version
npm --version
npx ng version
```


## Directory Structure

```text
my-book-paperid/
├── public/                  # Static assets
├── src/
│   ├── app/
│   │   ├── core/            # Core application services and logic
│   │   ├── shared/          # Shared components and utilities
│   │   ├── app.ts           # Root standalone component
│   │   ├── app.html         # Root page template
│   │   ├── app.css          # Root component styles
│   │   ├── app.config.ts    # Client application configuration
│   │   ├── app.config.server.ts
│   │   ├── app.routes.ts    # Client routes
│   │   ├── app.routes.server.ts
│   │   └── app.spec.ts      # Root component tests
│   ├── main.ts              # Browser bootstrap
│   ├── main.server.ts       # Server-side bootstrap
│   ├── server.ts            # SSR server entry point
│   ├── index.html           # Main HTML document
│   └── styles.css           # Global styles
├── angular.json             # Angular CLI configuration
├── package.json             # Scripts and dependencies
└── tsconfig.json            # TypeScript configuration
```

## How to Install

Clone the repository, move into the project directory, and install its dependencies:

```bash
git clone <repository-url>
cd my-book-paperid
npm install
```

Create .env file
```bash
cp .env.example .env
```
Fill based on yout environtment setup.

## How to Run in Development

Start the Angular development server:

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200) in your browser.


The API host is configured in `.env` as `API_HOST=https://openlibrary.org` and is centralized in `src/app/core/config/api.config.ts`.

## How to Build and Run in Production

Build the application using the production configuration:

```bash
npm run build
```

Start the generated server-side rendered application:

```bash
npm run serve:ssr:my-book-paperid
```

The production server is available at [http://localhost:4000](http://localhost:4000).

## Contributors

- [Yussan](https://yussan.framer.website)


## Links
- Angular coding style [https://angular.dev/style-guide](https://angular.dev/style-guide).
- Open Library public API Docs [https://openlibrary.org/developers/api](https://openlibrary.org/developers/api)