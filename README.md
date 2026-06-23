
# TRip_SpliT


Our website simplifies group trip finances, ensuring everyone stays on budget and enjoys a stress-free journey. With our tools, you can effortlessly track overall expenses, view individual spending summaries, and plan future group expenditures with ease. Say goodbye to confusion and disputes—empower your group to travel smart and make unforgettable memories together!



## Tech Stack

**Frontend:** [![linkedin](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://www.linkedin.com/)

**Backend:** [![twitter](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://twitter.com/)
[![portfolio](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://katherineoelsner.com/)

**Database:** [![twitter](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://twitter.com/)



## Add Environment Variables

### Frontend (Vercel project — Root Directory: `Frontend`)

`REACT_APP_BASE_URL=https://<your-backend>.vercel.app`

### Backend (Vercel project — Root Directory: `Backend`)

`MongoDBURI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/TRiP?retryWrites=true&w=majority&appName=Cluster0`

In MongoDB Atlas: cluster must be **Running**, Network Access must allow `0.0.0.0/0`.

---

## Deploy on Vercel (one link — recommended)

Use **one Vercel project** with repo **Root Directory = `.`** (project root).

1. Import GitHub repo `Split_trip`
2. Root Directory: leave as **`.`** (do not pick Frontend or Backend only)
3. Environment Variables:
   - `MongoDBURI` = your Atlas connection string
4. Deploy
5. Attach domain `split-trip-amber.vercel.app` to this project

Everything runs on one URL:
- Website: `https://your-domain.vercel.app`
- API: same domain (`/user`, `/trip`, `/transaction`, `/health`)

No `REACT_APP_BASE_URL` needed in production.

---

## Deploy on Vercel (two projects — legacy)

1. **Backend project**
   - Import `Split_trip` repo
   - Root Directory: `Backend`
   - Add env: `MongoDBURI`
   - Deploy → note URL (e.g. `https://split-trip-wheat.vercel.app`)

2. **Frontend project**
   - Import same repo again
   - Root Directory: `Frontend`
   - Add env: `REACT_APP_BASE_URL` = backend URL from step 1
   - Deploy
   - Attach domain `split-trip-amber.vercel.app` to **frontend** project only

3. **Test**
   - Backend: `<backend-url>/health` → `databaseConnected: true`
   - Website: `https://split-trip-amber.vercel.app`

---

## How to Run (local)

**Clone the project**

```bash
  git clone https://link-to-project
```

**Go to the project directory**

```bash
  cd TRiP
```

**Open two terminal**


**In First Terminal:**

```bash
  cd frontend
  npm i
  npm run dev
```
**In Second Terminal:**

```bash
  cd backend
  npm i
  npm start
```
**Go to link:**

```bash
   http://localhost:5173/
```

#### Now, you can contribute to the project.

## Developed By
- Anuj kuntal (NITJ Student)


