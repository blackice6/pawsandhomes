# Paws & Homes Pet Rescue Platform

## Features
- Pet product catalog & cart (customer role)
- PawsBot AI Chatbot (adoption info)
- Admin add products
- Responsive design

## Local Development

### Frontend (React)
```bash
npm install
npm start
```
localhost:3000

### Backend Chatbot
```bash
pip install -r requirements.txt
python chatbot_server.py  # localhost:5000/chat
```

## Deploy to Render (Free!)

### 1. Frontend (Static Site)
1. Build: `npm run build`
2. Render → Static Site → GitHub repo
3. Build: `npm install && npm run build`
4. Publish: `build/`

### 2. Backend Chatbot (Web Service)
1. Render → Web Service → GitHub repo
2. Build: `pip install -r requirements.txt`
3. Start: `gunicorn server:app`
4. Update Chatbot.jsx: `https://your-backend.onrender.com/chat`

**Chatbot URL:** Update `src/component/Chatbot.jsx` line 48 with Render backend URL.

## Cart Flow
1. Login customer (role_id=4)
2. Browse `/ourdogs`
3. Add items → cart 🛒
4. Checkout → `/makepayment`

## Production URLs
- Frontend: https://your-frontend.onrender.com
- Chatbot API: https://your-backend.onrender.com/chat

Ready! 🚀🐕
