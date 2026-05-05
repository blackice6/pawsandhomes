import { useState, useEffect, useRef } from "react";

// ─── CSV Parser ───────────────────────────────────────────────────────────────
function parseCSV(csvText) {
  const lines = csvText.trim().split("\n");
  const entries = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = [];
    let current = "";
    let inQuotes = false;
    for (const ch of lines[i]) {
      if (ch === '"') { inQuotes = !inQuotes; continue; }
      if (ch === "," && !inQuotes) { cols.push(current.trim()); current = ""; continue; }
      current += ch;
    }
    cols.push(current.trim());
    if (cols.length < 3) continue;
    const keywords = cols[0].split(",").map((k) => k.trim().toLowerCase()).filter(Boolean);
    const response = cols[2];
    entries.push({ keywords, response });
  }
  return entries;
}

function matchResponse(input, entries) {
  const lower = input.toLowerCase();
  for (const entry of entries) {
    if (entry.keywords.some((k) => lower.includes(k))) return entry.response;
  }
  return "Great question! 🐾 I'm not sure about that one — please reach out directly:\n📞 +254 729 932 162\n✉️ pawsandhomes@gmail.com\n\nOur team is happy to help!";
}

// ─── Styles (injected once into <head>) ──────────────────────────────────────
const STYLE_ID = "pawsbot-styles-v2";
const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=DM+Sans:wght@400;500&display=swap');

.pb-reset *, .pb-reset *::before, .pb-reset *::after { box-sizing: border-box; margin: 0; padding: 0; }

.pb-fab {
  position: fixed; bottom: 28px; right: 28px;
  width: 58px; height: 58px; border-radius: 50%;
  background: #2D5016; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 26px; line-height: 1;
  box-shadow: 0 6px 24px rgba(45,80,22,0.35), 0 2px 6px rgba(45,80,22,0.2);
  transition: transform 0.18s cubic-bezier(.34,1.56,.64,1), box-shadow 0.18s;
  z-index: 9998;
}
.pb-fab:hover { transform: scale(1.08); box-shadow: 0 10px 32px rgba(45,80,22,0.4); }
.pb-fab:active { transform: scale(0.96); }

.pb-badge {
  position: absolute; top: -3px; right: -3px;
  width: 18px; height: 18px; border-radius: 50%;
  background: #D85A30; color: #fff;
  font-size: 10px; font-weight: 500; font-family: 'DM Sans', sans-serif;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid #fff;
  animation: pb-popIn 0.3s cubic-bezier(.34,1.56,.64,1);
}
@keyframes pb-popIn { from{transform:scale(0)} to{transform:scale(1)} }

.pb-window {
  position: fixed; bottom: 100px; right: 28px;
  width: 370px; max-height: 90vh;
  border-radius: 18px; overflow: hidden;
  box-shadow: 0 16px 56px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.1);
  display: flex; flex-direction: column;
  z-index: 9999; transform-origin: bottom right;
  transition: transform 0.22s cubic-bezier(.34,1.56,.64,1), opacity 0.18s ease;
  font-family: 'DM Sans', sans-serif;
}
.pb-window.open  { transform: scale(1);   opacity: 1; pointer-events: all; }
.pb-window.close { transform: scale(0.7); opacity: 0; pointer-events: none; }

.pb-shell {
  width: 100%; max-width: 400px; border-radius: 18px; overflow: hidden;
  border: 1px solid #D5E8C0;
  box-shadow: 0 8px 32px rgba(45,80,22,0.12);
  display: flex; flex-direction: column;
  font-family: 'DM Sans', sans-serif; background: #fff;
}

