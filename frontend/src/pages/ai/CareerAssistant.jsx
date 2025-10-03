import { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Lightbulb, TrendingUp, Target, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

const CareerAssistant = () => {
  const { careerAssistant } = useApp();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! I'm your AI Career Assistant. I can help you with career planning, skill development, job search strategies, and professional growth. What would you like to discuss today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickPrompts = [
    {
      icon: Target,
      text: 'How do I transition to a new career?',
      color: 'primary',
    },
    {
      icon: TrendingUp,
      text: 'What skills should I learn for career growth?',
      color: 'secondary',
    },
    {
      icon: Lightbulb,
      text: 'Help me prepare for a technical interview',
      color: 'accent',
    },
    {
      icon: BookOpen,
      text: 'How to negotiate a better salary?',
      color: 'info',
    },
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: generateAIResponse(input),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setLoading(false);
    }, 1500);
  };

  const generateAIResponse = (question) => {
    // Simulated AI responses based on question content
    if (question.toLowerCase().includes('transition') || question.toLowerCase().includes('career change')) {
      return `Making a career transition is a significant step. Here's a structured approach:

1. **Self-Assessment**: Identify your transferable skills and what you enjoy doing
2. **Research**: Learn about your target industry and required skills
3. **Skill Gap Analysis**: Identify what you need to learn
4. **Build Portfolio**: Create projects showcasing your new skills
5. **Network**: Connect with professionals in your target field
6. **Start Small**: Consider freelance work or side projects first

Would you like me to elaborate on any of these steps?`;
    }

    if (question.toLowerCase().includes('skills') || question.toLowerCase().includes('learn')) {
      return `The most valuable skills for career growth in 2025 include:

**Technical Skills:**
- Cloud Computing (AWS, Azure, GCP)
- AI/Machine Learning basics
- Data Analysis & Visualization
- Modern Web Development (React, Next.js)

**Soft Skills:**
- Leadership & Team Management
- Communication & Presentation
- Problem-Solving & Critical Thinking
- Adaptability & Continuous Learning

I recommend starting with 1-2 skills aligned with your career goals. Which area interests you most?`;
    }

    if (question.toLowerCase().includes('interview')) {
      return `Here's a comprehensive interview preparation strategy:

1. **Research the Company**: Understand their products, culture, and recent news
2. **Practice Common Questions**: Both behavioral (STAR method) and technical
3. **Prepare Questions**: Have 3-5 thoughtful questions for the interviewer
4. **Mock Interviews**: Practice with our AI Mock Interview tool
5. **Portfolio Review**: Ensure your projects are presentable
6. **Follow-up**: Send a thank-you email within 24 hours

Would you like specific tips for technical or behavioral questions?`;
    }

    if (question.toLowerCase().includes('salary') || question.toLowerCase().includes('negotiate')) {
      return `Salary negotiation tips:

1. **Research Market Rates**: Use sites like Glassdoor, levels.fyi
2. **Know Your Value**: List your achievements and unique skills
3. **Wait for Them to Offer First**: Don't mention numbers too early
4. **Consider Total Compensation**: Benefits, equity, bonuses
5. **Practice Your Pitch**: Be confident but professional
6. **Be Ready to Walk Away**: Know your minimum acceptable offer

The key is to be prepared with data and communicate your value clearly. What's your specific situation?`;
    }

    // Default response
    return `That's a great question! Based on current industry trends and best practices, I'd recommend:

- Focus on continuous learning and skill development
- Build a strong professional network
- Create a portfolio showcasing your work
- Stay updated with industry trends
- Seek mentorship from experienced professionals

Could you provide more specific details about your situation so I can give you more personalized advice?`;
  };

  const handleQuickPrompt = (prompt) => {
    setInput(prompt);
    handleSend();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-info to-accent text-white py-8 flex-shrink-0">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles size={32} />
            <h1 className="text-3xl font-bold">Career Assistant</h1>
          </div>
          <p className="text-lg opacity-90">
            Get personalized career advice and guidance powered by AI
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div className="container mx-auto px-4 py-4 flex-shrink-0">
            <h3 className="text-lg font-semibold mb-3">Quick Topics:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickPrompts.map((prompt, index) => {
                const Icon = prompt.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt.text)}
                    className={`btn btn-outline btn-${prompt.color} justify-start gap-3 h-auto py-3`}
                  >
                    <Icon size={20} />
                    <span className="text-left text-sm">{prompt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Chat Container */}
        <div className="container mx-auto px-4 py-4 flex-1 flex flex-col overflow-hidden">
          <div className="card bg-base-100 shadow-xl flex-1 flex flex-col overflow-hidden">
            <div className="card-body p-0 flex flex-col flex-1">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`chat ${message.role === 'user' ? 'chat-end' : 'chat-start'}`}
                  >
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        {message.role === 'assistant' ? (
                          <div className="bg-gradient-to-r from-info to-accent w-10 h-10 rounded-full flex items-center justify-center">
                            <Sparkles size={20} className="text-white" />
                          </div>
                        ) : (
                          <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                            U
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="chat-header mb-1">
                      {message.role === 'assistant' ? 'AI Career Assistant' : 'You'}
                    </div>
                    <div
                      className={`chat-bubble ${
                        message.role === 'user'
                          ? 'chat-bubble-primary'
                          : 'chat-bubble-info'
                      } whitespace-pre-line`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <div className="bg-gradient-to-r from-info to-accent w-10 h-10 rounded-full flex items-center justify-center">
                          <Sparkles size={20} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="chat-bubble chat-bubble-info">
                      <div className="flex gap-2">
                        <div className="loading loading-dots loading-sm"></div>
                        <span>Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-base-300 p-4 flex-shrink-0">
                <div className="flex gap-2">
                  <textarea
                    className="textarea textarea-bordered flex-1 resize-none"
                    placeholder="Ask me anything about your career..."
                    rows="3"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    onClick={handleSend}
                    className={`btn btn-primary gap-2 self-end ${loading ? 'loading' : ''}`}
                    disabled={loading || !input.trim()}
                  >
                    {!loading && <Send size={20} />}
                    Send
                  </button>
                </div>
                <div className="text-xs text-base-content/70 mt-2">
                  Press Enter to send, Shift+Enter for new line
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerAssistant;
