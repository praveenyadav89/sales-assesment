Sales Dashboard

Full-stack sales dashboard built with React (TypeScript) and Node.js (Express).
Data is served from a local JSON file — no database setup required.

---

Project Structure

sales-dashboard/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   └── index.ts
│   ├── sales.json
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── api/
│   │   ├── hooks/
│   │   └── App.tsx
│   └── package.json
│
└── README.md

---

Tech Stack

Frontend:
- React + TypeScript
- Axios
- ECharts

Backend:
- Node.js
- Express
- TypeScript

---

Setup

Backend:
cd backend
npm install
npm run dev

Runs on: http://localhost:3001

Frontend:
cd frontend
npm install
npm start

Runs on: http://localhost:3000

---

API

GET /api/states → list of states
GET /api/dates?state=... → min/max dates
GET /api/dashboard → aggregated dashboard data

---

Features

- State and date-based filtering
- KPI summary (sales, profit, orders, etc.)
- Multiple charts (category, segment, trend, products)
- Responsive layout
- Light/Dark theme
- Modular frontend and backend structure

---

Notes

- Uses sales.json as the only data source
- No database or external service required
