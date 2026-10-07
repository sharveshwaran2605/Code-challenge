# MPloyChek Software Intern Code Challenge

Original Angular + TypeScript/Node.js implementation of a role-based verification console.

## Features
- Angular 17 standalone architecture (meets Angular 12+ requirement)
- TypeScript + Express REST API
- XML persistence (no database server required)
- JWT authentication
- General User/Admin roles
- Route guards and HTTP interceptor
- User profile and role-scoped records
- Admin user CRUD with soft-delete/disable
- Reactive forms and validation
- Configurable delayed API (`?delay=1800`)
- Async loading state and error handling
- Responsive, original UI
- Modular services and lazy-loaded feature routes

## Run locally

### Backend
```bash
cd backend
npm install
npm run dev
```
API runs at `http://localhost:3000`.

### Frontend
Open a second terminal:
```bash
cd frontend
npm install
npm start
```
Open `http://localhost:4200`.

## Demo credentials
**Admin:** USR-1001 / Admin@123 / Admin

**General User:** USR-1002 / User@123 / General User

## Challenge mapping
| Requirement | Implementation |
|---|---|
| Login | `/api/auth/login` + Angular reactive form |
| Roles | JWT role claims + Angular guards + backend authorization |
| User details | `/api/users/me` |
| User records | `/api/records` filtered by authenticated user |
| Admin management | `/api/users` CRUD |
| Dummy storage | `backend/data/database.xml` |
| API delay | `/api/records?delay=2500` |
| Async processing | RxJS Observable + loading UI |
| Modular code | core services, guards, interceptor, feature components |
| UI | Responsive custom dashboard |

## Notes
This is an assessment/demo project. Passwords are intentionally stored in plain text in the local XML only to keep the challenge self-contained. In production, use a password hash (e.g. Argon2/bcrypt), a managed database, secret management, HTTPS, refresh tokens and audit logging.
