# 🚀 MERN Stack Portfolio

A professional full-stack portfolio built with React.js, Node.js, Express.js, MongoDB, Three.js, and Tailwind CSS.

🔗 **Live Site:** https://my-portfolio-sooty-tau-79.vercel.app

---

## ✨ Features

| Feature | Implementation |
|---|---|
| Animated 3D background | Three.js — particle field + wireframe geometries, mouse-reactive |
| Typewriter effect | `react-type-animation` with multiple roles |
| Magnetic CTA button | Pure JS mouse-offset transform |
| Dark / Light mode | Tailwind `class` strategy + localStorage persistence |
| Skills with animated bars | Framer Motion scroll-triggered fill animation |
| Projects with tech filter | React state filter + Framer Motion `AnimatePresence` |
| Project deep-dive modal | Click card → modal with technical challenge details |
| 3D flip certification cards | CSS `preserve-3d` + Framer Motion rotateY |
| Animated vertical timeline | Scroll-triggered left/right alternating entries |
| Contact form | Validated, honeypot spam protection, stored in MongoDB |
| Nodemailer auto-reply | Sends notification to you + auto-reply to sender |
| CV download (PDF + DOCX) | Served via Express route with download analytics |
| Admin CMS dashboard | JWT-protected `/admin` — manage projects & read messages |
| System status widget | Live API health panel — uptime, DB latency, download count |

---

## 🏗 Architecture

```
Browser (React + Three.js)
        │
        │  HTTP / REST
        ▼
  Express.js API (Node.js)
        │
        ├── /api/contact   → POST saves to MongoDB, sends Nodemailer emails
        ├── /api/cv        → GET streams PDF/DOCX from /uploads, tracks downloads
        ├── /api/projects  → CRUD, public GET / protected POST/PUT/DELETE
        ├── /api/auth      → POST /login returns JWT
        └── /api/stats     → Live DB ping, uptime, message/download counts
        │
        ▼
  MongoDB Atlas (Mongoose)
  Collections: contacts · projects · downloadstats
```

---

## 📁 Folder Structure

```
mern-portfolio/
├── client/                     # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ThreeBackground.jsx   # Three.js canvas
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Timeline.jsx
│   │   │   ├── Certifications.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── SystemStatus.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Admin.jsx             # Hidden /admin CMS
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/
│   │   │   └── useInView.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                     # Node.js + Express backend
│   ├── models/
│   │   ├── Contact.js
│   │   ├── Project.js
│   │   └── DownloadStat.js
│   ├── controllers/
│   │   ├── contactController.js
│   │   ├── cvController.js
│   │   ├── authController.js
│   │   └── projectController.js
│   ├── routes/
│   │   ├── contact.js
│   │   ├── cv.js
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── stats.js
│   ├── middleware/
│   │   ├── auth.js               # JWT protect middleware
│   │   └── errorHandler.js
│   ├── uploads/
│   │   ├── resume.pdf            # ← PUT YOUR RESUME HERE
│   │   └── resume.docx           # ← PUT YOUR RESUME HERE
│   └── server.js
│
├── .gitignore
└── README.md
```

---

## 🔌 API Routes

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| `POST` | `/api/contact` | ❌ | Submit contact form, store in DB, send emails |
| `GET`  | `/api/contact` | ✅ JWT | Get all messages (admin) |
| `GET`  | `/api/cv/download/pdf` | ❌ | Download resume PDF |
| `GET`  | `/api/cv/download/docx` | ❌ | Download resume DOCX |
| `GET`  | `/api/cv/stats` | ✅ JWT | Download analytics |
| `GET`  | `/api/projects` | ❌ | List all projects |
| `POST` | `/api/projects` | ✅ JWT | Create project (admin CMS) |
| `PUT`  | `/api/projects/:id` | ✅ JWT | Update project |
| `DELETE` | `/api/projects/:id` | ✅ JWT | Delete project |
| `POST` | `/api/auth/login` | ❌ | Admin login, returns JWT |
| `GET`  | `/api/stats` | ❌ | Live system health metrics |

---

## ⚙️ Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)
- Gmail account (for Nodemailer — enable 2FA and create App Password)

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/mern-portfolio.git
cd mern-portfolio
```

### 2. Set up the server
```bash
cd server
npm install
cp .env.example .env
# Fill in your values in .env
```

Add your resume files:
```
server/uploads/resume.pdf
server/uploads/resume.docx
```

### 3. Set up the client
```bash
cd ../client
npm install
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000/api
```

### 4. Run both servers
```bash
# Terminal 1 — backend
cd server && npm run dev

# Terminal 2 — frontend
cd client && npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🚀 Deployment

### Frontend → Vercel
1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Set root directory: `client`
4. Add env var: `VITE_API_URL=https://your-api.onrender.com/api`

### Backend → Render
1. New Web Service on [render.com](https://render.com)
2. Set root directory: `server`
3. Build: `npm install` | Start: `node server.js`
4. Add all `.env` variables in Render dashboard

---

## 🔐 Security Notes

- `.env` is in `.gitignore` — **never committed**
- JWT protects all admin routes
- Honeypot field in contact form blocks bots
- MongoDB URI and email credentials are env-only

---

## 📊 Lighthouse Score

Run `npx lighthouse https://your-portfolio.vercel.app` after deployment and paste score here.

---

*Built for MERN Stack Assignment — April 2026*
