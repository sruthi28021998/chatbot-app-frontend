# AI Chatbot: Frontend

Chat interface for an AI-powered chatbot.
Built with Next.js, Tailwind CSS, Axios and Socket.io client.

**Live demo:** https://your-app.vercel.app
**Backend repo:** https://github.com/<your-username>/chatbot-app-backend

## Features
- Sign up, log in, protected pages
- Real-time chat with a typing indicator
- Chat history sidebar, new chat and delete
- Chat styles: casual, professional, creative
- Rate replies with thumbs up or down
- Settings: chatbot name, light and dark theme
- Admin dashboard at /admin
- Responsive layout for mobile and desktop

## Screenshots

- [Login page](screenshots/login.png)
- [Sign up page](screenshots/register.png)
- [Chat page](screenshots/chat.png)
- [Professional style reply](screenshots/professional.png)
- [Dark mode](screenshots/dark-mode.png)
- [Settings](screenshots/settings.png)
- [Admin dashboard](screenshots/admin.png)

## Tech stack
Next.js, React, Tailwind CSS, Axios, Socket.io client

## Setup
```bash
npm install
cp .env.example .env.local
npm run dev
```
Set `NEXT_PUBLIC_API_URL` in `.env.local` to the backend URL (no trailing slash, no /api), for example `http://localhost:5000`.

## Scripts
| Command | Description |
| --- | --- |
| npm run dev | Development server |
| npm run build | Production build |
| npm start | Run the production build |

## Folder structure
```
frontend/
├── pages/         index, login, register, chat, admin
├── components/    Sidebar, ChatWindow, MessageBubble, SettingsModal
├── context/       AuthContext
├── services/      api (Axios)
├── utils/         socket
├── styles/        globals.css (Tailwind)
└── screenshots/
```

## Deployment
Deployed on Vercel. Set `NEXT_PUBLIC_API_URL` to the deployed backend URL.

## Future plans
- Multilingual support
- Voice input and output
- Markdown and code rendering in replies
- Conversation search and rename
- Streaming responses