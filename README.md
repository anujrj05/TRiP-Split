
# TRiP Split

**Live App:** https://split-trip-three.vercel.app/

Split group trip expenses fairly. Track who paid, who owes whom, and settle up — all from one link.

---

## Features

- **User auth** — Signup, login, email OTP verification, forgot password
- **Trip management** — Create trips, join with code or **invite link**
- **Expense tracking** — Add expenses with categories (Food, Travel, Hotel, Shopping, Other)
- **Expense timeline** — Visual history of all trip expenses
- **Smart settlement** — "Who pays whom" calculation to settle debts
- **Single-link deploy** — Frontend + backend on one Vercel URL

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite, Tailwind CSS, DaisyUI |
| Backend | Node.js, Express |
| Database | MongoDB Atlas |
| Deployment | Vercel (monorepo) |

---

## Environment Variables

### Vercel (single project — root directory `.`)

| Variable | Description |
|----------|-------------|
| `MongoDBURI` | MongoDB Atlas connection string |

No `REACT_APP_BASE_URL` needed in production — API runs on the same domain.

### Local development

**Backend** (`Backend/.env`):
```
MongoDBURI=mongodb://127.0.0.1:27017/TRiP
```

**Frontend** (`Frontend/.env`):
```
REACT_APP_BASE_URL=http://localhost:4000
```

---

## Run Locally

**Terminal 1 — Backend:**
```bash
cd Backend
npm install
npm start
```

**Terminal 2 — Frontend:**
```bash
cd Frontend
npm install
npm run dev
```

Open http://localhost:5173

---

## Deploy on Vercel

1. Import GitHub repo `Split_trip`
2. Root Directory: **`.`** (project root)
3. Add env: `MongoDBURI` = your Atlas connection string
4. Deploy

**Test after deploy:**
- Website: `https://your-app.vercel.app`
- Health: `https://your-app.vercel.app/health` → `databaseConnected: true`
- API routes: `/user`, `/trip`, `/transaction`

---

## Trip Invite Links

Share a trip with one click:
```
https://split-trip-three.vercel.app/join/YOUR_TRIP_CODE
```

Copy the invite link from **My Trips** or when creating a new trip.

---

## Developed By

**Anuj Kuntal** — NITJ Student

GitHub: [anujrj05/Split_trip](https://github.com/anujrj05/Split_trip)
