// Import React hooks - useState for component state, useEffect for side effects, useRef for DOM reference.
import React, { useState, useEffect, useRef } from 'react';
// Import Chatbot CSS - styles the chatbot widget and messages.
import '../css/Chatbot.css';

 // Define Chatbot component - floating chat window for PawsBot.
const Chatbot = () => {
  // isOpen state - toggles chat window open/closed.
  const [isOpen, setIsOpen] = useState(false);
  // messages state - array of chat messages {sender, text}.
  const [messages, setMessages] = useState([
    // Initial bot welcome message.
    { sender: 'bot', text: 'PawsBot: Hi! Ask me about Paws & Homes Rescue Center, adoption, contacts, etc.' }
  ]);
  // input state - current user input text.
  const [input, setInput] = useState('');
  // loading state - shows typing indicator during API call.
  const [loading, setLoading] = useState(false);
  // messagesEndRef - ref to scroll to bottom of messages.
  const messagesEndRef = useRef(null);

  // scrollToBottom function - scrolls messages container to bottom.
  const scrollToBottom = () => {
    // Optional chaining, smooth scroll to messages end.
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // useEffect - auto-scroll when messages change.
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // sendMessage async function - sends user message to backend.
  const sendMessage = async () => {
    // Exit if empty input or loading.
    if (!input.trim() || loading) return;
    // Trim user message.
    const userMsg = input.trim();
    // Add user message to chat.
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    // Clear input field.
    setInput('');
    // Show loading.
    setLoading(true);

    try {
      // POST to Flask /chat endpoint.
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST', // HTTP POST method.
        headers: { 'Content-Type': 'application/json' }, // JSON content type.
        body: JSON.stringify({ message: userMsg }), // Send message as JSON.
      });
      // Parse JSON response.
      const data = await response.json();
      // Add bot response to messages.
      setMessages(prev => [...prev, { sender: 'bot', text: data.response }]);
    } catch (error) {
      // Error handling - server down message.
      setMessages(prev => [...prev, { sender: 'bot', text: "PawsBot: Sorry, the chatbot server is not running. Please start it with: python chatbot_server.py" }]);
    } finally {
      // Always stop loading.
      setLoading(false);
    }
  };

  // handleKeyPress - Enter key sends message.
  const handleKeyPress = (e) => {
    // Check if Enter key pressed.
    if (e.key === 'Enter') sendMessage();
  };

  // Render chatbot UI.
  return (
    <div className="chatbot-container">
      {/* Toggle button emoji */}
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span>💬</span>
      </button>
      {isOpen && (
        <div className="chatbot-window">
          {/* Header with title/close */}
          <div className="chatbot-header">
            <span>PawsBot</span>
            {/* Close button */}
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          {/* Scrollable messages container */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <span>{msg.text}</span>
              </div>
            ))}
            {loading && <div className="message bot"><span>Typing...</span></div>}
            <div ref={messagesEndRef} />
          </div>
          {/* Input area */}
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about adoption, costs, contacts..."
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Export Chatbot for App.js.
export default Chatbot;

