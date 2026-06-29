# Kach QR Code

Kach QR Code is a modern, high-performance, and feature-rich QR Code generator and organizer application. It is built as a robust Full Stack application using **React (v19)**, **Vite**, **TanStack Start**, and **Supabase** for durable cloud persistence, user authentication, and data sync.

---

## 🚀 Key Features
- **Custom QR Code Generation**: Supports custom color palettes, background styles, logo overlays, custom corner dots, and high-quality rendering (including PNG, SVG, and high-density formats).
- **Authentication**: Secure registration, login, and session persistence powered by Supabase Auth.
- **Durable Persistent Storage**: Instantly saves, categorizes, searches, filters, and shares generated QR codes.
- **Responsive Layout**: Designed mobile-first with a desktop-first precision using **Tailwind CSS**.
- **Modern Animations**: Powered by smooth transitions and interactive micro-animations using `motion`.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, Tailwind CSS, Lucide Icons, and Framer Motion (`motion/react`).
- **Framework & SSR**: TanStack Start with Vite.
- **Backend & Database**: Supabase (PostgreSQL database with custom schemas, Row Level Security, and OAuth/Email auth).
- **Deployment**: Configured for instant deployment on **Vercel** or any modern Node.js runtime using the Nitro engine preset dynamically configured in `vite.config.ts`.

---

## 📂 Project Structure

```text
├── .env.example              # Template for secret keys and environment variables
├── .gitignore                # Tells git which folders/dependencies to ignore
├── vercel.json               # Configures the project for instant Vercel deployments
├── package.json              # Configures dependencies, scripts, and build targets
├── tsconfig.json             # TypeScript rules and compiler configuration
├── vite.config.ts            # High-performance Vite & TanStack Start build settings
├── start.js / start.ts       # Entry files for running the server-side environment
├── assets/                   # Public assets (graphics, background shapes)
├── supabase/
│   ├── config.toml           # Supabase local project setup
│   └── migrations/           # Versioned SQL migrations for database setup
└── src/
    ├── App.tsx               # Primary application component
    ├── main.tsx              # Main entry point for rendering into DOM
    ├── routes/               # Directory-based route hierarchy (TanStack Router)
    ├── components/           # Reusable UI elements & custom builders
    ├── hooks/                # Custom React hooks (auth, database sync, etc.)
    ├── integrations/
    │   └── supabase/         # Typed Supabase clients for server and client side
    ├── lib/                  # Utilities, helper files, and QR generation engines
    └── styles.css            # Global Tailwind imports & custom core styles
```

---

## 📦 How to Export from Google AI Studio

To transfer this complete workspace as-is to your local machine, another server, or a GitHub repository:
1. Navigate to the top-right **Settings** menu inside Google AI Studio.
2. Under project settings, choose **Export to GitHub** to link this app directly to a fresh or existing repository.
3. Alternatively, click **Download ZIP** to package the entire source tree into a clean, portable zip file.

---

## 💻 Local Development Setup

Follow these simple steps to spin up the application on your local machine:

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) and an npm-compatible package manager (like `npm`, `pnpm`, or `bun`) installed.

### 2. Install Dependencies
Extract your ZIP file or clone the repository, open a terminal in the project's root folder, and run:
```bash
npm install
```

### 3. Environment Variables Setup
Copy the example environment variable template file to create your active `.env` file:
```bash
cp .env.example .env
```
Open `.env` in your editor and provide your Supabase connection parameters and client-side credentials:
```env
# Server-side connection URL for your app
APP_URL="http://localhost:3000"

# Supabase Integration Configuration
SUPABASE_URL="https://your-project-id.supabase.co"
SUPABASE_PUBLISHABLE_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# Client-side exposed variables
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your-supabase-anon-key"
```

### 4. Database Setup & SQL Migrations
The database schema has been meticulously tracked using versioned SQL migration files under `supabase/migrations/`.

#### Option A: Deploy to an online Supabase project
1. Install the Supabase CLI:
   ```bash
   npm install -g supabase
   ```
2. Log in and link your local project to your cloud Supabase database:
   ```bash
   supabase login
   # Link the project using your project ref id (found in your Supabase dashboard URL)
   supabase link --project-ref your-project-ref
   ```
3. Push all migrations directly up to your remote database:
   ```bash
   supabase db push
   ```

#### Option B: Run Migrations Locally
If you are spinning up a local Supabase stack or Docker containers:
```bash
supabase start
```
This will automatically launch local PostgreSQL, Auth, and Storage containers, and run all versioned migrations in order!

#### Option C: Manual Migration Run
If you prefer not to use the Supabase CLI, you can open any migration SQL files located under `supabase/migrations/` in your editor and copy-paste their content directly into the SQL Editor of your Supabase dashboard to provision all tables, columns, indexes, and Row Level Security (RLS) policies.

---

## 🏗️ Building and Running the Application

### Running Local Development Server
Launch the development server on port `3000`:
```bash
npm run dev
```

### Compiling and Testing the Production Build
Before deploying to production, verify that TypeScript, ESLint, and the compiler build succeed perfectly:
```bash
# Run lint validation
npm run lint

# Compile the full application
npm run build
```

### Starting the Production App Locally
To test the built production bundle on your local server:
```bash
npm run start
```

---

## ☁️ Deploying to Vercel

This project is pre-configured to be 100% production-ready for instant, zero-configuration deployments on Vercel.

### Option A: Connected GitHub Deploy (Recommended)
1. Export or push this project to a **GitHub Repository**.
2. Connect your GitHub account to [Vercel](https://vercel.com).
3. Click **Import Project** and select this repository.
4. Vercel will automatically read `vercel.json` and configure:
   - **Framework Preset**: Vite (or other detected frameworks; Vercel handles this automatically).
   - **Build Command**: `vite build`
   - **Output Directory**: `.vercel/output`
5. In the **Environment Variables** configuration section, copy over the key-value pairs from your `.env` file:
   - `SUPABASE_URL`
   - `SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
6. Click **Deploy**! Any future git push to your master/main branch will trigger a fast, automated, and serverless edge deployment.

### Option B: Command Line Deploy (Vercel CLI)
If you prefer the command-line interface, install the CLI, configure, and deploy instantly:
```bash
# Install CLI
npm install -g vercel

# Log in to your Vercel account
vercel login

# Deploy
vercel
```

---

## 🛡️ License
This project is prepared and packaged as-is. Feel free to modify, extend, and adapt it for your own custom QR Code solutions!
