# 🧑‍💻 Personal Portfolio

A clean, responsive developer portfolio built with **React** and **Node.js** — showcasing projects, skills, and a working contact form backed by an Express API.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS-Modules-264de4?style=flat&logo=css3&logoColor=white)
![Deployed](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat&logo=vercel&logoColor=white)

---

## ✨ Features

- **Responsive Design** — Looks great on mobile, tablet, and desktop
- **Animated Hero Section** — Eye-catching intro with smooth transitions
- **Projects Showcase** — Cards with tech stack tags, live links, and GitHub links
- **Skills Section** — Visual breakdown of languages, frameworks, and tools
- **Working Contact Form** — Backed by an Express API with email delivery (Nodemailer)
- **Dark / Light Mode** — Theme toggle saved to localStorage
- **SEO Friendly** — Proper meta tags and Open Graph support
- **Fast Load** — Optimized images and lazy loading

---

## 📁 Project Structure

```
portfolio/
├── client/                  # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   ├── Hero/
│   │   │   ├── Projects/
│   │   │   ├── Skills/
│   │   │   ├── Contact/
│   │   │   └── Footer/
│   │   ├── data/
│   │   │   └── projects.js  # Your project data lives here
│   │   ├── App.jsx
│   │   └── index.jsx
│   └── package.json
├── server/                  # Node.js + Express backend
│   ├── routes/
│   │   └── contact.js       # Contact form endpoint
│   ├── index.js
│   └── package.json
├── .env.example
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- A Gmail account (for the contact form)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio
```

### 2. Set up the backend

```bash
cd server
npm install
cp ../.env.example .env
```

Edit `.env`:

```env
PORT=5000
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your-app-password       # Use a Gmail App Password, not your real password
EMAIL_TO=your.email@gmail.com
```

Start the server:

```bash
node index.js
```

### 3. Set up the frontend

```bash
cd ../client
npm install
npm start
```

The portfolio will open at `http://localhost:3000`

---

## ✏️ Customising Your Portfolio

All your personal content lives in a few easy-to-edit files:

**Add your projects** — edit `client/src/data/projects.js`:

```js
export const projects = [
  {
    title: "REST API with Auth",
    description: "A production-ready API with JWT authentication built using FastAPI and PostgreSQL.",
    tags: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    github: "https://github.com/YOUR_USERNAME/rest-api-auth",
    live: null,
  },
  // Add more projects here...
];
```

**Update your details** — edit `client/src/data/profile.js`:

```js
export const profile = {
  name: "Your Name",
  title: "Software Engineer",
  bio: "I build things for the web.",
  github: "https://github.com/YOUR_USERNAME",
  linkedin: "https://linkedin.com/in/YOUR_USERNAME",
};
```

---

## 📬 Contact Form API

The Express backend exposes a single endpoint:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/contact` | Send a contact form email |

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hey, I'd love to work with you!"
}
```

---

## 🌐 Deployment

**Frontend** — Deploy the `client` folder to [Vercel](https://vercel.com) (free):
```bash
npm install -g vercel
cd client
vercel
```

**Backend** — Deploy the `server` folder to [Render](https://render.com) (free tier available). Set your environment variables in the Render dashboard.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend Framework | React 18 |
| Styling | CSS Modules |
| Backend | Node.js + Express |
| Email | Nodemailer |
| Deployment (frontend) | Vercel |
| Deployment (backend) | Render |

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
