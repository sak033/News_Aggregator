<!-- Copilot instructions for working on the News Aggregator repo -->
# News Aggregator — Copilot Instructions

Purpose: quick, actionable guidance so an AI coding agent can be productive immediately.

**Big Picture**
- **Client:** React + Vite app in `client/`. Development entry: `client/package.json` scripts (`dev`, `build`, `preview`).
- **Server:** Express API in `server/server.js` that proxies to GNews, persists some data to MongoDB, and sends email using nodemailer. See `server/package.json`.
- **Data & models:** Mongoose models live in `server/models/` (e.g., `EpaperEdition` in `server/models/EpaperEdition.js`).
- **Why structured this way:** frontend fetches aggregated news from the backend (to hide API keys, normalize results, and cache epaper editions). Backend also handles persistence and outgoing email, keeping sensitive credentials server-side.

**How to run (local dev)**
- Start the backend (from `server/`): `npm install` then `npm start` (runs `node server.js`). See [server/package.json](server/package.json).
- Start the frontend (from `client/`): `npm install` then `npm run dev` to launch the Vite dev server. See [client/package.json](client/package.json).
- Run both in separate terminals — there is no monorepo runner.

**Important env vars & locations**
- Client (Vite): `client/.env` uses `VITE_GNEWS_API_KEY` (exposed to browser at runtime). See `client/.env`.
- Server: expects `GNEWS_API_KEY`, `MONGO_URI`, and email/SMTP credentials in `process.env` (example usages in `server/server.js`, `server/utils/sendEmail.js`, and `server/utils/sendContactEmail.js`). Keep these out of source control.

**Key project-specific patterns**
- API proxying: server endpoints (e.g., `/top-headlines`, `/search-news`, `/all-news`, `/epaper/today`) call GNews and return normalized JSON. See [server/server.js](server/server.js).
- Background email pattern: subscription/contact endpoints respond immediately to the client, then send emails asynchronously (subscribe: saves then responds then calls `sendWelcomeEmail`; contact: saves then responds then calls `sendContactEmail`). See `server/server.js` and `server/utils/sendEmail.js` / `server/utils/sendContactEmail.js`.
- Epaper caching: `epaper/today` builds an edition and persists to `EpaperEdition` model to avoid refetching within the same day. See `server/models/EpaperEdition.js` and the `/epaper/today` route in `server/server.js`.
- Mixed HTTP clients: server uses the global `fetch`; frontend uses `axios` in some components. Be consistent when modifying code; prefer the existing patterns per file.

**Conventions & code layout**
- React components: `client/src/components/` (e.g., `TopHeadlines.jsx`, `News.jsx`, `Chatbot/`). Chatbot helper functions are in `client/src/components/Chatbot/` (`getBotReply.js`, `faqData.js`).
- Styling: Tailwind + local CSS files (see `client/src/index.css`, `client/src/App.css`).
- ESLint setup in `client/eslint.config.js` and package `devDependencies` — follow existing lint rules.

**Integration points to watch**
- Client → Server: frontend calls backend endpoints (no additional auth). Check network calls in `client/src` components that fetch `/top-headlines`, `/subscribe`, `/contact`, etc.
- External APIs: GNews (via API key). Server hides the primary `GNEWS_API_KEY`; client uses `VITE_GNEWS_API_KEY` for any direct browser-side calls.
- Email: two different transports are used (`sendWelcomeEmail` uses Gmail creds; `sendContactEmail` uses SMTP with BREVO_* env vars). See `server/utils/`.

**Developer workflows & common commands**
- Frontend dev: from `client/` run `npm run dev` (Vite with HMR).
- Frontend build: `npm run build` in `client/`.
- Backend dev/start: from `server/` run `npm install` then `npm start`.
- Lint: `npm run lint` from `client/`.

If you need edits to these instructions or want me to include more examples (e.g., common HTTP request snippets or links to specific component lines), tell me which areas to expand.
