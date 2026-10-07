# MPloyChek Challenge API

TypeScript + Express REST API with XML persistence.

## Run

```bash
npm install
npm run dev
```

API: http://localhost:3000

## Demo accounts
- Admin: `USR-1001` / `Admin@123` / Admin
- General User: `USR-1002` / `User@123` / General User

## Endpoints
- POST `/api/auth/login`
- GET `/api/users/me`
- GET `/api/records?delay=3000`
- GET `/api/users` (admin)
- POST `/api/users` (admin)
- PUT `/api/users/:id` (admin)
- DELETE `/api/users/:id` (admin; soft delete)

The `delay` query parameter intentionally simulates slow asynchronous API processing. It is capped at 10 seconds.
