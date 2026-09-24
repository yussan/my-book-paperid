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
├── public/                  # Public static assets served as-is
├── scripts/
│   └── generate-config.mjs  # Generates runtime API configuration from environment variables
├── src/
│   ├── main.ts              # Browser bootstrap
│   ├── main.server.ts       # Server-side rendering bootstrap
│   ├── server.ts            # Node SSR server entry point
│   ├── index.html            # Main HTML document
│   ├── styles.css            # Global styles
│   ├── app/
│   │   ├── core/            # Reusable application logic and API access
│   │   │   ├── config/      # API and environment configuration
│   │   │   ├── models/      # Shared TypeScript data models
│   │   │   └── services/    # Open Library and book-detail services
│   │   ├── features/        # Route-level application features
│   │   │   └── home/        # Trending books homepage
│   │   ├── shared/          # Reusable UI components and utilities
│   │   │   ├── components/
│   │   │   │   ├── book-detail-drawer/ # Book detail and order drawer
│   │   │   │   ├── cards/              # Reusable book cards
│   │   │   │   ├── footer/             # Application footer
│   │   │   │   ├── header/             # Navigation and book search
│   │   │   │   └── skeletons/          # Loading placeholders
│   │   │   └── utils/                  # Shared helper functions
│   │   ├── app.ts             # Root standalone component
│   │   ├── app.html           # Root page template
│   │   ├── app.config.ts      # Client application configuration
│   │   ├── app.config.server.ts # Server application configuration
│   │   ├── app.routes.ts      # Client routes
│   │   ├── app.routes.server.ts # Server routes
│   │   └── app.spec.ts        # Root component tests
├── angular.json               # Angular CLI configuration
├── package.json               # Dependencies and npm scripts
└── tsconfig.json              # TypeScript compiler configuration
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