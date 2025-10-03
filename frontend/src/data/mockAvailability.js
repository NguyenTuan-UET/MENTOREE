// Mock mentor availability data
export const mockAvailability = [
  // Mentor 1 (Sarah Johnson) availability
  {
    id: 1,
    mentorId: 1,
    startUtc: new Date('2025-10-05T13:00:00Z'),
    endUtc: new Date('2025-10-05T17:00:00Z'),
    type: 'slot',
  },
  {
    id: 2,
    mentorId: 1,
    startUtc: new Date('2025-10-06T13:00:00Z'),
    endUtc: new Date('2025-10-06T17:00:00Z'),
    type: 'slot',
  },
  {
    id: 3,
    mentorId: 1,
    startUtc: new Date('2025-10-07T09:00:00Z'),
    endUtc: new Date('2025-10-07T12:00:00Z'),
    type: 'slot',
  },
  
  // Mentor 2 (Michael Chen) availability
  {
    id: 4,
    mentorId: 2,
    startUtc: new Date('2025-10-05T08:00:00Z'),
    endUtc: new Date('2025-10-05T12:00:00Z'),
    type: 'slot',
  },
  {
    id: 5,
    mentorId: 2,
    startUtc: new Date('2025-10-06T08:00:00Z'),
    endUtc: new Date('2025-10-06T11:00:00Z'),
    type: 'slot',
  },
  {
    id: 6,
    mentorId: 2,
    startUtc: new Date('2025-10-07T14:00:00Z'),
    endUtc: new Date('2025-10-07T18:00:00Z'),
    type: 'slot',
  },
  
  // Mentor 3 (Emily Rodriguez) availability
  {
    id: 7,
    mentorId: 3,
    startUtc: new Date('2025-10-05T15:00:00Z'),
    endUtc: new Date('2025-10-05T19:00:00Z'),
    type: 'slot',
  },
  {
    id: 8,
    mentorId: 3,
    startUtc: new Date('2025-10-06T15:00:00Z'),
    endUtc: new Date('2025-10-06T19:00:00Z'),
    type: 'slot',
  },
  
  // Mentor 4 (David Kim) availability
  {
    id: 9,
    mentorId: 4,
    startUtc: new Date('2025-10-05T07:00:00Z'),
    endUtc: new Date('2025-10-05T10:00:00Z'),
    type: 'slot',
  },
  {
    id: 10,
    mentorId: 4,
    startUtc: new Date('2025-10-06T12:00:00Z'),
    endUtc: new Date('2025-10-06T16:00:00Z'),
    type: 'slot',
  },
  {
    id: 11,
    mentorId: 4,
    startUtc: new Date('2025-10-07T07:00:00Z'),
    endUtc: new Date('2025-10-07T11:00:00Z'),
    type: 'slot',
  },
];

export const getAvailabilityByMentor = (mentorId) => {
  return mockAvailability.filter(slot => slot.mentorId === mentorId);
};

export const getAvailableSlots = (mentorId, date) => {
  return mockAvailability.filter(slot => 
    slot.mentorId === mentorId && 
    slot.type === 'slot' &&
    new Date(slot.startUtc).toDateString() === new Date(date).toDateString()
  );
};
