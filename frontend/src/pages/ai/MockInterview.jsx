import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Upload, FileText, Briefcase, CheckCircle, User, Bot, Video, Mic, RefreshCw, Target } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';

const MockInterview = () => {
  const { currentUser } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState('upload');
  const [cvFile, setCvFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [jdText, setJdText] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [interviewData, setInterviewData] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCVUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf' && file.size <= 5 * 1024 * 1024) {
      setCvFile(file);
    } else {
      alert('Please upload a PDF file under 5MB');
    }
  };

  const handleJDUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setJdFile(file);
    } else {
      alert('Please upload a file under 5MB');
    }
  };

  const startInterview = async () => {
    // Check if user is logged in
    if (!currentUser) {
      alert('Please login to start mock interview');
      navigate('/login');
      return;
    }

    if (!cvFile) {
      alert('Please upload your CV');
      return;
    }
    if (!jdFile && !jdText.trim()) {
      alert('Please upload Job Description or paste the text');
      return;
    }

    const interviewInfo = {
      position: 'Senior Full-Stack Developer',
      company: 'TechCorp',
      cvName: cvFile.name,
      jdName: jdFile?.name || 'Pasted Text'
    };
    
    setInterviewData(interviewInfo);

    const greeting = {
      role: 'assistant',
      content: `Hello! Welcome to your mock interview for the **${interviewInfo.position}** position at **${interviewInfo.company}**.

I've analyzed your CV (${cvFile.name}) and the job description. I'll be asking you questions based on:
• Your technical skills and experience from your CV
• The specific job requirements
• Common interview patterns for this role

**Interview Structure:**
⏱️ Duration: ~45 minutes
📝 Questions: 15 total
📊 Categories: Technical (40%), Behavioral (40%), Situational (20%)

**Assessment Criteria:**
✓ Technical depth and accuracy
✓ Communication clarity
✓ Problem-solving approach  
✓ Cultural fit indicators

Are you ready to begin? Type "yes" or "ready" when you're prepared.`
    };

    setMessages([greeting]);
    setStep('interview');
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: generateInterviewResponse(input, messages.length)
      };
      setMessages((prev) => [...prev, aiResponse]);
      setLoading(false);
    }, 1500);
  };

  const generateInterviewResponse = (answer, questionNumber) => {
    const progress = Math.min(Math.floor((questionNumber / 2) / 15 * 100), 90);

    if (questionNumber === 1 || answer.toLowerCase().includes('yes') || answer.toLowerCase().includes('ready')) {
      return `Great! Let's begin.

**Question 1:** Tell me about yourself and why you're interested in this Senior Full-Stack Developer position.

Focus on:
• Your background and experience
• Key achievements
• What excites you about this opportunity

Take a moment to structure your answer.`;
    }

    const responses = [
      {
        feedback: "Good answer! I can see you have relevant experience.",
        nextQuestion: "**Question 2:** Tell me about a time when you had to debug a critical production issue. How did you approach it?\n\n💡 Use the STAR method (Situation, Task, Action, Result)."
      },
      {
        feedback: "Excellent! Your systematic approach is impressive.",
        nextQuestion: "**Question 3:** How would you design a scalable notification system that handles millions of users?\n\nConsider:\n• Database design\n• Message queuing\n• Real-time delivery\n• Failure handling"
      },
      {
        feedback: "Great technical depth! I appreciate the consideration of trade-offs.",
        nextQuestion: "**Question 4:** Describe your experience with microservices architecture. What challenges did you face and how did you overcome them?"
      },
      {
        feedback: "Very thorough answer. Your experience shows.",
        nextQuestion: "**Question 5:** How do you ensure code quality in your team? What tools and practices do you use?\n\nThink about:\n• Code reviews\n• Testing strategies\n• CI/CD\n• Documentation"
      },
      {
        feedback: "Impressive communication skills and professionalism.",
        nextQuestion: "**Final Question:** Do you have any questions for me about the role, team, or company?\n\n*This is your chance to show interest and learn more!*"
      }
    ];

    if (questionNumber >= 10) {
      return `Thank you for participating in this mock interview! 🎉

**Interview Complete**

**Overall Assessment:**
• **Technical Skills:** Strong - 8.5/10
• **Communication:** Excellent - 9/10
• **Problem-Solving:** Very Good - 8/10
• **Cultural Fit:** Excellent - 9/10

**Strengths:**
✓ Clear and structured responses
✓ Good technical depth
✓ Strong examples from experience
✓ Thoughtful questions

**Areas for Improvement:**
• Provide more specific metrics in answers
• Include more recent project examples
• Elaborate on leadership experiences

**Next Steps:**
• Review your answers
• Practice identified weak areas
• Schedule more mock interviews
• Apply to real positions confidently!

Would you like detailed feedback on any specific answer?`;
    }

    const responseIndex = Math.min(Math.floor(questionNumber / 2), responses.length - 1);
    const response = responses[responseIndex];

    return `**Feedback:** ${response.feedback}

**Progress:** ${progress}% Complete (${Math.floor(questionNumber / 2)}/15 questions)

---

${response.nextQuestion}`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEndInterview = () => {
    if (window.confirm('Are you sure you want to end the interview? Your progress will be lost.')) {
      setStep('upload');
      setMessages([]);
      setInterviewData(null);
      setCvFile(null);
      setJdFile(null);
      setJdText('');
    }
  };

  if (step === 'upload') {
    return (
    <div className="min-h-screen bg-base-200">
      <div className="bg-gradient-to-r from-secondary to-accent text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare size={40} />
            <h1 className="text-4xl font-bold">Mock Interview</h1>
          </div>
          <p className="text-xl opacity-90">
            Practice interviews with AI based on your CV and job description
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">
                <FileText className="text-primary" size={28} />
                Upload Your CV
              </h2>
              <input
                type="file"
                accept=".pdf"
                onChange={handleCVUpload}
                className="file-input file-input-bordered file-input-primary file-input-lg w-full"
              />
              {cvFile && (
                <div className="alert alert-success mt-4">
                  <CheckCircle size={20} />
                  <span className="font-semibold">{cvFile.name}</span>
                </div>
              )}
              <div className="bg-primary/10 p-6 rounded-lg mt-4">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Target size={20} className="text-primary" />
                  What We'll Analyze
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>✓ Your technical skills</li>
                  <li>✓ Past projects</li>
                  <li>✓ Education</li>
                  <li>✓ Career progression</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">
                <Briefcase className="text-secondary" size={28} />
                Job Description
              </h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Upload JD File (optional)</span>
                </label>
                <input
                  type="file"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={handleJDUpload}
                  className="file-input file-input-bordered file-input-secondary file-input-lg w-full"
                />
                {jdFile && (
                  <div className="alert alert-success mt-4">
                    <CheckCircle size={20} />
                    <span className="font-semibold">{jdFile.name}</span>
                  </div>
                )}
              </div>
              <div className="divider">OR</div>
              <textarea
                className="textarea textarea-bordered textarea-lg h-40"
                placeholder="Paste job description here..."
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
              />
              <label className="label">
                <span className="label-text-alt">{jdText.length} characters</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={startInterview}
            disabled={!cvFile || (!jdFile && !jdText.trim())}
            className="btn btn-primary btn-lg gap-3 px-8"
          >
            <MessageSquare size={24} />
            <span className="text-lg">Start Mock Interview</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <Video size={40} className="text-primary mb-4" />
              <h3 className="card-title">Realistic Experience</h3>
              <p className="text-sm text-base-content/70">
                Questions tailored to your experience level
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <Mic size={40} className="text-secondary mb-4" />
              <h3 className="card-title">Instant Feedback</h3>
              <p className="text-sm text-base-content/70">
                Real-time feedback on your answers
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <CheckCircle size={40} className="text-success mb-4" />
              <h3 className="card-title">Detailed Report</h3>
              <p className="text-sm text-base-content/70">
                Comprehensive assessment report
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <div className="bg-gradient-to-r from-secondary to-accent text-white py-6 flex-shrink-0">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <MessageSquare size={28} />
                Mock Interview in Progress
              </h1>
              <p className="text-sm opacity-90 mt-1">
                {interviewData?.position} • {interviewData?.company}
              </p>
            </div>
            <button
              onClick={handleEndInterview}
              className="btn btn-ghost btn-sm text-white gap-2"
            >
              <RefreshCw size={16} />
              End Interview
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="container mx-auto px-4 py-4 flex-1 flex flex-col">
          <div className="card bg-base-100 shadow-xl flex-1 flex flex-col overflow-hidden">
            <div className="card-body p-0 flex flex-col flex-1">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`chat ${message.role === 'user' ? 'chat-end' : 'chat-start'}`}
                  >
                    <div className="chat-image avatar">
                      <div className={`w-10 rounded-full ${
                        message.role === 'assistant' 
                          ? 'bg-gradient-to-br from-secondary to-accent' 
                          : 'bg-primary'
                      } flex items-center justify-center text-white`}>
                        {message.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
                      </div>
                    </div>
                    <div className="chat-header mb-1">
                      {message.role === 'assistant' ? 'AI Interviewer' : 'You'}
                    </div>
                    <div className={`chat-bubble ${
                      message.role === 'assistant' 
                        ? 'chat-bubble-secondary' 
                        : 'chat-bubble-primary'
                    } whitespace-pre-line max-w-2xl`}>
                      {message.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white">
                        <Bot size={20} />
                      </div>
                    </div>
                    <div className="chat-bubble chat-bubble-secondary">
                      <span className="loading loading-dots loading-sm"></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-base-300 p-4 bg-base-100 flex-shrink-0">
                <div className="flex gap-2">
                  <textarea
                    className="textarea textarea-bordered flex-1 resize-none"
                    placeholder="Type your answer here... (Press Enter to send, Shift+Enter for new line)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    rows="3"
                    disabled={loading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                    className="btn btn-primary btn-circle self-end"
                  >
                    <Send size={20} />
                  </button>
                </div>
                <p className="text-xs text-base-content/60 mt-2">
                  💡 Tip: Structure your answers using STAR method for behavioral questions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterview;
