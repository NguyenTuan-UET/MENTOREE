// Mock review data
export const mockReviews = [
  {
    id: 1,
    bookingId: 3,
    mentorId: 3,
    menteeId: 5,
    rating: 5,
    comment: 'Emily was amazing! She gave me very detailed feedback on my portfolio design and helped me understand UX principles better. Highly recommend!',
    createdAt: new Date('2025-10-04T18:00:00Z'),
  },
  {
    id: 2,
    bookingId: 1,
    mentorId: 1,
    menteeId: 5,
    rating: 5,
    comment: 'Sarah is an excellent mentor. She explained React hooks in a very clear way and provided practical examples. Looking forward to our next session!',
    createdAt: new Date('2025-10-05T15:30:00Z'),
  },
  {
    id: 3,
    bookingId: 10,
    mentorId: 2,
    menteeId: 6,
    rating: 5,
    comment: 'Michael helped me understand complex algorithms in simple terms. His teaching style is fantastic and he was very patient with my questions.',
    createdAt: new Date('2025-09-28T10:00:00Z'),
  },
  {
    id: 4,
    bookingId: 11,
    mentorId: 4,
    menteeId: 5,
    rating: 4,
    comment: 'Great session on DevOps practices. David knows his stuff! Would have been 5 stars if we had more time to dive deeper into Kubernetes.',
    createdAt: new Date('2025-09-25T14:00:00Z'),
  },
  {
    id: 5,
    bookingId: 12,
    mentorId: 1,
    menteeId: 6,
    rating: 5,
    comment: 'Sarah provided excellent code review feedback. She identified issues I missed and taught me better coding patterns. Very valuable session!',
    createdAt: new Date('2025-09-22T11:30:00Z'),
  },
];

export const getReviewsByMentor = (mentorId) => {
  return mockReviews.filter(review => review.mentorId === mentorId);
};

export const getReviewsByMentee = (menteeId) => {
  return mockReviews.filter(review => review.menteeId === menteeId);
};

export const getReviewByBooking = (bookingId) => {
  return mockReviews.find(review => review.bookingId === bookingId);
};

export const calculateAverageRating = (mentorId) => {
  const reviews = getReviewsByMentor(mentorId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
};
