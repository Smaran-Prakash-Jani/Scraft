// scraft-frontend/src/App.jsx
import React, { useState } from 'react';
import './App.css';

function App() {
  const [mode, setMode] = useState('shopper');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text: input }]);
    let reply = '';
    if (input.toLowerCase().includes('special') || input.includes('खास')) {
      reply = "Every thread carries a blessing. Every color tells a story. This is more than a product — it’s heritage.";
    } else {
      reply = "I’m Scraft’s AI companion. Ask me about the story, craft, or culture behind any product!";
    }
    setMessages(prev => [...prev, { from: 'ai', text: reply }]);
    setInput('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Scraft</h1>
        <button onClick={() => setMode('shopper')}>Shopper</button>
        <button onClick={() => setMode('creator')}>Creator</button>
      </header>
      <main>
        {mode === 'shopper' && (
          <div>
            <h2>Products</h2>
            <div className="product-grid">
              <div className="product-card">
                <h3>Handwoven Kanjivaram Silk Saree</h3>
                <p>₹8,500</p>
                <button onClick={() => {
                  setMessages([{ from: 'ai', text: "Woven with devotion over 3 weeks by Meera in Kanchipuram." }]);
                }}>Ask AI</button>
              </div>
            </div>
          </div>
        )}
        {mode === 'creator' && (
          <div>
            <h2>Dashboard</h2>
            <p>Upload your product and generate stories.</p>
          </div>
        )}
      </main>
      <footer>
        <div className="chat-widget">
          <h3>AI Companion</h3>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.from === 'user' ? 'user' : 'ai'}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </footer>
    </div>
  );
}

export default App;