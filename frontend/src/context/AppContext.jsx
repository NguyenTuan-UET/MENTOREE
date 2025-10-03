import { createContext, useContext, useState } from 'react';
import { getCurrentUser, mockUsers } from '../data/mockUsers.js';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Simulate current user - can be switched for testing different roles
  // Start with no user (null) to show login page
  const [currentUser, setCurrentUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Auth functions (placeholders for backend integration)
  const login = async (email, password) => {
    // TODO: Implement backend API call
    console.log('Login:', { email, password });
    
    // Mock login - find user by email
    const user = mockUsers.find(u => u.email === email);
    
    if (user) {
      // In production, verify password with backend
      setCurrentUser(user);
      return { success: true, user };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const register = async (userData) => {
    // TODO: Implement backend API call
    console.log('Register:', userData);
    return { success: true };
  };

  const logout = () => {
    // TODO: Implement backend API call
    setCurrentUser(null);
    // Redirect to login page
    window.location.href = '/login';
  };

  const updateProfile = async (profileData) => {
    // TODO: Implement backend API call
    console.log('Update profile:', profileData);
    setCurrentUser({ ...currentUser, ...profileData });
    return { success: true };
  };

  // Booking functions (placeholders)
  const createBooking = async (bookingData) => {
    // TODO: Implement backend API call
    console.log('Create booking:', bookingData);
    return { success: true, bookingId: Date.now() };
  };

  const acceptBooking = async (bookingId) => {
    // TODO: Implement backend API call
    console.log('Accept booking:', bookingId);
    return { success: true };
  };

  const rejectBooking = async (bookingId, reason) => {
    // TODO: Implement backend API call
    console.log('Reject booking:', { bookingId, reason });
    return { success: true };
  };

  // Review functions (placeholders)
  const submitReview = async (reviewData) => {
    // TODO: Implement backend API call
    console.log('Submit review:', reviewData);
    return { success: true };
  };

  // CV/AI functions (placeholders)
  const uploadCV = async (file) => {
    // TODO: Implement backend API call with file upload
    console.log('Upload CV:', file);
    return { success: true, cvId: Date.now() };
  };

  const analyzeCV = async (cvId) => {
    // TODO: Implement backend AI API call
    console.log('Analyze CV:', cvId);
    return { 
      success: true, 
      score: 85,
      report: {
        strengths: ['Good structure', 'Clear experience'],
        weaknesses: ['Missing keywords'],
        suggestions: ['Add more metrics'],
      }
    };
  };

  const optimizeCV = async (cvId, jdId) => {
    // TODO: Implement backend AI API call
    console.log('Optimize CV:', { cvId, jdId });
    return {
      success: true,
      missingSkills: ['Docker', 'AWS'],
      suggestions: ['Add cloud experience', 'Highlight leadership'],
    };
  };

  const mockInterview = async (question) => {
    // TODO: Implement backend AI API call
    console.log('Mock interview question:', question);
    return {
      success: true,
      response: 'This is a simulated AI response...',
      score: 85,
      feedback: 'Good answer! Consider adding more specific examples.',
    };
  };

  const careerAssistant = async (question) => {
    // TODO: Implement backend AI API call
    console.log('Career assistant question:', question);
    return {
      success: true,
      response: 'Based on your background, I recommend focusing on...',
    };
  };

  // Admin functions (placeholders)
  const updateUserStatus = async (userId, status) => {
    // TODO: Implement backend API call
    console.log('Update user status:', { userId, status });
    return { success: true };
  };

  const exportData = async (dataType) => {
    // TODO: Implement backend API call
    console.log('Export data:', dataType);
    return { success: true, downloadUrl: '/exports/data.csv' };
  };

  const value = {
    currentUser,
    setCurrentUser,
    notifications,
    setNotifications,
    // Auth
    login,
    register,
    logout,
    updateProfile,
    // Bookings
    createBooking,
    acceptBooking,
    rejectBooking,
    // Reviews
    submitReview,
    // CV/AI
    uploadCV,
    analyzeCV,
    optimizeCV,
    mockInterview,
    careerAssistant,
    // Admin
    updateUserStatus,
    exportData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
