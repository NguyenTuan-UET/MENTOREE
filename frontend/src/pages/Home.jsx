import { Link } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  Star, 
  Brain, 
  TrendingUp, 
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { getMentors } from '../data/mockUsers.js';
import { mockDashboardStats } from '../data/mockStats.js';

const Home = () => {
  const topMentors = getMentors().slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary via-secondary to-accent text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="badge badge-lg badge-accent mb-4">
                <Sparkles size={16} className="mr-1" />
                AI-Powered Mentorship
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Accelerate Your Career with Expert Mentors
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Connect with industry professionals, get personalized guidance, and level up your
                skills with AI-powered tools designed for your success.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/mentors" className="btn btn-accent btn-lg gap-2">
                  <Search size={20} />
                  Find Your Mentor
                </Link>
                <Link to="/register" className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-primary">
                  Get Started Free
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Mentorship"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white text-primary p-6 rounded-xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <Users size={32} />
                    <div>
                      <div className="text-3xl font-bold">{mockDashboardStats.totalMentors}+</div>
                      <div className="text-sm">Expert Mentors</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-base-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {mockDashboardStats.totalUsers}+
              </div>
              <div className="text-base-content/70">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">
                {mockDashboardStats.completedBookings}+
              </div>
              <div className="text-base-content/70">Sessions Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">
                {mockDashboardStats.avgRating}
              </div>
              <div className="text-base-content/70">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-success mb-2">95%</div>
              <div className="text-base-content/70">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Why Choose Mentoree?</h2>
          <p className="text-xl text-base-content/70">
            Everything you need to succeed in your career journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
            <div className="card-body">
              <div className="bg-primary/10 text-primary w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Search size={28} />
              </div>
              <h3 className="card-title">Find Perfect Mentors</h3>
              <p className="text-base-content/70">
                Browse through our curated list of expert mentors and find the perfect match for
                your goals and learning style.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
            <div className="card-body">
              <div className="bg-secondary/10 text-secondary w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Calendar size={28} />
              </div>
              <h3 className="card-title">Easy Scheduling</h3>
              <p className="text-base-content/70">
                Book sessions at your convenience with our intuitive calendar system. Get reminders
                and meeting links automatically.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
            <div className="card-body">
              <div className="bg-accent/10 text-accent w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Brain size={28} />
              </div>
              <h3 className="card-title">AI-Powered Tools</h3>
              <p className="text-base-content/70">
                Leverage AI for CV analysis, mock interviews, and personalized career advice to
                enhance your learning experience.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
            <div className="card-body">
              <div className="bg-success/10 text-success w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Star size={28} />
              </div>
              <h3 className="card-title">Quality Guaranteed</h3>
              <p className="text-base-content/70">
                All mentors are carefully vetted professionals with proven track records in their
                respective fields.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
            <div className="card-body">
              <div className="bg-info/10 text-info w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <TrendingUp size={28} />
              </div>
              <h3 className="card-title">Track Your Progress</h3>
              <p className="text-base-content/70">
                Monitor your learning journey with detailed analytics and feedback from every
                mentorship session.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
            <div className="card-body">
              <div className="bg-warning/10 text-warning w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Users size={28} />
              </div>
              <h3 className="card-title">Community Support</h3>
              <p className="text-base-content/70">
                Join a thriving community of learners and professionals helping each other grow and
                succeed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Mentors Section */}
      <div className="bg-base-200 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Meet Our Top Mentors</h2>
            <p className="text-xl text-base-content/70">
              Learn from the best in the industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topMentors.map((mentor) => (
              <div key={mentor.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
                <figure className="px-10 pt-10">
                  <div className="avatar">
                    <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                      <img src={mentor.avatar} alt={mentor.name} />
                    </div>
                  </div>
                </figure>
                <div className="card-body items-center text-center">
                  <h3 className="card-title">{mentor.name}</h3>
                  <p className="text-base-content/70">{mentor.experience} experience</p>
                  <div className="flex items-center gap-1 text-warning mb-2">
                    <Star size={16} fill="currentColor" />
                    <span className="font-semibold">{mentor.rating}</span>
                    <span className="text-base-content/70">({mentor.totalReviews})</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {mentor.skills.slice(0, 3).map((skill) => (
                      <div key={skill} className="badge badge-primary badge-sm">
                        {skill}
                      </div>
                    ))}
                  </div>
                  <div className="card-actions mt-4">
                    <Link to={`/mentors/${mentor.id}`} className="btn btn-primary btn-sm">
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/mentors" className="btn btn-primary btn-lg gap-2">
              Browse All Mentors
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-base-content/70">Get started in 3 simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary text-primary-content w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
              1
            </div>
            <h3 className="text-2xl font-bold mb-4">Find Your Mentor</h3>
            <p className="text-base-content/70">
              Browse our list of expert mentors, filter by skills and expertise, and choose the
              perfect mentor for your needs.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-secondary text-secondary-content w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
              2
            </div>
            <h3 className="text-2xl font-bold mb-4">Book a Session</h3>
            <p className="text-base-content/70">
              Check their availability, select a convenient time slot, and book your session with
              just a few clicks.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-accent text-accent-content w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
              3
            </div>
            <h3 className="text-2xl font-bold mb-4">Learn & Grow</h3>
            <p className="text-base-content/70">
              Join your session, learn from your mentor, and track your progress towards your career
              goals.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already advancing their careers with personalized
            mentorship and AI-powered tools.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="btn btn-accent btn-lg gap-2">
              <CheckCircle size={20} />
              Start Free Today
            </Link>
            <Link
              to="/how-it-works"
              className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-primary"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
