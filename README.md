# Notes App with Auth

Backend API for managing notes with user authentication (MongoDB + Express).

## Overview

- Purpose: Simple notes API with signup/login and per-user notes.
- Repo: notesappwithauth
- Base API prefix: `/api`

## Tech

- Node.js, Express, Mongoose (MongoDB), JWT for auth

## Setup

1. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

2. Create environment file:

   ```sh
   cp .env.example .env
   ```

   Required env vars:
   - MONGODB_URI - MongoDB connection string
   - JWT_SECRET - secret for signing JWTs
   - PORT - optional (defaults in code)

3. Start the server:

   ```sh
   npm start
   # or for development
   npm run dev
   ```

## Authentication

- Auth uses JWT stored in a secure, httpOnly cookie named `token`.
- After signup/login the server sets the cookie with a 7-day expiry.
- Middleware reads `req.cookies.token`, verifies with `JWT_SECRET` and sets `req.user` to the token payload ({ id, email }). If no token, `req.user` is left undefined.

## Routes

All routes are mounted under `/api`.

- Auth
  - POST /api/auth/signup
    - Body: { name, email, password }
    - Response: 201 + user (password removed) and cookie `token` set
  - POST /api/auth/login
    - Body: { email, password }
    - Response: 200 + user (password removed) and cookie `token` set

- Notes (require authentication; auth middleware must set `req.user`)
  - POST /api/notes
    - Body: { title, description }
    - Creates a note for the logged-in user's email
    - Response: 201 + created note
  - GET /api/notes
    - Returns all notes for the logged-in user's email
    - Response: 200 + array of notes
  - PATCH /api/notes/:id
    - Body: { title?, description? }
    - Updates the note with given id
    - Response: 200 + updated note
  - DELETE /api/notes/:id
    - Deletes the note with given id
    - Response: 204 (no content)

Notes routes are implemented in `src/routes/notes.router.js` and protected using `src/middleware/auth.middleware.js`.

## Database schemas (implemented with Mongoose)

- users (src/models/user.model.js)
  - Fields: { name: String, email: String, password: String }
  - password is hashed automatically in a `pre('save')` hook using bcrypt
  - Methods:
    - generateJwt(): returns a JWT signed with JWT_SECRET (7d expiry)
    - comparePassowrd(password): boolean (compares with hashed password)

- notes (src/models/notes.model.js)
  - Fields: { email: String, title: String, description: String }
  - Notes are associated to users by storing the user's email

## Request/Response examples

Signup example:

POST /api/auth/signup
Content-Type: application/json

{ "name": "Alice", "email": "a@example.com", "password": "secret" }

Response: 201
- Sets httpOnly cookie `token`
- Body: { success: true, message: "user Created Successfully", data: { _id, name, email } }

Create note example:

POST /api/notes
Cookie: token=<jwt>
Content-Type: application/json

{ "title": "Buy milk", "description": "2 liters" }

Response: 201
{ success: true, message: "Notes created Successfully", data: { _id, email, title, description } }

## Important files

- src/app.js - app bootstrap, connects DB and mounts `/api`
- src/routes/atuh.router.js - auth routes (note: filename has a typo `atuh`)
- src/routes/notes.router.js - notes routes
- src/routes/mainRouter.route.js - mounts auth and notes under `/auth` and `/notes`
- src/models/user.model.js - user schema + auth helpers
- src/models/notes.model.js - notes schema
- src/config/db.config.js - connects to MongoDB using MONGODB_URI
- src/middleware/auth.middleware.js - reads token cookie and sets `req.user`