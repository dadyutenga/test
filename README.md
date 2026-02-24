# GreenScape Consults Tz Ltd

A full-stack portfolio and CMS application for GreenScape Consults — a landscape architecture, building construction, and project management company based in Dar es Salaam, Tanzania.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend:** Express.js, better-sqlite3
- **Auth:** JWT + bcrypt

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm

## Getting Started

```sh
# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# 2. Install dependencies
npm install

# 3. Seed the database (creates admin user + sample data)
npm run seed

# (Optional) Set a custom admin password during seeding
ADMIN_PASSWORD=your_secure_password npm run seed

# 4. Start both frontend and backend in development mode
npm run dev
```

This starts:
- **Frontend (Vite):** http://localhost:8080
- **Backend (Express):** http://localhost:3001

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start frontend + backend concurrently |
| `npm run dev:client` | Start only the Vite frontend |
| `npm run dev:server` | Start only the Express backend |
| `npm run build` | Build the frontend for production |
| `npm start` | Run the production server (serves built frontend + API) |
| `npm run seed` | Seed the database with initial data |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `ADMIN_PASSWORD` | `admin123` | Admin password used during seeding. Set before running `npm run seed`. |
| `JWT_SECRET` | `greenscape-cms-secret-2026` | Secret key for signing JWT tokens. |
| `PORT` | `3001` | Backend server port. |

> **Warning:** If `ADMIN_PASSWORD` is not set, the seed script falls back to `admin123` and prints a warning. Change it in production.

## Default Admin Credentials

After seeding, you can log in to the admin panel at `/admin/login`:

- **Username:** `admin`
- **Password:** `admin123` (or whatever you set via `ADMIN_PASSWORD`)

You can change the password at any time from **Admin → Settings**.

## Admin Panel Features

- **Dashboard** — Overview of site content
- **Projects** — CRUD for portfolio projects and their steps
- **Services** — CRUD for service categories and items
- **Testimonials** — CRUD for client testimonials (with image upload)
- **Contact Info** — Update company contact details
- **Messages** — View contact form submissions
- **Settings** — Change admin password

## Project Structure

```
├── server/             # Express backend
│   ├── index.ts        # Server entry point
│   ├── database.ts     # SQLite database setup
│   ├── seed.ts         # Database seeding script
│   ├── middleware/      # Auth middleware
│   ├── repositories/   # Database access layer
│   ├── routes/         # API routes
│   ├── data/           # SQLite database files
│   └── media/          # Uploaded media files
├── src/                # React frontend
│   ├── components/     # UI components
│   ├── pages/          # Page components (Index, Admin)
│   ├── contexts/       # React contexts (Language)
│   ├── core/api/       # API client functions
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utility functions
│   └── types/          # TypeScript types
└── public/             # Static assets
```
