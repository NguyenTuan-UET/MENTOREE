import { Link } from 'react-router-dom';
import { BookOpen, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-auto">
      <div className="container mx-auto px-4 py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Logo and Description - Full width on mobile, spans 2 cols on desktop */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={32} className="text-primary" />
              <span className="text-2xl font-bold">Mentoree</span>
            </div>
            <p className="text-base-content/80 mb-4 max-w-sm">
              Connect with expert mentors and accelerate your career growth
              through personalized guidance and AI-powered tools.
            </p>
            <div className="flex gap-3">
              <a href="#" className="btn btn-circle btn-sm btn-ghost hover:btn-primary" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="btn btn-circle btn-sm btn-ghost hover:btn-primary" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="btn btn-circle btn-sm btn-ghost hover:btn-primary" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="#" className="btn btn-circle btn-sm btn-ghost hover:btn-primary" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-lg font-semibold text-base-content mb-2">Platform</h3>
            <Link to="/mentors" className="text-base-content/70 hover:text-primary transition-colors">
              Find Mentors
            </Link>
            <Link to="/become-mentor" className="text-base-content/70 hover:text-primary transition-colors">
              Become a Mentor
            </Link>
            <Link to="/how-it-works" className="text-base-content/70 hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link to="/pricing" className="text-base-content/70 hover:text-primary transition-colors">
              Pricing
            </Link>
          </div>

          {/* Resources Links */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-lg font-semibold text-base-content mb-2">Resources</h3>
            <Link to="/ai-tools" className="text-base-content/70 hover:text-primary transition-colors">
              AI Tools
            </Link>
            <Link to="/blog" className="text-base-content/70 hover:text-primary transition-colors">
              Blog
            </Link>
            <Link to="/career-guides" className="text-base-content/70 hover:text-primary transition-colors">
              Career Guides
            </Link>
            <Link to="/success-stories" className="text-base-content/70 hover:text-primary transition-colors">
              Success Stories
            </Link>
          </div>

          {/* Company Links */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-lg font-semibold text-base-content mb-2">Company</h3>
            <Link to="/about" className="text-base-content/70 hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-base-content/70 hover:text-primary transition-colors">
              Contact
            </Link>
            <Link to="/careers" className="text-base-content/70 hover:text-primary transition-colors">
              Careers
            </Link>
            <Link to="/press" className="text-base-content/70 hover:text-primary transition-colors">
              Press
            </Link>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-lg font-semibold text-base-content mb-2">Legal</h3>
            <Link to="/terms" className="text-base-content/70 hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-base-content/70 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-base-content/70 hover:text-primary transition-colors">
              Cookie Policy
            </Link>
            <Link to="/guidelines" className="text-base-content/70 hover:text-primary transition-colors">
              Community Guidelines
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-base-300 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-base-content/70">
              © 2025 Mentoree. All rights reserved.
            </p>
            <p className="text-sm text-base-content/70">
              Devtamin with ❤️ for learners and educators
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
