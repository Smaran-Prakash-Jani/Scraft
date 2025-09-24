import React, { useState, useEffect, useRef } from 'react';
import { openaiService, ChatMessage } from '../services/openaiService';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load conversation history on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('scraftx-chat-history');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
        openaiService.loadConversation(parsedMessages);
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
    
    // Add initial welcome message if no history
    if (!savedMessages) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: "Hello! I'm ScraftX, your personal craft assistant. How can I help you explore our beautiful handcrafted collections today?",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save conversation history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('scraftx-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage.trim();
    if (!textToSend || isLoading) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Get AI response
      const response = await openaiService.getChatResponse(textToSend);
      
      // Simulate typing delay for better UX
      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.message,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble responding right now. Please try again or contact our support team.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (action: string) => {
    const quickMessages = {
      'Show Products': 'Show me your product collections',
      'Artisan Stories': 'Tell me about your artisan stories',
      'Festival Sales': 'What festival collections do you have?'
    };
    
    const message = quickMessages[action as keyof typeof quickMessages];
    if (message) {
      handleSendMessage(message);
    }
  };

  const clearChat = () => {
    setMessages([]);
    openaiService.clearHistory();
    localStorage.removeItem('scraftx-chat-history');
    
    // Add welcome message back
    const welcomeMessage: ChatMessage = {
      id: 'welcome-new',
      role: 'assistant',
      content: "Hello! I'm ScraftX, your personal craft assistant. How can I help you explore our beautiful handcrafted collections today?",
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white bg-opacity-95 backdrop-blur-md rounded-lg shadow-2xl border border-white border-opacity-20 animate-fadeInUp flex flex-col">
          <div className="bg-terracotta-brown text-white p-4 rounded-t-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-golden-tan rounded-full flex items-center justify-center mr-3">
                  <span className="text-deep-espresso font-bold text-sm">SX</span>
                </div>
                <div>
                  <h3 className="font-playfair font-bold">ScraftX</h3>
                  <p className="text-xs opacity-90">
                    {isTyping ? 'Typing...' : 'Your Craft Assistant'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={clearChat}
                  className="text-white hover:text-golden-tan transition-colors"
                  title="Clear chat"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-golden-tan transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex items-start space-x-2 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-terracotta-brown' 
                      : 'bg-golden-tan'
                  }`}>
                    <span className="text-xs text-deep-espresso font-bold">
                      {message.role === 'user' ? 'U' : 'SX'}
                    </span>
                  </div>
                  <div className={`rounded-lg p-3 max-w-xs ${
                    message.role === 'user' 
                      ? 'bg-terracotta-brown text-white' 
                      : 'bg-warm-cream text-deep-espresso'
                  }`}>
                    <p className="text-sm font-inter whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-white opacity-70' : 'text-deep-espresso opacity-60'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-golden-tan rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-deep-espresso font-bold">SX</span>
                  </div>
                  <div className="bg-warm-cream rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-terracotta-brown rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-terracotta-brown rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-terracotta-brown rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions - Show only when no messages or just welcome message */}
              {messages.length <= 1 && !isTyping && (
                <div className="space-y-2">
                  <p className="text-xs text-deep-espresso opacity-60 text-center font-inter">Quick Actions</p>
                  <div className="flex flex-wrap gap-2">
                    {['Show Products', 'Artisan Stories', 'Festival Sales'].map((action) => (
                      <button
                        key={action}
                        onClick={() => handleQuickAction(action)}
                        className="bg-golden-tan text-deep-espresso px-3 py-1 rounded-full text-xs font-inter hover:bg-terracotta-brown hover:text-white transition-colors"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex">
              <input 
                ref={inputRef}
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-terracotta-brown text-sm font-inter disabled:opacity-50"
              />
              <button 
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-terracotta-brown text-white px-4 py-2 rounded-r-md hover:bg-golden-tan transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-16 h-16 bg-terracotta-brown text-white rounded-full shadow-2xl hover:bg-golden-tan transition-all duration-300 transform hover:scale-110 ${
          isHovered ? 'animate-bounce' : 'animate-chatbot-float'
        } flex items-center justify-center relative`}
      >
        {/* Chat Icon */}
        {!isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        
        {/* Notification Dot */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-golden-tan rounded-full animate-pulse"></div>
        )}
      </button>

      {/* Tooltip */}
      {isHovered && !isOpen && (
        <div className="absolute bottom-20 right-0 bg-deep-espresso text-white px-3 py-2 rounded-lg text-sm font-inter whitespace-nowrap animate-fadeIn">
          Chat with ScraftX
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-deep-espresso"></div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;