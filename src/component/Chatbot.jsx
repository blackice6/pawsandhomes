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
      setMessages(prev => [...prev, { sender: 'bot', text: "PawsBot: Sorry, server is down. Check if chatbot_server.py is running." }]);
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
    <div className="chatbot-container"> // Fixed position container bottom-right.
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}> // Toggle button emoji.
        <span>💬</span> // Chat emoji.
      </button>
      {isOpen && ( // Show window if open.
        <div className="chatbot-window"> // Main chat window.
          <div className="chatbot-header"> // Header with title/close.
            <span>PawsBot</span> // Bot name.
            <button onClick={() => setIsOpen(false)}>×</button> // Close button.
          </div>
          <div className="chatbot-messages"> // Scrollable messages container.
            {messages.map((msg, index) => ( // Map messages to UI.
              <div key={index} className={`message ${msg.sender}`}> // Message div with sender class.
                <span>{msg.text}</span> // Message text.
              </div>
            ))}
            {loading && <div className="message bot"><span>Typing...</span></div>} // Loading indicator.
            <div ref={messagesEndRef} /> // Scroll anchor.
          </div>
          <div className="chatbot-input"> // Input area.
            <input // User input field.
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)} // Update input state.
              onKeyPress={handleKeyPress} // Enter to send.
              placeholder="Ask about adoption, costs, contacts..."
              disabled={loading} // Disable during send.
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()}> // Send button.
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

