# Job & Internship Tracker

A Notion-style job application tracker built with Next.js, MongoDB, and NextAuth.

## Setup

### 1. Clone and install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in the values:

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/job-tracker
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:3000
```

> **MongoDB**: Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas), add a database user, and whitelist your IP. Copy the connection string.

> **NEXTAUTH_SECRET**: Run `openssl rand -base64 32` in your terminal (or use any long random string).

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Register an account

Visit `/register`, create an account, then sign in at `/login`.

## Features

- Dark Notion-style UI with cover photo support
- Per-user job/internship entries with full CRUD
- Filter tabs: All, To Apply, Preparing Interview, Interviewed
- Search by position, company, industry, or status
- Slide-in side panel to view and edit entries
- Color-coded application status badges
- Toast notifications for all actions
- JWT-based auth, each user only sees their own data
