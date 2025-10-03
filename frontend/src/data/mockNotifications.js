// Mock notification data
export const mockNotifications = [
  {
    id: 1,
    bookingId: 1,
    userId: 5,
    type: 'booking_confirmed',
    sentAt: new Date('2025-10-01T10:30:00Z'),
    read: false,
    payload: {
      title: 'Booking Confirmed!',
      message: 'Your booking with Sarah Johnson has been confirmed for Oct 5, 2025 at 2:00 PM',
      mentorName: 'Sarah Johnson',
      date: '2025-10-05T14:00:00Z',
    },
  },
  {
    id: 2,
    bookingId: 1,
    userId: 5,
    type: 'reminder_24h',
    sentAt: new Date('2025-10-04T14:00:00Z'),
    read: true,
    payload: {
      title: 'Session Reminder',
      message: 'Your session with Sarah Johnson is in 24 hours',
      mentorName: 'Sarah Johnson',
      date: '2025-10-05T14:00:00Z',
    },
  },
  {
    id: 3,
    bookingId: 1,
    userId: 5,
    type: 'reminder_1h',
    sentAt: new Date('2025-10-05T13:00:00Z'),
    read: false,
    payload: {
      title: 'Session Starting Soon!',
      message: 'Your session with Sarah Johnson starts in 1 hour',
      mentorName: 'Sarah Johnson',
      date: '2025-10-05T14:00:00Z',
    },
  },
  {
    id: 4,
    bookingId: 2,
    userId: 6,
    type: 'booking_pending',
    sentAt: new Date('2025-10-02T14:35:00Z'),
    read: true,
    payload: {
      title: 'Booking Request Sent',
      message: 'Your booking request with Michael Chen is pending approval',
      mentorName: 'Michael Chen',
      date: '2025-10-06T09:00:00Z',
    },
  },
  {
    id: 5,
    bookingId: 4,
    userId: 6,
    type: 'booking_rejected',
    sentAt: new Date('2025-09-29T10:00:00Z'),
    read: true,
    payload: {
      title: 'Booking Declined',
      message: 'David Kim declined your booking request. Reason: Schedule conflict - please book another time',
      mentorName: 'David Kim',
      date: '2025-10-03T13:00:00Z',
    },
  },
  {
    id: 6,
    bookingId: 5,
    userId: 1,
    type: 'booking_request',
    sentAt: new Date('2025-10-02T16:05:00Z'),
    read: false,
    payload: {
      title: 'New Booking Request',
      message: 'Jessica Lee has requested a session for Oct 7, 2025 at 10:00 AM',
      menteeName: 'Jessica Lee',
      date: '2025-10-07T10:00:00Z',
      goal: 'Code review for my React project',
    },
  },
  {
    id: 7,
    bookingId: null,
    userId: 5,
    type: 'cv_analysis_complete',
    sentAt: new Date('2025-10-01T14:30:00Z'),
    read: true,
    payload: {
      title: 'CV Analysis Complete',
      message: 'Your CV has been analyzed. Score: 85/100. Check the report for detailed feedback!',
      score: 85,
    },
  },
];

export const getNotificationsByUser = (userId) => {
  return mockNotifications.filter(notif => notif.userId === userId);
};

export const getUnreadNotifications = (userId) => {
  return mockNotifications.filter(notif => notif.userId === userId && !notif.read);
};

export const notificationTypes = {
  booking_request: { icon: 'Calendar', color: 'info' },
  booking_confirmed: { icon: 'CheckCircle', color: 'success' },
  booking_rejected: { icon: 'XCircle', color: 'error' },
  booking_pending: { icon: 'Clock', color: 'warning' },
  reminder_24h: { icon: 'Bell', color: 'info' },
  reminder_1h: { icon: 'Bell', color: 'warning' },
  cv_analysis_complete: { icon: 'FileText', color: 'success' },
};
