import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import MentorList from './pages/mentors/MentorList';
import MentorDetail from './pages/mentors/MentorDetail';
import AITools from './pages/ai/AITools';
import CVAnalysis from './pages/ai/CVAnalysis';
import CVOptimizer from './pages/ai/CVOptimizer';
import CareerAssistant from './pages/ai/CareerAssistant';
import MockInterview from './pages/ai/MockInterview';
import MyBookings from './pages/bookings/MyBookings';
import MentorBookings from './pages/bookings/MentorBookings';
import MySchedule from './pages/schedule/MySchedule';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Auth Routes - No Layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Main Routes - With Layout */}
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/mentors" element={<MentorList />} />
                  <Route path="/mentors/:id" element={<MentorDetail />} />
                  
                  {/* AI Tools Routes */}
                  <Route path="/ai-tools" element={<AITools />} />
                  <Route path="/ai-tools/cv-analysis" element={<CVAnalysis />} />
                  <Route path="/ai-tools/cv-optimizer" element={<CVOptimizer />} />
                  <Route path="/ai-tools/career-assistant" element={<CareerAssistant />} />
                  <Route path="/ai-tools/mock-interview" element={<MockInterview />} />
                  
                  {/* Bookings Routes */}
                  <Route path="/my-bookings" element={<MyBookings />} />
                  <Route path="/mentor-bookings" element={<MentorBookings />} />
                  
                  {/* Schedule Routes */}
                  <Route path="/my-schedule" element={<MySchedule />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  
                  {/* Catch all - redirect to home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
