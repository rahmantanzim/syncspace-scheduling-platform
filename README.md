# SyncSpace Backend

A robust scheduling and meeting availability backend API. 

## Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript
* **Database:** PostgreSQL (via Supabase)
* **ORM:** TypeORM

## Current Progress (Phase 1)
- [x] Initialize Node.js and TypeScript environment.
- [x] Set up Express server with `ts-node-dev`.
- [x] Build global error handler and custom HTTP exceptions.
- [x] Implement `asyncHandler` to manage promise rejections.
- [x] Configure remote database connection (Supabase + TypeORM).
- [x] Create core database entities (`User`, `Integration`, `Event`, `Availability`, `Meeting`).
- [x] Establish table relationships (OneToMany / ManyToOne).
- [x] Set up `bcrypt` password hashing utilities.

## Roadmap & Next Steps
- [ ] Implement JWT authentication (Login / Signup).
- [ ] Build user profile and availability routes.
- [ ] Integrate third-party OAuth providers (Google, Zoom, Microsoft).
- [ ] Create meeting booking logic and conflict prevention.
- [ ] Finalize API documentation and deployment.

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a .env file in the root directory and add the Supabase Connection Pooler URL:
  ```bash
  PORT=8000
  NODE_ENV=development
  DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[db]
```
3. Start the development server:
```bash
  npm run dev
```
