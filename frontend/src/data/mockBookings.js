// Mock booking data
export const mockBookings = [
  {
    id: 1,
    mentorId: 1,
    menteeId: 5,
    slotStartUtc: new Date('2025-10-05T14:00:00Z'),
    slotEndUtc: new Date('2025-10-05T15:00:00Z'),
    status: 'confirmed',
    goal: 'Learn React hooks and state management best practices',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    createdAt: new Date('2025-10-01T10:00:00Z'),
  },
  {
    id: 2,
    mentorId: 2,
    menteeId: 6,
    slotStartUtc: new Date('2025-10-06T09:00:00Z'),
    slotEndUtc: new Date('2025-10-06T10:00:00Z'),
    status: 'pending',
    goal: 'Prepare for technical interview - algorithms and data structures',
    meetingLink: null,
    createdAt: new Date('2025-10-02T14:30:00Z'),
  },
  {
    id: 3,
    mentorId: 3,
    menteeId: 5,
    slotStartUtc: new Date('2025-10-04T16:00:00Z'),
    slotEndUtc: new Date('2025-10-04T17:00:00Z'),
    status: 'completed',
    goal: 'Review my portfolio website design and get feedback',
    meetingLink: 'https://meet.google.com/xyz-uvwx-yz',
    createdAt: new Date('2025-09-30T11:00:00Z'),
  },
  {
    id: 4,
    mentorId: 4,
    menteeId: 6,
    slotStartUtc: new Date('2025-10-03T13:00:00Z'),
    slotEndUtc: new Date('2025-10-03T14:00:00Z'),
    status: 'rejected',
    goal: 'Learn about Docker and containerization',
    meetingLink: null,
    createdAt: new Date('2025-09-29T09:00:00Z'),
    rejectionReason: 'Schedule conflict - please book another time',
  },
  {
    id: 5,
    mentorId: 1,
    menteeId: 6,
    slotStartUtc: new Date('2025-10-07T10:00:00Z'),
    slotEndUtc: new Date('2025-10-07T11:00:00Z'),
    status: 'confirmed',
    goal: 'Code review for my React project',
    meetingLink: 'https://meet.google.com/abc-wxyz-klm',
    createdAt: new Date('2025-10-02T16:00:00Z'),
  },
];

export const getBookingsByMentee = (menteeId) => {
  return mockBookings.filter(booking => booking.menteeId === menteeId);
};

export const getBookingsByMentor = (mentorId) => {
  return mockBookings.filter(booking => booking.mentorId === mentorId);
};

export const getBookingById = (id) => {
  return mockBookings.find(booking => booking.id === id);
};

export const bookingStatuses = {
  pending: { label: 'Pending', color: 'warning' },
  confirmed: { label: 'Confirmed', color: 'success' },
  completed: { label: 'Completed', color: 'info' },
  rejected: { label: 'Rejected', color: 'error' },
  cancelled: { label: 'Cancelled', color: 'error' },
};