.pb-header {
  background: #2D5016; padding: 13px 16px;
  display: flex; align-items: center; gap: 11px; flex-shrink: 0;
}
.pb-close-btn {
  margin-left: auto; background: transparent; border: none; cursor: pointer;
  color: #A8D870; font-size: 18px; line-height: 1;
  padding: 2px 4px; border-radius: 6px; transition: background 0.12s;
}
.pb-close-btn:hover { background: rgba(255,255,255,0.12); }
.pb-avatar {
  width: 38px; height: 38px; border-radius: 50%; background: #A8D870;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; flex-shrink: 0;
}
.pb-header-info h2 {
  font-family: 'Fraunces', serif; font-size: 15px; font-weight: 600;
  color: #F2F8E8; margin: 0 0 1px;
}
.pb-header-info p { font-size: 11px; color: #A8D870; margin: 0; display: flex; align-items: center; gap: 4px; }
.pb-dot {
  width: 6px; height: 6px; border-radius: 50%; background: #A8D870;
  animation: pb-pulse 2s infinite;
}
@keyframes pb-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

.pb-msgs {
  overflow-y: auto; padding: 14px;
  display: flex; flex-direction: column; gap: 10px;
  background: #F9FCF5; flex: 1;
  min-height: 240px; max-height: 320px;
}
.pb-msgs::-webkit-scrollbar { width: 4px; }
.pb-msgs::-webkit-scrollbar-thumb { background: #C5DFA5; border-radius: 4px; }

.pb-row { display: flex; gap: 8px; align-items: flex-end; max-width: 90%; }
.pb-row.bot { align-self: flex-start; }
.pb-row.user { align-self: flex-end; flex-direction: row-reverse; }

.pb-icon {
  width: 26px; height: 26px; border-radius: 50%; background: #2D5016;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; flex-shrink: 0;
}
.pb-bubble {
  padding: 8px 12px; font-size: 13px; line-height: 1.55;
  white-space: pre-wrap; border-radius: 16px;
  animation: pb-fadeUp 0.2s ease;
}
@keyframes pb-fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
.pb-row.bot .pb-bubble {
  background: #fff; color: #1E2F0F;
  border-bottom-left-radius: 4px; border: 1px solid #D5E8C0;
}
.pb-row.user .pb-bubble {
  background: #2D5016; color: #F2F8E8; border-bottom-right-radius: 4px;
}

.pb-typing { display:flex; gap:4px; align-items:center; padding:8px 12px; }
.pb-typing span {
  width:6px; height:6px; border-radius:50%; background:#7BB545;
  animation: pb-bounce 1s infinite;
}
.pb-typing span:nth-child(2){animation-delay:.15s}
.pb-typing span:nth-child(3){animation-delay:.3s}
@keyframes pb-bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }

.pb-chips {
  padding: 9px 12px; display: flex; flex-wrap: wrap; gap: 5px;
  background: #F0F8E6; border-top: 1px solid #D5E8C0; flex-shrink: 0;
}
.pb-chip {
  font-size: 11px; font-family: 'DM Sans', sans-serif;
  padding: 4px 10px; border-radius: 20px;
  border: 1px solid #A8D870; background: #fff; color: #2D5016;
  cursor: pointer; font-weight: 500;
  transition: background 0.14s, color 0.14s;
}
.pb-chip:hover { background: #2D5016; color: #F2F8E8; border-color: #2D5016; }

.pb-input-row {
  display: flex; align-items: center; gap: 8px; padding: 10px 13px;
  background: #fff; border-top: 1px solid #D5E8C0; flex-shrink: 0;
}
.pb-input {
  flex: 1; border: 1px solid #C5DFA5; border-radius: 20px;
  padding: 8px 13px; font-size: 13px; font-family: 'DM Sans', sans-serif;
  background: #F9FCF5; color: #1E2F0F; outline: none;
  transition: border-color 0.14s;
}
.pb-input:focus { border-color: #2D5016; }
.pb-input::placeholder { color: #9BB87A; }

.pb-send {
  width: 34px; height: 34px; border-radius: 50%;
  background: #2D5016; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  transition: background 0.14s, transform 0.1s;
}
.pb-send:hover { background: #3D6B1F; }
.pb-send:active { transform: scale(0.95); }

@media (max-width: 440px) {
  .pb-window { width: calc(100vw - 16px); right: 8px; bottom: 86px; }
  .pb-fab { bottom: 18px; right: 18px; }
  
  .pb-msgs {
    min-height: 200px;
    max-height: 280px;
  }
  
  .pb-bubble {
    font-size: 12px;
    padding: 6px 10px;
  }
  
  .pb-input {
    font-size: 12px;
    padding: 6px 10px;
  }
  
  .pb-chip {
    font-size: 10px;
    padding: 3px 8px;
  }
}
`;

// ─── Component ────────────────────────────────────────────────────────────────
/**
 * PawsBot
 *
 * Props:
 *   csvText      {string}   Raw CSV text from pawsbot_responses.csv
 *   floating     {boolean}  true = fixed FAB + popup (default), false = inline card
 *   defaultOpen  {boolean}  Start the chat open (default false)
 */
export default function PawsBot({ csvText = "", floating = true, defaultOpen = false }) {
  const [entries, setEntries]   = useState([]);
  const [open, setOpen]         = useState(defaultOpen || !floating);
  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState("");
  const [typing, setTyping]     = useState(false);
  const [hasNew, setHasNew]     = useState(false);
  const msgsRef  = useRef(null);
  const inputRef = useRef(null);

  // Inject styles once
  useEffect(() => {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = css;
      document.head.appendChild(el);
    }
  }, []);

  // Parse CSV
  useEffect(() => {
    if (csvText) setEntries(parseCSV(csvText));
  }, [csvText]);

  // Welcome message
  useEffect(() => {
    const t = setTimeout(() => {
      setMessages([{
        id: 1, who: "bot",
        text: "Hi there! 🐶 Welcome to Paws & Homes!\nI'm PawsBot — ask me about adoptions, breeds, costs, or anything else!"
      }]);
      if (floating && !defaultOpen) setHasNew(true);
    }, 700);
    return () => clearTimeout(t);
  }, [floating, defaultOpen]);

  // Auto-scroll
  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages, typing]);

  const handleOpen  = () => { setOpen(true); setHasNew(false); };
  const handleClose = () => setOpen(false);

  const send = (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), who: "user", text: text.trim() }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, who: "bot", text: matchResponse(text, entries) }]);
    }, 650 + Math.random() * 450);
    inputRef.current?.focus();
  };

  const quickChips = ["adopt a dog", "adoption cost", "visiting hours", "available breeds", "contact", "donate"];

  const chatPanel = (
    <div className="pb-reset">
      {/* Header */}
      <div className="pb-header">
        <div className="pb-avatar">🐾</div>
        <div className="pb-header-info">
          <h2>PawsBot</h2>
          <p><span className="pb-dot" /> Paws &amp; Homes · Online now</p>
        </div>
        {floating && (
          <button className="pb-close-btn" onClick={handleClose} aria-label="Close chat">✕</button>
        )}
      </div>

      {/* Messages */}
      <div className="pb-msgs" ref={msgsRef} role="log" aria-live="polite" aria-label="Chat messages">
        {messages.map(msg => (
          <div key={msg.id} className={`pb-row ${msg.who}`}>
            {msg.who === "bot" && <div className="pb-icon">🐾</div>}
            <div className="pb-bubble">{msg.text}</div>
          </div>
        ))}
        {typing && (
          <div className="pb-row bot">
            <div className="pb-icon">🐾</div>
            <div className="pb-bubble">
              <div className="pb-typing"><span /><span /><span /></div>
            </div>
          </div>
        )}
      </div>

      {/* Quick chips */}
      <div className="pb-chips" role="group" aria-label="Quick questions">
        {quickChips.map(c => (
          <button key={c} className="pb-chip" onClick={() => send(c)}>{c}</button>
        ))}
      </div>

      {/* Input */}
      <div className="pb-input-row">
        <input
          ref={inputRef}
          className="pb-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send(input)}
          placeholder="Ask about adoptions, breeds, costs…"
          maxLength={200}
          aria-label="Type your message"
        />
        <button className="pb-send" onClick={() => send(input)} aria-label="Send message">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="#F2F8E8" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );

  // ── Inline mode ──────────────────────────────────────────────────────────────
  if (!floating) {
    return <div className="pb-shell pb-reset">{chatPanel}</div>;
  }

  // ── Floating mode ────────────────────────────────────────────────────────────
  return (
    <>
      <div className={`pb-window pb-reset ${open ? "open" : "close"}`}
        role="dialog" aria-label="PawsBot chat" aria-modal="true">
        {chatPanel}
      </div>

      {!open && (
        <button className="pb-fab" onClick={handleOpen} aria-label="Open chat with PawsBot">
          🐾
          {hasNew && <span className="pb-badge" aria-label="1 new message">1</span>}
        </button>
      )}
    </>
  );
}

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  HOW TO ADD TO YOUR REACT / VITE APP (Render)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1 — Copy files into your project:
  src/components/PawsBot.jsx          ← this file
  public/pawsbot_responses.csv        ← the CSV file

STEP 2 — In your App.jsx (or root layout), add:

  import { useState, useEffect } from "react";
  import PawsBot from "./components/PawsBot";

  function App() {
    const [csv, setCsv] = useState("");

    useEffect(() => {
      fetch("/pawsbot_responses.csv")
        .then(r => r.text())
        .then(setCsv);
    }, []);

    return (
      <>
        // ... rest of your app ...
        <PawsBot csvText={csv} floating={true} />
      </>
    );
  }

STEP 3 — Deploy to Render as usual. Done! 🐾

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  PROP OPTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  floating     true   → Fixed FAB bubble (bottom-right corner) [DEFAULT]
               false  → Inline card (embed anywhere on a page)

  defaultOpen  false  → Chat starts collapsed [DEFAULT]
               true   → Chat starts open

  csvText      Pass the raw CSV string — fetch from /public or import as text

  Examples:
    <PawsBot csvText={csv} floating={true} />           // FAB bubble
    <PawsBot csvText={csv} floating={false} />          // inline card
    <PawsBot csvText={csv} floating={true} defaultOpen={true} />
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/
