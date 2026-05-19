# CloudDesk AI

## Project Overview
CloudDesk AI is a premium SaaS help‑desk platform that provides authenticated users with a seamless ticket lifecycle: create tickets, chat with AI‑assisted support, track history, and let admins manage and resolve tickets. All data is persisted in a relational database via Prisma.

## Features
- **Authentication** – JWT based login & registration.
- **Ticket Lifecycle** – create, view, message, update status, history tracking.
- **Admin Dashboard** – real‑time metrics, ticket resolution/escalation.
- **AI Assistance** – category & priority suggestions, reply generation (fallback mocks when OpenAI key missing).
- **Premium UI** – glassmorphism, dark mode, responsive design built with React, Tailwind, Vite.
- **Full‑Stack** – Express backend, Prisma ORM, SQLite for dev and PostgreSQL for production.

## Tech Stack
**Frontend**
- React 18
- Vite
- Tailwind CSS
- Axios (custom instance with JWT)

**Backend**
- Node.js (Express)
- Prisma ORM
- PostgreSQL / SQLite
- JWT, bcrypt, dotenv, cors
- OpenAI (optional)

## Installation
### Prerequisites
- Node.js >= 20
- npm >= 10
- PostgreSQL instance for production (optional for dev – SQLite is used)

### Backend Setup
```bash
cd backend
npm install
# Copy env example and fill values
cp .env.example .env
# Generate Prisma client
npx prisma generate
# Run migrations (SQLite dev)
npx prisma migrate dev --name init
npm run dev   # development server on PORT (default 5000)
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env   # set VITE_API_URL to your backend URL
npm run dev   # Vite dev server (default http://localhost:5173)
```

## Environment Variables
### Backend `.env.example`
```
DATABASE_URL=sqlite:///./dev.db   # or postgres://user:pass@host:port/dbname for production
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key   # optional – mock data used if missing
PORT=5000
CORS_ORIGIN=http://localhost:5173   # adjust for production URL
```

### Frontend `.env.example`
```
VITE_API_URL=http://localhost:5000   # backend base URL
```

## API Endpoints
### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Tickets
- `POST /api/tickets` – create ticket (AI suggestions optional)
- `GET /api/tickets` – list current user tickets
- `GET /api/tickets/:id` – ticket details + messages + history
- `POST /api/tickets/:id/message` – add a message
- `PATCH /api/tickets/:id/status` – update status
- `GET /api/tickets/:id/history` – activity log

### Admin
- `GET /api/admin/metrics`
- `PATCH /api/admin/tickets/:id/resolve`
- `PATCH /api/admin/tickets/:id/escalate`

## Deployment
### Backend (Render)
1. Push the `backend/` folder to a GitHub repository.
2. In Render, create a **Web Service** linked to that repo.
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables (from `.env.example`).
6. Render will expose a URL like `https://cloud-desk-backend.onrender.com`.

### Frontend (Vercel)
1. Push the `frontend/` folder to a GitHub repository (same or separate repo).
2. Import the project into Vercel.
3. Set the environment variable `VITE_API_URL` to the Render backend URL.
4. Vercel runs `npm run build` and deploys the static site.

## Screenshots
*Add screenshots of Dashboard, Ticket View, Admin Dashboard here.*

## License
MIT
