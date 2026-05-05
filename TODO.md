# Chatbot & Cart Implementation TODO

## Plan Breakdown & Progress Tracking

### 1. [x] Create TODO.md
### 2. [x] Setup Chatbot Backend (Flask server created, pip installing)

   - Rename `dodschatbot.py` -> `chatbot_server.py`
   - Add Flask: load CSV, `/chat` POST endpoint ({"message": str} -> {"response": str})
   - Install: `source chat.venv/bin/activate && pip install flask pandas`
   - Test: `python chatbot_server.py` (localhost:5000/chat)

### 3. [x] Create Frontend Components
   - [x] `src/context/CartContext.js` (cart state, total, localStorage)
   - [x] `src/component/Chatbot.jsx` + `src/css/Chatbot.css`
   - [x] `src/component/Cart.jsx` + `src/css/Cart.css`
   - `src/component/Chatbot.jsx` + `src/css/Chatbot.css` (widget, messages, fetch to localhost:5000/chat)
   - `src/component/Cart.jsx` + `src/css/Cart.css` (modal, list, total, qty controls)

### 4. [x] Update Existing Files (partial)
   - [x] `src/App.js`: Added CartProvider, Chatbot, CartIcon
   - `src/App.js`: Import Context Provider, wrap Router, add Chatbot
   - `src/component/Navbar.jsx`: Cart icon/badge, open Cart modal
   - `src/component/OuDogs.jsx`: Add "Add to Cart" button per product
   - `src/component/Makepayment.jsx`: Handle cart vs single product

### 5. [] Testing & Demo
   - Run backend + frontend
   - Test: Chatbot queries (e.g., "adoption cost"), add products to cart (total calc), checkout
   - Commands: `python chatbot_server.py & npm start`

**Next Step: Proceed to Step 2 after approval.**

