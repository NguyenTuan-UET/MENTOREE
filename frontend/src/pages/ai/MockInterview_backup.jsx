import { useState, useEffect, useRef } from 'react';import { useState, useEffect, useRef } from 'react';import { useSta  const messagesEndRef = useRef(null);

import { MessageSquare, Send, Upload, FileText, Briefcase, CheckCircle, User, Bot, Video, Mic, RefreshCw, Target } from 'lucide-react';

import { MessageSquare, Send, Upload, FileText, Briefcase, CheckCircle, User, Bot, Video, Mic, RefreshCw, Target } from 'lucide-react';

const MockInterview = () => {

  const [step, setStep] = useState('upload');  const scrollToBottom = () => {

  const [cvFile, setCvFile] = useState(null);

  const [jdFile, setJdFile] = useState(null);const MockInterview = () => {    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  const [jdText, setJdText] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);  const [step, setStep] = useState('upload'); // 'upload' or 'interview'  };

  const [messages, setMessages] = useState([]);

  const [inputMessage, setInputMessage] = useState('');  const [cvFile, setCvFile] = useState(null);

  const [isTyping, setIsTyping] = useState(false);

  const [interviewData, setInterviewData] = useState(null);  const [jdFile, setJdFile] = useState(null);  useEffect(() => {

  const messagesEndRef = useRef(null);

  const [jdText, setJdText] = useState('');    scrollToBottom();

  const scrollToBottom = () => {

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });  const [isProcessing, setIsProcessing] = useState(false);  }, [messages]);

  };

  const [messages, setMessages] = useState([]);

  useEffect(() => {

    scrollToBottom();  const [inputMessage, setInputMessage] = useState('');  const handleCVUpload = (e) => {

  }, [messages]);

  const [isTyping, setIsTyping] = useState(false);    const file = e.target.files[0];

  const handleCVUpload = (e) => {

    const file = e.target.files[0];  const [interviewData, setInterviewData] = useState(null);    if (file && file.type === 'application/pdf' && file.size <= 5 * 1024 * 1024) {

    if (file && file.type === 'application/pdf' && file.size <= 5 * 1024 * 1024) {

      setCvFile(file);  const messagesEndRef = useRef(null);      setCvFile(file);

    } else {

      alert('Please upload a PDF file under 5MB');    } else {

    }

  };  const scrollToBottom = () => {      alert('Please upload a PDF file under 5MB');



  const handleJDUpload = (e) => {    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });    }

    const file = e.target.files[0];

    if (file && file.size <= 5 * 1024 * 1024) {  };  };

      setJdFile(file);

    } else {

      alert('Please upload a file under 5MB');

    }  useEffect(() => {  const handleJDUpload = (e) => {

  };

    scrollToBottom();    const file = e.target.files[0];

  const startInterview = async () => {

    if (!cvFile) {  }, [messages]);    if (file && file.size <= 5 * 1024 * 1024) {

      alert('Please upload your CV');

      return;      setJdFile(file);

    }

    if (!jdFile && !jdText.trim()) {  const handleCVUpload = (e) => {    } else {

      alert('Please upload Job Description or paste the text');

      return;    const file = e.target.files[0];      alert('Please upload a file under 5MB');

    }

    if (file && file.type === 'application/pdf' && file.size <= 5 * 1024 * 1024) {    }

    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 2000));      setCvFile(file);  };



    const interviewInfo = {    } else {

      position: 'Senior Full-Stack Developer',

      company: 'TechCorp',      alert('Please upload a PDF file under 5MB');  const startInterview = async () => {

      difficulty: 'Senior Level',

      duration: '45 minutes',    }    if (!cvFile) {

      questions: 15,

      cvName: cvFile.name,  };      alert('Please upload your CV');

      jdName: jdFile?.name || 'Pasted Text'

    };      return;

    

    setInterviewData(interviewInfo);  const handleJDUpload = (e) => {    }



    const greeting = {    const file = e.target.files[0];    if (!jdFile && !jdText.trim()) {

      id: 1,

      role: 'assistant',    if (file && file.size <= 5 * 1024 * 1024) {      alert('Please upload Job Description or paste the text');

      content: `Hello! Welcome to your mock interview for the **${interviewInfo.position}** position at **${interviewInfo.company}**.

      setJdFile(file);      return;

I've analyzed your CV (${cvFile.name}) and the job description. I'll be asking you questions based on:

• Your technical skills and experience from your CV    } else {    }

• The specific job requirements

• Common interview patterns for this role      alert('Please upload a file under 5MB');



**Interview Structure:**    }    setIsProcessing(true);

⏱️ Duration: ~45 minutes

📝 Questions: 15 total  };    // Simulate processing

📊 Categories: Technical (40%), Behavioral (40%), Situational (20%)

    await new Promise(resolve => setTimeout(resolve, 2000));

**Assessment Criteria:**

✓ Technical depth and accuracy  const startInterview = async () => {

✓ Communication clarity

✓ Problem-solving approach      if (!cvFile) {    // Mock interview data extracted from CV and JD

✓ Cultural fit indicators

      alert('Please upload your CV');    setInterviewData({

Are you ready to begin? Type "yes" or "ready" when you're prepared.`

    };      return;      position: 'Senior Full-Stack Developer',



    setMessages([greeting]);    }      company: 'TechCorp',

    setStep('interview');

    setIsProcessing(false);    if (!jdFile && !jdText.trim()) {      difficulty: 'Senior Level',

  };

      alert('Please upload Job Description or paste the text');      duration: '45 minutes',

  const handleSendMessage = async () => {

    if (!inputMessage.trim()) return;      return;      questions: 15,



    const userMessage = {    }      cvName: cvFile.name,

      id: messages.length + 1,

      role: 'user',      jdName: jdFile?.name || 'Pasted Text'

      content: inputMessage

    };    setIsProcessing(true);    });

    setMessages(prev => [...prev, userMessage]);

    setInputMessage('');    // Simulate processing

    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 2000));    // Initial greeting based on documents

    await new Promise(resolve => setTimeout(resolve, 1500));

    const greeting = {

    const botResponse = generateInterviewResponse(inputMessage, messages.length);

    // Mock interview data extracted from CV and JD      id: 1,

    const botMessage = {

      id: messages.length + 2,    const interviewInfo = {      type: 'bot',

      role: 'assistant',

      content: botResponse      position: 'Senior Full-Stack Developer',      content: `Hello! Welcome to your mock interview for the **${interviewData?.position || 'Senior Full-Stack Developer'}** position at **${interviewData?.company || 'TechCorp'}**.

    };

      company: 'TechCorp',

    setMessages(prev => [...prev, botMessage]);

    setIsTyping(false);      difficulty: 'Senior Level',I've analyzed your CV (${cvFile.name}) and the job description. I'll be asking you questions based on:

  };

      duration: '45 minutes',• Your technical skills and experience from your CV

  const generateInterviewResponse = (answer, questionNumber) => {

    const responses = [      questions: 15,• The specific job requirements

      {

        feedback: "Good answer! I can see you have relevant experience.",      cvName: cvFile.name,• Common interview patterns for this role

        nextQuestion: "**Question 2:** Tell me about a time when you had to debug a critical production issue. How did you approach it?\\n\\n💡 Use the STAR method (Situation, Task, Action, Result)."

      },      jdName: jdFile?.name || 'Pasted Text'

      {

        feedback: "Excellent! Your systematic approach is impressive.",    };**Interview Structure:**

        nextQuestion: "**Question 3:** How would you design a scalable notification system that handles millions of users?\\n\\nConsider:\\n• Database design\\n• Message queuing\\n• Real-time delivery\\n• Failure handling"

      },    ⏱️ Duration: ~45 minutes

      {

        feedback: "Great technical depth! I appreciate the consideration of trade-offs.",    setInterviewData(interviewInfo);📝 Questions: 15 total

        nextQuestion: "**Question 4:** Describe your experience with microservices architecture. What challenges did you face and how did you overcome them?"

      },📊 Categories: Technical (40%), Behavioral (40%), Situational (20%)

      {

        feedback: "Very thorough answer. Your experience shows.",    // Initial greeting based on documents

        nextQuestion: "**Question 5:** How do you ensure code quality in your team? What tools and practices do you use?\\n\\nThink about:\\n• Code reviews\\n• Testing strategies\\n• CI/CD\\n• Documentation"

      },    const greeting = {**Assessment Criteria:**

      {

        feedback: "Strong answer! Those practices are industry standards.",      id: 1,✓ Technical depth and accuracy

        nextQuestion: "**Question 6:** Walk me through how you would optimize a slow-performing database query. What steps would you take?\\n\\n*Technical coding question - explain your thought process.*"

      },      type: 'bot',✓ Communication clarity

      {

        feedback: "Excellent problem-solving approach!",      content: `Hello! Welcome to your mock interview for the **${interviewInfo.position}** position at **${interviewInfo.company}**.✓ Problem-solving approach  

        nextQuestion: "**Question 7:** Tell me about a time you had to make a technical decision with incomplete information. What was your approach?"

      },✓ Cultural fit indicators

      {

        feedback: "Good decision-making framework!",I've analyzed your CV (${cvFile.name}) and the job description. I'll be asking you questions based on:

        nextQuestion: "**Question 8:** How do you stay updated with new technologies? Give me specific examples from the last 6 months."

      },• Your technical skills and experience from your CVAre you ready to begin? Type "yes" or "ready" when you're prepared.`,

      {

        feedback: "Great learning mindset!",• The specific job requirements      timestamp: new Date()

        nextQuestion: "**Question 9:** Describe a situation where you had to disagree with your manager or team lead. How did you handle it?"

      },• Common interview patterns for this role    };

      {

        feedback: "Impressive communication skills and professionalism.",

        nextQuestion: "**Question 10:** If you had to choose between perfect code and meeting a tight deadline, how would you decide?\\n\\nConsider real-world scenarios."

      },**Interview Structure:**    setMessages([greeting]);

      {

        feedback: "Pragmatic answer - shows maturity!",⏱️ Duration: ~45 minutes    setStep('interview');

        nextQuestion: "**Question 11:** What's your experience with containerization and orchestration (Docker, Kubernetes)?"

      },📝 Questions: 15 total    setIsProcessing(false);

      {

        feedback: "Solid DevOps knowledge!",📊 Categories: Technical (40%), Behavioral (40%), Situational (20%)  };ef } from 'react';

        nextQuestion: "**Question 12:** How do you handle technical debt in your projects?"

      },import { MessageSquare, Send, Upload, FileText, Briefcase, CheckCircle, User, Bot, Video, Mic, RefreshCw } from 'lucide-react';

      {

        feedback: "Balanced approach - technical debt is always a challenge!",**Assessment Criteria:**import { useApp } from '../../context/AppContext.jsx';

        nextQuestion: "**Question 13:** Describe your ideal work environment and team culture."

      },✓ Technical depth and accuracy

      {

        feedback: "Great insight into team dynamics!",✓ Communication clarityconst MockInterview = () => {

        nextQuestion: "**Question 14:** Where do you see yourself in 3-5 years professionally?"

      },✓ Problem-solving approach    const { mockInterview } = useApp();

      {

        feedback: "Ambitious yet realistic goals!",✓ Cultural fit indicators  const [step, setStep] = useState('upload'); // 'upload' or 'interview'

        nextQuestion: "**Final Question:** Do you have any questions for me about the role, team, or company?\\n\\n*This is your chance to show interest and learn more!*"

      }  const [cvFile, setCvFile] = useState(null);

    ];

