// Mock admin dashboard statistics
export const mockDashboardStats = {
  totalUsers: 145,
  totalMentors: 38,
  totalMentees: 102,
  totalAdmins: 5,
  totalBookings: 487,
  pendingBookings: 23,
  confirmedBookings: 156,
  completedBookings: 289,
  rejectedBookings: 19,
  totalRevenue: 24350,
  avgSessionPrice: 50,
  totalReviews: 245,
  avgRating: 4.7,
};

export const mockMonthlyStats = [
  { month: 'Apr', bookings: 35, revenue: 1750, users: 12 },
  { month: 'May', bookings: 42, revenue: 2100, users: 18 },
  { month: 'Jun', bookings: 58, revenue: 2900, users: 25 },
  { month: 'Jul', bookings: 67, revenue: 3350, users: 31 },
  { month: 'Aug', bookings: 89, revenue: 4450, users: 28 },
  { month: 'Sep', bookings: 105, revenue: 5250, users: 19 },
  { month: 'Oct', bookings: 91, revenue: 4550, users: 12 },
];

export const mockTopMentors = [
  {
    id: 2,
    name: 'Michael Chen',
    totalSessions: 67,
    revenue: 3015,
    rating: 4.9,
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 4,
    name: 'David Kim',
    totalSessions: 89,
    revenue: 5340,
    rating: 4.9,
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: 1,
    name: 'Sarah Johnson',
    totalSessions: 45,
    revenue: 2250,
    rating: 4.8,
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    totalSessions: 34,
    revenue: 1360,
    rating: 4.7,
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];

export const mockRecentActivity = [
  {
    id: 1,
    type: 'booking_created',
    user: 'Jessica Lee',
    action: 'booked a session with',
    target: 'Michael Chen',
    timestamp: new Date('2025-10-02T14:30:00Z'),
  },
  {
    id: 2,
    type: 'booking_confirmed',
    user: 'Sarah Johnson',
    action: 'confirmed session with',
    target: 'Alex Thompson',
    timestamp: new Date('2025-10-01T10:30:00Z'),
  },
  {
    id: 3,
    type: 'review_submitted',
    user: 'Alex Thompson',
    action: 'reviewed session with',
    target: 'Sarah Johnson',
    timestamp: new Date('2025-10-05T15:30:00Z'),
  },
  {
    id: 4,
    type: 'user_registered',
    user: 'New User',
    action: 'registered as',
    target: 'Mentee',
    timestamp: new Date('2025-10-02T09:15:00Z'),
  },
  {
    id: 5,
    type: 'cv_uploaded',
    user: 'Alex Thompson',
    action: 'uploaded new CV version',
    target: '',
    timestamp: new Date('2025-10-01T14:00:00Z'),
  },
];
