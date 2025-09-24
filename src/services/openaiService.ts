import { GoogleGenerativeAI } from '@google/generative-ai';

// Note: In a production environment, you should use environment variables
// and implement proper API key management
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || '';

let genAI: GoogleGenerativeAI | null = null;

if (GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
  error?: string;
}

// Scraft-specific system prompt to make the AI assistant more contextual
const SCRAFT_SYSTEM_PROMPT = `You are ScraftX, a helpful AI assistant for Scraft - an Indian handicrafts e-commerce platform. You specialize in:

1. Traditional Indian handicrafts (pottery, textiles, jewelry, home decor, toys, bags)
2. Artisan stories and craft techniques
3. Product recommendations based on user preferences
4. Cultural significance of different crafts
5. Care instructions for handmade items
6. Festival collections and seasonal offerings

Keep responses friendly, informative, and focused on Scraft's products and Indian handicrafts. If users ask about topics outside your expertise, politely redirect them to relevant Scraft content or suggest contacting customer support.

Always maintain a warm, culturally-aware tone that celebrates Indian craftsmanship and heritage.`;

// Predefined responses for common Scraft queries
const QUICK_RESPONSES = {
  'show products': 'I\'d love to help you explore our beautiful collections! We have pottery, sarees, jewelry, home decor, toys, and bags - all handcrafted by skilled Indian artisans. Which category interests you most?',
  'artisan stories': 'Our artisans have incredible stories! Each piece in our collection represents generations of traditional knowledge. Would you like to know about specific crafts like pottery from Khurja, textiles from Gujarat, or jewelry from Rajasthan?',
  'festival sales': 'We have amazing festival collections! During Diwali, Holi, and other celebrations, we feature special items that capture the spirit of Indian festivals. Check our homepage for current festival offers!',
  'care instructions': 'Handmade items need special care! For textiles, gentle hand wash is best. For pottery, avoid sudden temperature changes. For jewelry, store in dry places. Would you like specific care tips for any particular item?',
  'shipping': 'We offer secure shipping across India with careful packaging to protect your handcrafted treasures. Most orders are delivered within 5-7 business days. International shipping is also available!',
  'returns': 'We want you to love your purchase! If you\'re not satisfied, you can return items within 30 days in original condition. Our customer support team will guide you through the process.'
};

export class GeminiService {
  private conversationHistory: ChatMessage[] = [];
  private model: any = null;

  constructor() {
    // Initialize with system prompt
    this.conversationHistory.push({
      id: 'system-prompt',
      role: 'system',
      content: SCRAFT_SYSTEM_PROMPT,
      timestamp: new Date()
    });

    // Initialize Gemini model
    if (genAI) {
      this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    }
  }

  // Check if user query matches any quick responses
  private getQuickResponse(userMessage: string): string | null {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(QUICK_RESPONSES)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return null;
  }

  // Add message to conversation history
  private addMessage(role: 'user' | 'assistant', content: string): ChatMessage {
    const message: ChatMessage = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date()
    };
    
    this.conversationHistory.push(message);
    return message;
  }

  // Get chat response from Gemini or quick responses
  async getChatResponse(userMessage: string): Promise<ChatResponse> {
    try {
      console.log('🤖 Gemini Service - Processing message:', userMessage);
      console.log('🔑 API Key present:', !!GEMINI_API_KEY);
      console.log('🔑 API Key format:', GEMINI_API_KEY ? GEMINI_API_KEY.substring(0, 10) + '...' : 'None');
      
      // Add user message to history
      this.addMessage('user', userMessage);
      
      // Check if API key is available
      if (!GEMINI_API_KEY) {
        console.log('❌ No API key found');
        return { 
          message: "I'm currently unable to connect to my AI service. Please make sure the Gemini API key is configured in the .env file.",
          error: "API key not configured"
        };
      }

      // Check for quick responses first
      const quickResponse = this.getQuickResponse(userMessage);
      if (quickResponse) {
        console.log('⚡ Using quick response');
        this.addMessage('assistant', quickResponse);
        return { message: quickResponse };
      }

      // If no quick response and no model available, return error
      if (!this.model) {
        console.log('❌ Model not initialized');
        return {
          message: "I'm having trouble connecting to my AI service. Please check your API key configuration.",
          error: "Model not initialized"
        };
      }

      console.log('🚀 Calling Gemini API...');

      // Build conversation context for Gemini
      const conversationContext = this.conversationHistory
        .filter(msg => msg.role !== 'system')
        .slice(-10) // Keep last 10 messages for context
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');

      // Create the full prompt with system context
      const fullPrompt = `${SCRAFT_SYSTEM_PROMPT}

Previous conversation:
${conversationContext}

User: ${userMessage}

Please respond as ScraftX, keeping your answer helpful, friendly, and focused on Scraft's handicrafts:`;

      // Generate response using Gemini
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const assistantResponse = response.text() || 
        "I apologize, but I'm having trouble responding right now. Please try again or contact our support team.";

      console.log('✅ Gemini API response received');
      
      // Add assistant response to history
      this.addMessage('assistant', assistantResponse);

      return { message: assistantResponse };

    } catch (error) {
      console.error('❌ Gemini API Error:', error);
      console.error('❌ Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        status: (error as any)?.status,
        statusText: (error as any)?.statusText
      });
      
      // Fallback response for API errors
      const errorResponse = "I'm experiencing some technical difficulties right now. In the meantime, you can browse our collections or contact our support team at support@scraft.com for immediate assistance!";
      this.addMessage('assistant', errorResponse);
      
      return { 
        message: errorResponse,
        error: 'API Error'
      };
    }
  }

  // Get conversation history (excluding system prompt)
  getConversationHistory(): ChatMessage[] {
    return this.conversationHistory.filter(msg => msg.role !== 'system');
  }

  // Clear conversation history (keep system prompt)
  clearHistory(): void {
    this.conversationHistory = this.conversationHistory.filter(msg => msg.role === 'system');
  }

  // Load conversation from localStorage
  loadConversation(messages: ChatMessage[]): void {
    this.conversationHistory = [
      this.conversationHistory[0], // Keep system prompt
      ...messages
    ];
  }
}

// Export singleton instance
export const geminiService = new GeminiService();

// Keep the old export name for backward compatibility
export const openaiService = geminiService;