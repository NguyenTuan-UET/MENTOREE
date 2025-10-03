# Mentoree - AI-Powered Mentorship Platform

A comprehensive mentorship platform connecting mentees with experienced mentors, featuring AI-powered career development tools.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation & Run

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/Mentoree.git
cd Mentoree/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open browser at `http://localhost:5173`

## 🔐 Demo Accounts

Login with any of these accounts (password not required for demo):

| Role | Email | Access |
|------|-------|--------|
| **Mentee** | `mentee1@mentoree.com` | Browse mentors, book sessions, AI tools |
| **Mentor** | `mentor1@mentoree.com` | Manage schedule, accept bookings |
| **Admin** | `admin@mentoree.com` | Platform management, analytics |

## ✨ Features

### � For Mentees
- **Find Mentors** - Browse by skills, experience, ratings
- **Book Sessions** - Flexible scheduling with calendar
- **AI Tools Suite**:
  - 📄 CV Analyzer - Get detailed feedback
  - 🎯 CV Optimizer - Match your CV to job descriptions
  - 💬 Mock Interview - Practice with AI interviewer
  - 🤖 Career Assistant - Get career guidance
- **Reviews & Ratings** - Rate mentors after sessions
- **Booking History** - Track all sessions

### 🎓 For Mentors
- **Manage Schedule** - Set availability slots
- **Accept/Reject Bookings** - Control your calendar
- **View Mentee Profiles** - Prepare for sessions
- **Earnings Dashboard** - Track income

### 👑 For Admins
- **Platform Analytics** - User stats, revenue
- **User Management** - Approve/suspend accounts
- **System Monitoring** - Platform health

## 🛠️ Tech Stack

**Frontend:**
- React 19.1.1 + Vite 7.1.8
- React Router DOM v6
- TailwindCSS 3.4 + DaisyUI 5.1.26
- Lucide React (icons)

**Backend (To be implemented):**
- Node.js/Express
- PostgreSQL/MongoDB
- JWT Authentication
- OpenAI API Integration

## 📁 Project Structure

```
Mentoree/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/         # Header, Footer, Layout
│   │   │   └── ScrollToTop.jsx
│   │   ├── pages/
│   │   │   ├── ai/             # AI tools (CVOptimizer, MockInterview, etc.)
│   │   │   ├── auth/           # Login, Register
│   │   │   ├── bookings/       # MyBookings, MentorBookings
│   │   │   ├── mentors/        # MentorList, MentorDetail
│   │   │   ├── schedule/       # MySchedule (mentor)
│   │   │   └── admin/          # AdminDashboard
│   │   ├── context/
│   │   │   └── AppContext.jsx  # Global state
│   │   ├── data/               # Mock data (users, bookings, etc.)
│   │   └── App.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🎨 Key Features Details

### AI-Powered Tools

**CV Optimizer**
- Upload CV (PDF) and Job Description
- Get match score and missing skills
- Receive optimization suggestions
- ATS-friendly recommendations

**Mock Interview**
- Upload CV and JD for context
- AI generates relevant questions
- Practice answers in real-time
- Get feedback and tips

**Career Assistant**
- Free chatbot for career advice
- No login required
- Context-aware responses

### Booking System
- Real-time availability
- Multiple time zones support
- Booking status tracking
- Review system

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🚧 Roadmap

**Phase 1: Backend** (Next)
- [ ] REST API with Express
- [ ] PostgreSQL database
- [ ] JWT authentication
- [ ] Real file uploads

**Phase 2: AI Integration**
- [ ] OpenAI API integration
- [ ] Real CV parsing
- [ ] Interview question generation
- [ ] Advanced career recommendations

**Phase 3: Payments**
- [ ] Stripe/PayPal integration
- [ ] Booking payment flow
- [ ] Mentor earnings dashboard

**Phase 4: Communication**
- [ ] Video call integration (Zoom/Google Meet)
- [ ] Real-time chat
- [ ] Email notifications
- [ ] SMS reminders

## 📤 Deploy to GitHub

```bash
# Initialize git (if needed)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Mentoree platform"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/Mentoree.git

# Push
git branch -M main
git push -u origin main
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👨‍� Development Notes

- Mock data in `/frontend/src/data/`
- All API calls are mocked (TODO comments for backend integration)
- Guest users can browse, login required for AI features
- Responsive design with TailwindCSS
- Dark/light theme support via DaisyUI

## 🐛 Known Issues

- Backend not implemented (using mock data)
- No real authentication (demo mode)
- File uploads not persisted
- Video calls not integrated

## 📞 Support

For issues and questions, please open a GitHub issue.

---

Built with ❤️ for the developer community
