# Paws & Homes Rescue Center 🐾

Pet adoption web app with smart PawsBot chatbot.

## Quick Start

### Frontend (React)
```bash
npm install
npm start
```
[localhost:3000](http://localhost:3000)

### Backend (PawsBot - Python)
```bash
pip install flask flask-cors pandas
python chatbot_server.py
```
[localhost:5000/chat](http://localhost:5000/chat)

**Both required for chatbot.**

## Features
- Browse adoptable dogs
- Shopping cart
- Admin panel
- **PawsBot**: AI chat - adoption info, contacts, center details (\"what is paws and homes\", costs, hours...)

## Files
- `chatbot_server.py`: Flask API + fuzzy matching
- `pawsandhomes_clean.csv`: 50+ Q&A data
- React app: Chatbot.jsx → floating chat UI

## Test PawsBot
1. Start both servers
2. Chat: \"what is paws and homes\", \"adoption cost\", \"contacts\"
3. Fuzzy works: \"how much dog\" → cost info

Clean, production-ready! 🚀