Are you ready to begin? Type "yes" or "ready" when you're prepared.`,  const [jdFile, setJdFile] = useState(null);

    const progress = Math.min(Math.floor((questionNumber / 2) / 15 * 100), 90);

      timestamp: new Date()  const [jdText, setJdText] = useState('');

    if (questionNumber === 1 || answer.toLowerCase().includes('yes') || answer.toLowerCase().includes('ready')) {

      return `Great! Let's begin.\\n\\n**Question 1:** Tell me about yourself and why you're interested in this Senior Full-Stack Developer position.\\n\\nFocus on:\\n• Your background and experience\\n• Key achievements\\n• What excites you about this opportunity\\n\\nTake a moment to structure your answer.`;    };  const [isProcessing, setIsProcessing] = useState(false);

    }

  const [messages, setMessages] = useState([]);

    const responseIndex = Math.min(Math.floor(questionNumber / 2), responses.length - 1);

    const response = responses[responseIndex];    setMessages([greeting]);  const [inputMessage, setInputMessage] = useState('');



    if (questionNumber >= 28) {    setStep('interview');  const [isTyping, setIsTyping] = useState(false);

      return `Thank you for participating in this mock interview! 🎉\\n\\n**Interview Complete**\\n\\n**Overall Assessment:**\\n• **Technical Skills:** Strong - 8.5/10\\n• **Communication:** Excellent - 9/10\\n• **Problem-Solving:** Very Good - 8/10\\n• **Cultural Fit:** Excellent - 9/10\\n\\n**Strengths:**\\n✓ Clear and structured responses\\n✓ Good technical depth\\n✓ Strong examples from experience\\n✓ Thoughtful questions\\n\\n**Areas for Improvement:**\\n• Provide more specific metrics in answers\\n• Include more recent project examples\\n• Elaborate on leadership experiences\\n\\n**Recommendations:**\\n1. Practice system design questions more\\n2. Prepare 2-3 more behavioral stories\\n3. Research the company's tech stack deeper\\n4. Be ready to discuss trade-offs in technical decisions\\n\\n**Next Steps:**\\n• Review your answers\\n• Practice identified weak areas\\n• Schedule more mock interviews\\n• Apply to real positions confidently!\\n\\nWould you like detailed feedback on any specific answer?`;

    }    setIsProcessing(false);  const [interviewData, setInterviewData] = useState(null);



    return `**Feedback:** ${response.feedback}\\n\\n**Progress:** ${progress}% Complete (${Math.floor(questionNumber / 2)}/15 questions)\\n\\n---\\n\\n${response.nextQuestion}`;  };  const messagesEndRef = useRef(null);

  };



  const handleKeyPress = (e) => {

    if (e.key === 'Enter' && !e.shiftKey) {  const handleSendMessage = async () => {  const sampleQuestions = {

      e.preventDefault();

      handleSendMessage();    if (!inputMessage.trim()) return;    behavioral: [

    }

  };      'Tell me about a time when you had to work with a difficult team member.',



  const handleEndInterview = () => {    // Add user message      'Describe a situation where you had to meet a tight deadline.',

    if (confirm('Are you sure you want to end the interview? Your progress will be lost.')) {

      setStep('upload');    const userMessage = {      'How do you handle criticism and feedback?',

      setMessages([]);

      setInterviewData(null);      id: messages.length + 1,    ],

      setCvFile(null);

      setJdFile(null);      type: 'user',    technical: [

      setJdText('');

    }      content: inputMessage,      'Explain the difference between var, let, and const in JavaScript.',

  };

      timestamp: new Date()      'What is closure in JavaScript and why is it useful?',

  if (step === 'upload') {

    return (    };      'How would you optimize a slow database query?',

      <div className="min-h-screen bg-base-200">

        <div className="bg-gradient-to-r from-secondary to-accent text-white py-12">    setMessages(prev => [...prev, userMessage]);    ],

          <div className="container mx-auto px-4">

            <div className="flex items-center gap-3 mb-4">    setInputMessage('');    situational: [

              <MessageSquare size={40} />

              <h1 className="text-4xl font-bold">Mock Interview</h1>    setIsTyping(true);      'If you were given a project with unclear requirements, how would you proceed?',

            </div>

            <p className="text-xl opacity-90">      'How would you prioritize multiple urgent tasks?',

              Practice interviews with AI based on your CV and target job description

            </p>    // Simulate AI response      'What would you do if you disagreed with your manager on a technical decision?',

          </div>

        </div>    await new Promise(resolve => setTimeout(resolve, 1500));    ],



        <div className="container mx-auto px-4 py-8 max-w-7xl">  };

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

            <div className="card bg-base-100 shadow-xl h-full">    // Generate contextual response

              <div className="card-body">

                <h2 className="card-title text-2xl mb-6">    const botResponse = generateInterviewResponse(inputMessage, messages.length);  const handleStart = () => {

                  <FileText className="text-primary" size={28} />

                  Upload Your CV    if (!role.trim()) {

                </h2>

    const botMessage = {      alert('Please enter the role you are interviewing for');

                <div className="form-control">

                  <label className="label">      id: messages.length + 2,      return;

                    <span className="label-text font-semibold text-lg">CV File (PDF, max 5MB) *</span>

                  </label>      type: 'bot',    }

                  <input

                    type="file"      content: botResponse,    setStarted(true);

                    accept=".pdf"

                    onChange={handleCVUpload}      timestamp: new Date()    generateQuestion();

                    className="file-input file-input-bordered file-input-primary file-input-lg w-full"

                  />    };  };

                  {cvFile && (

                    <div className="alert alert-success mt-4">

                      <CheckCircle size={20} />

                      <span className="font-semibold">{cvFile.name}</span>    setMessages(prev => [...prev, botMessage]);  const generateQuestion = () => {

                    </div>

                  )}    setIsTyping(false);    const categories = Object.keys(sampleQuestions);

                </div>

  };    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

                <div className="divider"></div>

    const questions = sampleQuestions[randomCategory];

                <div className="bg-primary/10 p-6 rounded-lg">

                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">  const generateInterviewResponse = (answer, questionNumber) => {    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

                    <Target size={20} className="text-primary" />

                    What We'll Analyze    const responses = [

                  </h3>

                  <ul className="space-y-2 text-sm">      {    setCurrentQuestion({

                    <li>✓ Your technical skills and experience</li>

                    <li>✓ Past projects and achievements</li>        feedback: "Good answer! I can see you have relevant experience.",      text: randomQuestion,

                    <li>✓ Education and certifications</li>

                    <li>✓ Career progression</li>        nextQuestion: "**Question 2:** Tell me about a time when you had to debug a critical production issue. How did you approach it?\n\n💡 Use the STAR method (Situation, Task, Action, Result)."      category: randomCategory,

                    <li>✓ Relevant keywords for the role</li>

                  </ul>      },      number: questionHistory.length + 1,

                </div>

              </div>      {    });

            </div>

        feedback: "Excellent! Your systematic approach is impressive.",    setAnswer('');

            <div className="card bg-base-100 shadow-xl h-full">

              <div className="card-body">        nextQuestion: "**Question 3:** How would you design a scalable notification system that handles millions of users?\n\nConsider:\n• Database design\n• Message queuing\n• Real-time delivery\n• Failure handling"    setFeedback(null);

                <h2 className="card-title text-2xl mb-6">

                  <Briefcase className="text-secondary" size={28} />      },  };

                  Job Description

                </h2>      {



                <div className="form-control">        feedback: "Great technical depth! I appreciate the consideration of trade-offs.",  const handleSubmitAnswer = async () => {

                  <label className="label">

                    <span className="label-text font-semibold text-lg">Upload JD File (optional)</span>        nextQuestion: "**Question 4:** Describe your experience with microservices architecture. What challenges did you face and how did you overcome them?"    if (!answer.trim()) {

                  </label>

                  <input      },      alert('Please provide an answer');

                    type="file"

                    accept=".pdf,.txt,.doc,.docx"      {      return;

                    onChange={handleJDUpload}

                    className="file-input file-input-bordered file-input-secondary file-input-lg w-full"        feedback: "Very thorough answer. Your experience shows.",    }

                  />

                  {jdFile && (        nextQuestion: "**Question 5:** How do you ensure code quality in your team? What tools and practices do you use?\n\nThink about:\n• Code reviews\n• Testing strategies\n• CI/CD\n• Documentation"

                    <div className="alert alert-success mt-4">

                      <CheckCircle size={20} />      },    setLoading(true);

                      <span className="font-semibold">{jdFile.name}</span>

                    </div>      {

                  )}

                </div>        feedback: "Strong answer! Those practices are industry standards.",    // Simulate AI evaluation



                <div className="divider">OR</div>        nextQuestion: "**Question 6:** Walk me through how you would optimize a slow-performing database query. What steps would you take?\n\n*Technical coding question - explain your thought process.*"    setTimeout(() => {



                <div className="form-control">      },      const result = {

                  <label className="label">

                    <span className="label-text font-semibold text-lg">Paste Job Description *</span>      {        score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100

                  </label>

                  <textarea        feedback: "Excellent problem-solving approach!",        feedback: [

                    className="textarea textarea-bordered textarea-lg h-40"

                    placeholder="Paste the job description here including requirements, responsibilities, qualifications..."        nextQuestion: "**Question 7:** Tell me about a time you had to make a technical decision with incomplete information. What was your approach?"          'Good structure with a clear beginning, middle, and end',

                    value={jdText}

                    onChange={(e) => setJdText(e.target.value)}      },          'Consider adding more specific examples and metrics',

                  ></textarea>

                  <label className="label">      {          'Your answer shows good problem-solving skills',

                    <span className="label-text-alt">{jdText.length} characters</span>

                  </label>        feedback: "Good decision-making framework!",          'Try to be more concise in your response',

                </div>

        nextQuestion: "**Question 8:** How do you stay updated with new technologies? Give me specific examples from the last 6 months."        ],

                <div className="bg-secondary/10 p-6 rounded-lg">

                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">      },        strengths: ['Clear communication', 'Relevant examples', 'Confident tone'],

                    <MessageSquare size={20} className="text-secondary" />

                    Interview Focus      {        improvements: ['Add more quantifiable results', 'Be more specific about your role'],

                  </h3>

                  <ul className="space-y-2 text-sm">        feedback: "Great learning mindset!",      };

                    <li>• Questions tailored to job requirements</li>

                    <li>• Role-specific technical challenges</li>        nextQuestion: "**Question 9:** Describe a situation where you had to disagree with your manager or team lead. How did you handle it?"

                    <li>• Company culture fit assessment</li>

                    <li>• Experience level matching</li>      },      setFeedback(result);

                  </ul>

                </div>      {      setQuestionHistory([

              </div>

            </div>        feedback: "Impressive communication skills and professionalism.",        ...questionHistory,

          </div>

        nextQuestion: "**Question 10:** If you had to choose between perfect code and meeting a tight deadline, how would you decide?\n\nConsider real-world scenarios."        {

          <div className="flex justify-center mb-8">

            <button      },          question: currentQuestion,

              onClick={startInterview}

              disabled={isProcessing || !cvFile || (!jdFile && !jdText.trim())}      {          answer,

              className="btn btn-primary btn-lg gap-3 px-8"

            >        feedback: "Pragmatic answer - shows maturity!",          score: result.score,

              {isProcessing ? (

                <>        nextQuestion: "**Question 11:** What's your experience with containerization and orchestration (Docker, Kubernetes)?"        },

                  <span className="loading loading-spinner"></span>

                  <span className="text-lg">Processing Documents...</span>      },      ]);

                </>

              ) : (      {      setLoading(false);

                <>

                  <MessageSquare size={24} />        feedback: "Solid DevOps knowledge!",    }, 1500);

                  <span className="text-lg">Start Mock Interview</span>

                </>        nextQuestion: "**Question 12:** How do you handle technical debt in your projects?"  };

              )}

            </button>      },

          </div>

      {  const handleNextQuestion = () => {

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="card bg-base-100 shadow-xl">        feedback: "Balanced approach - technical debt is always a challenge!",    generateQuestion();

              <div className="card-body items-center text-center">

                <Video size={40} className="text-primary mb-4" />        nextQuestion: "**Question 13:** Describe your ideal work environment and team culture."  };

                <h3 className="card-title">Realistic Experience</h3>

                <p className="text-sm text-base-content/70">      },

                  Practice with questions tailored to your experience level and target role

                </p>      {  const handleReset = () => {

              </div>

            </div>        feedback: "Great insight into team dynamics!",    setStarted(false);



            <div className="card bg-base-100 shadow-xl">        nextQuestion: "**Question 14:** Where do you see yourself in 3-5 years professionally?"    setCurrentQuestion(null);

              <div className="card-body items-center text-center">

                <Mic size={40} className="text-secondary mb-4" />      },    setAnswer('');

                <h3 className="card-title">Instant Feedback</h3>

                <p className="text-sm text-base-content/70">      {    setFeedback(null);

                  Get real-time feedback on your answers and suggestions for improvement

                </p>        feedback: "Ambitious yet realistic goals!",    setQuestionHistory([]);

              </div>

            </div>        nextQuestion: "**Final Question:** Do you have any questions for me about the role, team, or company?\n\n*This is your chance to show interest and learn more!*"    setRole('');



            <div className="card bg-base-100 shadow-xl">      }  };

              <div className="card-body items-center text-center">

                <CheckCircle size={40} className="text-success mb-4" />    ];

                <h3 className="card-title">Detailed Report</h3>

                <p className="text-sm text-base-content/70">  const getScoreColor = (score) => {

                  Receive a comprehensive report with strengths and areas to improve

                </p>    // Calculate progress    if (score >= 85) return 'text-success';

              </div>

            </div>    const progress = Math.min(Math.floor((questionNumber / 2) / 15 * 100), 90);    if (score >= 70) return 'text-warning';

          </div>

        </div>    return 'text-error';

      </div>

    );    if (questionNumber === 1 || answer.toLowerCase().includes('yes') || answer.toLowerCase().includes('ready')) {  };

  }

      return `Great! Let's begin.\n\n**Question 1:** Tell me about yourself and why you're interested in this Senior Full-Stack Developer position.\n\nFocus on:\n• Your background and experience\n• Key achievements\n• What excites you about this opportunity\n\nTake a moment to structure your answer.`;

  return (

    <div className="min-h-screen bg-base-200">    }  const getScoreBadge = (score) => {

      <div className="bg-gradient-to-r from-secondary to-accent text-white py-6">

        <div className="container mx-auto px-4">    if (score >= 85) return 'badge-success';

          <div className="flex items-center justify-between">

            <div>    const responseIndex = Math.min(Math.floor(questionNumber / 2), responses.length - 1);    if (score >= 70) return 'badge-warning';

              <h1 className="text-2xl font-bold flex items-center gap-2">

                <MessageSquare size={28} />    const response = responses[responseIndex];    return 'badge-error';

                Mock Interview in Progress

              </h1>  };

              <p className="text-sm opacity-90 mt-1">

                {interviewData?.position} • {interviewData?.company}    if (questionNumber >= 28) {

              </p>

            </div>      return `Thank you for participating in this mock interview! 🎉\n\n**Interview Complete**\n\n**Overall Assessment:**\n• **Technical Skills:** Strong - 8.5/10\n• **Communication:** Excellent - 9/10\n• **Problem-Solving:** Very Good - 8/10\n• **Cultural Fit:** Excellent - 9/10\n\n**Strengths:**\n✓ Clear and structured responses\n✓ Good technical depth\n✓ Strong examples from experience\n✓ Thoughtful questions\n\n**Areas for Improvement:**\n• Provide more specific metrics in answers\n• Include more recent project examples\n• Elaborate on leadership experiences\n\n**Recommendations:**\n1. Practice system design questions more\n2. Prepare 2-3 more behavioral stories\n3. Research the company's tech stack deeper\n4. Be ready to discuss trade-offs in technical decisions\n\n**Next Steps:**\n• Review your answers\n• Practice identified weak areas\n• Schedule more mock interviews\n• Apply to real positions confidently!\n\nWould you like detailed feedback on any specific answer?`;  return (

            <button

              onClick={handleEndInterview}    }    <div className="min-h-screen bg-base-200">

              className="btn btn-ghost btn-sm text-white gap-2"

            >      {/* Header */}

              <RefreshCw size={16} />

              End Interview    return `**Feedback:** ${response.feedback}\n\n**Progress:** ${progress}% Complete (${Math.floor(questionNumber / 2)}/15 questions)\n\n---\n\n${response.nextQuestion}`;      <div className="bg-gradient-to-r from-accent to-primary text-white py-12">

            </button>

          </div>  };        <div className="container mx-auto px-4">

        </div>

      </div>          <div className="flex items-center gap-3 mb-4">



      <div className="container mx-auto px-4 py-8 max-w-6xl">  const handleKeyPress = (e) => {            <MessageSquare size={32} />

        <div className="card bg-base-100 shadow-xl">

          <div className="card-body p-0 flex flex-col" style={{ height: '75vh' }}>    if (e.key === 'Enter' && !e.shiftKey) {            <h1 className="text-4xl font-bold">Mock Interview</h1>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">

              {messages.map((message) => (      e.preventDefault();          </div>

                <div

                  key={message.id}      handleSendMessage();          <p className="text-xl opacity-90">

                  className={`chat ${message.role === 'user' ? 'chat-end' : 'chat-start'}`}

                >    }            Practice interviews with AI and get instant feedback

                  <div className="chat-image avatar">

                    <div className={`w-10 rounded-full ${  };          </p>

                      message.role === 'assistant' 

                        ? 'bg-gradient-to-br from-secondary to-accent'         </div>

                        : 'bg-primary'

                    } flex items-center justify-center text-white`}>  const handleEndInterview = () => {      </div>

                      {message.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}

                    </div>    if (confirm('Are you sure you want to end the interview? Your progress will be lost.')) {

                  </div>

                  <div className="chat-header mb-1">      setStep('upload');      <div className="container mx-auto px-4 py-8 max-w-5xl">

                    {message.role === 'assistant' ? 'AI Interviewer' : 'You'}

                  </div>      setMessages([]);        {!started ? (

                  <div className={`chat-bubble ${

                    message.role === 'assistant'       setInterviewData(null);          // Setup Screen

                      ? 'chat-bubble-secondary' 

                      : 'chat-bubble-primary'      setCvFile(null);          <div className="card bg-base-100 shadow-xl">

                  } whitespace-pre-line max-w-2xl`}>

                    {message.content}      setJdFile(null);            <div className="card-body">

                  </div>

                </div>      setJdText('');              <h2 className="card-title text-2xl mb-6">Set Up Your Interview</h2>

              ))}

    }

              {isTyping && (

                <div className="chat chat-start">  };              <div className="space-y-6">

                  <div className="chat-image avatar">

                    <div className="w-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white">                {/* Role Input */}

                      <Bot size={20} />

                    </div>  if (step === 'upload') {                <div className="form-control">

                  </div>

                  <div className="chat-bubble chat-bubble-secondary">    return (                  <label className="label">

                    <span className="loading loading-dots loading-sm"></span>

                  </div>      <div className="min-h-screen bg-base-200">                    <span className="label-text font-semibold">

                </div>

              )}        {/* Header */}                      What role are you interviewing for?

              <div ref={messagesEndRef} />

            </div>        <div className="bg-gradient-to-r from-secondary to-accent text-white py-12">                    </span>



            <div className="border-t border-base-300 p-4 bg-base-100">          <div className="container mx-auto px-4">                  </label>

              <div className="flex gap-2">

                <textarea            <div className="flex items-center gap-3 mb-4">                  <input

                  className="textarea textarea-bordered flex-1 resize-none"

                  placeholder="Type your answer here... (Press Enter to send, Shift+Enter for new line)"              <MessageSquare size={40} />                    type="text"

                  value={inputMessage}

                  onChange={(e) => setInputMessage(e.target.value)}              <h1 className="text-4xl font-bold">Mock Interview</h1>                    placeholder="e.g., Senior Frontend Developer, Product Manager"

                  onKeyPress={handleKeyPress}

                  rows="3"            </div>                    className="input input-bordered input-lg"

                  disabled={isTyping}

                />            <p className="text-xl opacity-90">                    value={role}

                <button

                  onClick={handleSendMessage}              Practice interviews with AI based on your CV and target job description                    onChange={(e) => setRole(e.target.value)}

                  disabled={!inputMessage.trim() || isTyping}

                  className="btn btn-primary btn-circle self-end"            </p>                  />

                >

                  <Send size={20} />          </div>                </div>

                </button>

              </div>        </div>

              <p className="text-xs text-base-content/60 mt-2">

                💡 Tip: Structure your answers using STAR method for behavioral questions                {/* Difficulty Selection */}

              </p>

            </div>        <div className="container mx-auto px-4 py-8 max-w-7xl">                <div className="form-control">

          </div>

        </div>          {/* Upload Section - Two Column Layout */}                  <label className="label">

      </div>

    </div>          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">                    <span className="label-text font-semibold">Interview Difficulty</span>

  );

};            {/* CV Upload - Left */}                  </label>



export default MockInterview;            <div className="card bg-base-100 shadow-xl h-full">                  <div className="grid grid-cols-3 gap-4">


              <div className="card-body">                    <label

                <h2 className="card-title text-2xl mb-6">                      className={`cursor-pointer label border-2 rounded-lg p-4 hover:border-accent transition ${

                  <FileText className="text-primary" size={28} />                        difficulty === 'beginner' ? 'border-accent bg-accent/10' : 'border-base-300'

                  Upload Your CV                      }`}

                </h2>                    >

                      <input

                <div className="form-control">                        type="radio"

                  <label className="label">                        name="difficulty"

                    <span className="label-text font-semibold text-lg">CV File (PDF, max 5MB) *</span>                        value="beginner"

                  </label>                        className="radio radio-accent"

                  <input                        checked={difficulty === 'beginner'}

                    type="file"                        onChange={(e) => setDifficulty(e.target.value)}

                    accept=".pdf"                      />

                    onChange={handleCVUpload}                      <span className="label-text ml-2 font-semibold">Beginner</span>

                    className="file-input file-input-bordered file-input-primary file-input-lg w-full"                    </label>

                  />

                  {cvFile && (                    <label

                    <div className="alert alert-success mt-4">                      className={`cursor-pointer label border-2 rounded-lg p-4 hover:border-accent transition ${

                      <CheckCircle size={20} />                        difficulty === 'intermediate' ? 'border-accent bg-accent/10' : 'border-base-300'

                      <span className="font-semibold">{cvFile.name}</span>                      }`}

                    </div>                    >

                  )}                      <input

                </div>                        type="radio"

                        name="difficulty"

                <div className="divider"></div>                        value="intermediate"

                        className="radio radio-accent"

                <div className="bg-primary/10 p-6 rounded-lg">                        checked={difficulty === 'intermediate'}

                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">                        onChange={(e) => setDifficulty(e.target.value)}

                    <Target size={20} className="text-primary" />                      />

                    What We'll Analyze                      <span className="label-text ml-2 font-semibold">Intermediate</span>

                  </h3>                    </label>

                  <ul className="space-y-2 text-sm">

                    <li>✓ Your technical skills and experience</li>                    <label

                    <li>✓ Past projects and achievements</li>                      className={`cursor-pointer label border-2 rounded-lg p-4 hover:border-accent transition ${

                    <li>✓ Education and certifications</li>                        difficulty === 'advanced' ? 'border-accent bg-accent/10' : 'border-base-300'

                    <li>✓ Career progression</li>                      }`}

                    <li>✓ Relevant keywords for the role</li>                    >

                  </ul>                      <input

                </div>                        type="radio"

              </div>                        name="difficulty"

            </div>                        value="advanced"

                        className="radio radio-accent"

            {/* JD Upload - Right */}                        checked={difficulty === 'advanced'}

            <div className="card bg-base-100 shadow-xl h-full">                        onChange={(e) => setDifficulty(e.target.value)}

              <div className="card-body">                      />

                <h2 className="card-title text-2xl mb-6">                      <span className="label-text ml-2 font-semibold">Advanced</span>

                  <Briefcase className="text-secondary" size={28} />                    </label>

                  Job Description                  </div>

                </h2>                </div>



                <div className="form-control">                {/* Interview Types */}

                  <label className="label">                <div className="alert alert-info">

                    <span className="label-text font-semibold text-lg">Upload JD File (optional)</span>                  <div>

                  </label>                    <h4 className="font-bold mb-2">What to expect:</h4>

                  <input                    <ul className="text-sm space-y-1">

                    type="file"                      <li>• Behavioral questions about past experiences</li>

                    accept=".pdf,.txt,.doc,.docx"                      <li>• Technical questions specific to your role</li>

                    onChange={handleJDUpload}                      <li>• Situational questions to test problem-solving</li>

                    className="file-input file-input-bordered file-input-secondary file-input-lg w-full"                      <li>• Instant AI-powered feedback on your answers</li>

                  />                    </ul>

                  {jdFile && (                  </div>

                    <div className="alert alert-success mt-4">                </div>

                      <CheckCircle size={20} />

                      <span className="font-semibold">{jdFile.name}</span>                <button onClick={handleStart} className="btn btn-accent btn-lg w-full gap-2">

                    </div>                  <Sparkles size={24} />

                  )}                  Start Interview

                </div>                </button>

              </div>

                <div className="divider">OR</div>            </div>

          </div>

                <div className="form-control">        ) : (

                  <label className="label">          // Interview Screen

                    <span className="label-text font-semibold text-lg">Paste Job Description *</span>          <div className="space-y-6">

                  </label>            {/* Progress Bar */}

                  <textarea            <div className="card bg-base-100 shadow-lg">

                    className="textarea textarea-bordered textarea-lg h-40"              <div className="card-body py-4">

                    placeholder="Paste the job description here including requirements, responsibilities, qualifications..."                <div className="flex justify-between items-center">

                    value={jdText}                  <div>

                    onChange={(e) => setJdText(e.target.value)}                    <h3 className="font-bold">Mock Interview: {role}</h3>

                  ></textarea>                    <p className="text-sm text-base-content/70">

                  <label className="label">                      Question {currentQuestion?.number} • {difficulty} level

                    <span className="label-text-alt">{jdText.length} characters</span>                    </p>

                  </label>                  </div>

                </div>                  <button onClick={handleReset} className="btn btn-ghost btn-sm gap-2">

                    <RefreshCw size={16} />

                <div className="bg-secondary/10 p-6 rounded-lg">                    Reset

                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">                  </button>

                    <MessageSquare size={20} className="text-secondary" />                </div>

                    Interview Focus              </div>

                  </h3>            </div>

                  <ul className="space-y-2 text-sm">

                    <li>• Questions tailored to job requirements</li>            {/* Current Question */}

                    <li>• Role-specific technical challenges</li>            {currentQuestion && (

                    <li>• Company culture fit assessment</li>              <div className="card bg-base-100 shadow-xl">

                    <li>• Experience level matching</li>                <div className="card-body">

                  </ul>                  <div className="flex justify-between items-start mb-4">

                </div>                    <div className="badge badge-primary">{currentQuestion.category}</div>

              </div>                    <button className="btn btn-ghost btn-sm btn-circle">

            </div>                      <Volume2 size={20} />

          </div>                    </button>

                  </div>

          {/* Start Button */}                  <h3 className="text-2xl font-bold mb-4">{currentQuestion.text}</h3>

          <div className="flex justify-center mb-8">

            <button                  {!feedback ? (

              onClick={startInterview}                    <>

              disabled={isProcessing || !cvFile || (!jdFile && !jdText.trim())}                      <div className="form-control">

              className="btn btn-primary btn-lg gap-3 px-8"                        <textarea

            >                          className="textarea textarea-bordered h-40 text-base"

              {isProcessing ? (                          placeholder="Type your answer here..."

                <>                          value={answer}

                  <span className="loading loading-spinner"></span>                          onChange={(e) => setAnswer(e.target.value)}

                  <span className="text-lg">Processing Documents...</span>                        />

                </>                      </div>

              ) : (

                <>                      <div className="flex gap-4 mt-4">

                  <MessageSquare size={24} />                        <button className="btn btn-ghost gap-2">

                  <span className="text-lg">Start Mock Interview</span>                          <Mic size={20} />

                </>                          Voice Answer

              )}                        </button>

            </button>                        <button

          </div>                          onClick={handleSubmitAnswer}

                          className={`btn btn-primary gap-2 ml-auto ${loading ? 'loading' : ''}`}

          {/* Info Cards */}                          disabled={loading}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">                        >

            <div className="card bg-base-100 shadow-xl">                          {!loading && <Send size={20} />}

              <div className="card-body items-center text-center">                          Submit Answer

                <Video size={40} className="text-primary mb-4" />                        </button>

                <h3 className="card-title">Realistic Experience</h3>                      </div>

                <p className="text-sm text-base-content/70">                    </>

                  Practice with questions tailored to your experience level and target role                  ) : (

                </p>                    // Feedback Display

              </div>                    <div className="space-y-4">

            </div>                      {/* Score */}

                      <div className="text-center py-6 bg-base-200 rounded-lg">

            <div className="card bg-base-100 shadow-xl">                        <div className={`text-6xl font-bold ${getScoreColor(feedback.score)} mb-2`}>

              <div className="card-body items-center text-center">                          {feedback.score}/100

                <Mic size={40} className="text-secondary mb-4" />                        </div>

                <h3 className="card-title">Instant Feedback</h3>                        <div className={`badge ${getScoreBadge(feedback.score)} badge-lg`}>

                <p className="text-sm text-base-content/70">                          {feedback.score >= 85 ? 'Excellent' : feedback.score >= 70 ? 'Good' : 'Needs Improvement'}

                  Get real-time feedback on your answers and suggestions for improvement                        </div>

                </p>                      </div>

              </div>

            </div>                      {/* Your Answer */}

                      <div className="border-l-4 border-primary pl-4">

            <div className="card bg-base-100 shadow-xl">                        <h4 className="font-bold mb-2">Your Answer:</h4>

              <div className="card-body items-center text-center">                        <p className="text-base-content/70">{answer}</p>

                <CheckCircle size={40} className="text-success mb-4" />                      </div>

                <h3 className="card-title">Detailed Report</h3>

                <p className="text-sm text-base-content/70">                      {/* Strengths & Improvements */}

                  Receive a comprehensive report with strengths and areas to improve                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                </p>                        <div className="bg-success/10 p-4 rounded-lg">

              </div>                          <h4 className="font-bold text-success mb-2">Strengths:</h4>

            </div>                          <ul className="space-y-1">

          </div>                            {feedback.strengths.map((strength, index) => (

        </div>                              <li key={index} className="text-sm">✓ {strength}</li>

      </div>                            ))}

    );                          </ul>

  }                        </div>

                        <div className="bg-warning/10 p-4 rounded-lg">

  // Interview Chat Interface                          <h4 className="font-bold text-warning mb-2">Areas to Improve:</h4>

  return (                          <ul className="space-y-1">

    <div className="min-h-screen bg-base-200">                            {feedback.improvements.map((improvement, index) => (

      {/* Header */}                              <li key={index} className="text-sm">⚠ {improvement}</li>

      <div className="bg-gradient-to-r from-secondary to-accent text-white py-6">                            ))}

        <div className="container mx-auto px-4">                          </ul>

          <div className="flex items-center justify-between">                        </div>

            <div>                      </div>

              <h1 className="text-2xl font-bold flex items-center gap-2">

                <MessageSquare size={28} />                      {/* Detailed Feedback */}

                Mock Interview in Progress                      <div className="space-y-2">

              </h1>                        <h4 className="font-bold">Detailed Feedback:</h4>

              <p className="text-sm opacity-90 mt-1">                        {feedback.feedback.map((item, index) => (

                {interviewData?.position} • {interviewData?.company}                          <div key={index} className="alert alert-info">

              </p>                            <span className="text-sm">{item}</span>

            </div>                          </div>

            <button                        ))}

              onClick={handleEndInterview}                      </div>

              className="btn btn-ghost btn-sm text-white gap-2"

            >                      <button

              <RefreshCw size={16} />                        onClick={handleNextQuestion}

              End Interview                        className="btn btn-primary w-full gap-2"

            </button>                      >

          </div>                        Next Question

        </div>                        <Sparkles size={20} />

      </div>                      </button>

                    </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">                  )}

        <div className="card bg-base-100 shadow-xl">                </div>

          <div className="card-body p-0 flex flex-col" style={{ height: '75vh' }}>              </div>

            {/* Messages */}            )}

            <div className="flex-1 overflow-y-auto p-6 space-y-4">

              {messages.map((message) => (            {/* Question History */}

                <div            {questionHistory.length > 0 && (

                  key={message.id}              <div className="card bg-base-100 shadow-xl">

                  className={`chat ${message.type === 'user' ? 'chat-end' : 'chat-start'}`}                <div className="card-body">

                >                  <h3 className="card-title mb-4">Interview History</h3>

                  <div className="chat-image avatar">                  <div className="space-y-3">

                    <div className={`w-10 rounded-full ${                    {questionHistory.map((item, index) => (

                      message.type === 'bot'                       <div key={index} className="border-l-4 border-primary pl-4">

                        ? 'bg-gradient-to-br from-secondary to-accent'                         <div className="flex justify-between items-start">

                        : 'bg-primary'                          <div className="flex-1">

                    } flex items-center justify-center text-white`}>                            <p className="font-semibold">{item.question.text}</p>

                      {message.type === 'bot' ? <Bot size={20} /> : <User size={20} />}                            <p className="text-sm text-base-content/70 mt-1 line-clamp-2">

                    </div>                              {item.answer}

                  </div>                            </p>

                  <div className="chat-header mb-1">                          </div>

                    {message.type === 'bot' ? 'AI Interviewer' : 'You'}                          <div className={`badge ${getScoreBadge(item.score)} ml-4`}>

                    <time className="text-xs opacity-50 ml-2">                            {item.score}

                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}                          </div>

                    </time>                        </div>

                  </div>                      </div>

                  <div className={`chat-bubble ${                    ))}

                    message.type === 'bot'                   </div>

                      ? 'chat-bubble-secondary'                 </div>

                      : 'chat-bubble-primary'              </div>

                  } whitespace-pre-line max-w-2xl`}>            )}

                    {message.content}          </div>

                  </div>        )}

                </div>      </div>

              ))}    </div>

  );

              {isTyping && (};

                <div className="chat chat-start">

                  <div className="chat-image avatar">export default MockInterview;

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

            {/* Input Area */}
            <div className="border-t border-base-300 p-4 bg-base-100">
              <div className="flex gap-2">
                <textarea
                  className="textarea textarea-bordered flex-1 resize-none"
                  placeholder="Type your answer here... (Press Enter to send, Shift+Enter for new line)"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows="3"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
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
  );
};

export default MockInterview;
