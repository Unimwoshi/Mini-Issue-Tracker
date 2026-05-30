# Mini Issue Tracker

A lightweight bug tracking app built with Node.js, Express, MongoDB, and React.

## Setup

### Prerequisites
- Node.js v20+

### Backend
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/issue-tracker
```

```bash
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`, API at `http://localhost:5000`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/issues | Get all issues, supports `?status=` filter |
| GET | /api/issues/counts | Get counts grouped by status |
| POST | /api/issues | Create an issue |
| PATCH | /api/issues/:id | Update an issue |
| DELETE | /api/issues/:id | Delete an issue |

## Filtering & Scaling

Filtering is handled on the backend. When a user selects a status, the frontend calls `GET /api/issues?status=Open` and MongoDB queries only matching documents using an index on the `status` field. No full dataset is ever loaded into memory on the client side.

Status counts use a MongoDB aggregation pipeline that groups documents by status in a single database pass, returning at most three numbers regardless of dataset size. Both requests run in parallel via `Promise.all` so the dashboard loads in one round trip.

## Reflection

The biggest challenge was ESM module loading order — `dotenv` was being hoisted after the MongoDB client initialised, leaving the connection string undefined. The fix was Node's native `--env-file` flag which loads env vars before any module executes.

Given more time I would add pagination, authentication, full-text search, and a complete edit modal for issues.
