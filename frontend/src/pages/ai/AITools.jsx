import { Link } from 'react-router-dom';
import { FileText, Target, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';

const AITools = () => {
  const tools = [
    {
      id: 'cv-analysis',
      title: 'CV Analysis',
      description: 'Get AI-powered feedback on your CV with detailed scores and improvement suggestions',
      icon: FileText,
      color: 'primary',
      path: '/ai-tools/cv-analysis',
    },
    {
      id: 'cv-optimizer',
      title: 'CV Optimizer',
      description: 'Optimize your CV for specific job descriptions and identify missing skills',
      icon: Target,
      color: 'secondary',
      path: '/ai-tools/cv-optimizer',
    },
    {
      id: 'mock-interview',
      title: 'Mock Interview',
      description: 'Practice interviews with AI and get instant feedback on your answers',
      icon: MessageSquare,
      color: 'accent',
      path: '/ai-tools/mock-interview',
    },
    {
      id: 'career-assistant',
      title: 'Career Assistant',
      description: 'Get personalized career advice and guidance from our AI career coach',
      icon: Sparkles,
      color: 'info',
      path: '/ai-tools/career-assistant',
    },
  ];

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-secondary to-accent text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="flex items-center gap-2">
              <Sparkles size={20} />
              AI-Powered Career Tools
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-6">Accelerate Your Career Growth</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Leverage cutting-edge AI technology to analyze your CV, practice interviews, and get
            personalized career guidance.
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                to={tool.path}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition group"
              >
                <div className="card-body">
                  <div
                    className={`bg-${tool.color}/10 text-${tool.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition`}
                  >
                    <Icon size={32} />
                  </div>
                  <h2 className="card-title text-2xl mb-2">{tool.title}</h2>
                  <p className="text-base-content/70 mb-4">{tool.description}</p>
                  <div className="card-actions justify-end">
                    <button className={`btn btn-${tool.color} btn-sm gap-2`}>
                      Get Started
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-base-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Use Our AI Tools?</h2>
            <p className="text-xl text-base-content/70">
              Powered by advanced AI to give you the edge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Instant Feedback</h3>
              <p className="text-base-content/70">
                Get immediate, actionable insights without waiting for human review
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Personalized Results</h3>
              <p className="text-base-content/70">
                AI adapts to your specific situation and career goals
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-base-content/70">
                Monitor improvements over time with detailed analytics
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="card bg-gradient-to-r from-primary to-secondary text-white shadow-2xl">
          <div className="card-body text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
            <p className="text-xl mb-8 opacity-90">
              Start using our AI tools today and see the difference
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/ai-tools/cv-analysis" className="btn btn-accent btn-lg">
                Start with CV Analysis
              </Link>
              <Link to="/mentors" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary btn-lg">
                Find a Mentor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITools;
