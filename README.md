# 🧠 MindEase — Mental Health Support Chatbot

A compassionate AI-powered mental health chatbot built with React, Node.js, and Claude AI. It listens empathetically, detects stress levels in real time, and shows crisis resources when needed.

![MindEase Banner](https://img.shields.io/badge/MindEase-Mental%20Health%20Chatbot-5c6bc0?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/status-Live-brightgreen?style=for-the-badge)

---

## 🌐 Live Demo

🔗 [mental-health-chatbot.vercel.app](https://mental-health-chatbot.vercel.app)

---

## ✨ Features

- 💬 **Empathetic AI Chat** — Powered by Claude AI with a mental health–focused system prompt
- 🎯 **Real-Time Stress Detection** — Keyword-based NLP detects low / medium / high stress levels
- 🆘 **Auto Crisis Resources** — Helplines and support links shown automatically when high stress is detected
- 🧠 **Conversation Memory** — Full chat history sent with each request for context-aware responses
- 🎨 **Mood Indicator** — Color-coded stress level display updates in real time
- 📱 **Responsive Design** — Works on desktop and mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| AI Model | Claude (Anthropic API) |
| Deployment (Frontend) | Vercel |
| Deployment (Backend) | Render |

---

## 📁 Project Structure

```
mental-health-chatbot/
├── frontend/               ← React app (deployed on Vercel)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── Chat.jsx
│   │   │   ├── Message.jsx
│   │   │   └── Resources.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
├── backend/                ← Node.js server (deployed on Render)
│   ├── server.js
│   ├── routes/
│   │   └── chat.js
│   └── .env
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- An Anthropic API key → [console.anthropic.com](https://console.anthropic.com)

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/mental-health-chatbot.git
cd mental-health-chatbot
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
ANTHROPIC_API_KEY=your_api_key_here
PORT=5000
```

Start the backend:

```bash
node server.js
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ☁️ Deployment

### Backend → Render
1. Go to [render.com](https://render.com) and create a new **Web Service**
2. Connect your GitHub repo
3. Set Root Directory to `backend`
4. Set Start Command to `node server.js`
5. Add environment variable: `ANTHROPIC_API_KEY = your_key`

### Frontend → Vercel
1. Go to [vercel.com](https://vercel.com) and import your GitHub repo
2. Set Root Directory to `frontend`
3. Set Framework to `Vite`
4. Add environment variable: `VITE_API_URL = your_render_backend_url`

---

## 🆘 Crisis Resources

> ⚠️ This chatbot is **not a replacement** for professional mental health care.

| Resource | Contact |
|---|---|
| 988 Suicide & Crisis Lifeline | Call or text **988** |
| Crisis Text Line | Text HOME to **741741** |
| NAMI | [nami.org](https://www.nami.org) |
| 7 Cups (Free Chat Support) | [7cups.com](https://www.7cups.com) |

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

