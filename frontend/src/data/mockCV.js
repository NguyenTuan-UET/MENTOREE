// Mock CV data
export const mockCVVersions = [
  {
    id: 1,
    menteeId: 5,
    fileUrl: '/documents/cv_alex_thompson_v1.pdf',
    isCurrent: false,
    score: 72,
    reportJson: {
      strengths: [
        'Clear education section',
        'Relevant technical skills listed',
        'Good project descriptions',
      ],
      weaknesses: [
        'No quantifiable achievements',
        'Missing action verbs',
        'Layout could be more professional',
      ],
      suggestions: [
        'Add metrics to demonstrate impact (e.g., "Improved performance by 30%")',
        'Start bullet points with strong action verbs',
        'Consider using a more modern template',
        'Add links to GitHub and portfolio',
      ],
    },
    createdAt: new Date('2025-09-20T10:00:00Z'),
  },
  {
    id: 2,
    menteeId: 5,
    fileUrl: '/documents/cv_alex_thompson_v2.pdf',
    isCurrent: true,
    score: 85,
    reportJson: {
      strengths: [
        'Strong action verbs throughout',
        'Quantifiable achievements included',
        'Professional layout and formatting',
        'Relevant keywords for ATS systems',
      ],
      weaknesses: [
        'Could add more technical depth',
        'Missing leadership experience',
      ],
      suggestions: [
        'Add more details about technologies used in projects',
        'Highlight any team leadership or mentoring experience',
        'Consider adding a brief summary section at the top',
      ],
    },
    createdAt: new Date('2025-10-01T14:00:00Z'),
  },
  {
    id: 3,
    menteeId: 6,
    fileUrl: '/documents/cv_jessica_lee_v1.pdf',
    isCurrent: true,
    score: 78,
    reportJson: {
      strengths: [
        'Good technical skills section',
        'Clear project descriptions',
        'Professional email and contact info',
      ],
      weaknesses: [
        'Lacks specific accomplishments',
        'No certifications or courses listed',
        'Could improve formatting',
      ],
      suggestions: [
        'Add specific metrics and results',
        'Include relevant certifications or online courses',
        'Use a cleaner, more modern template',
        'Add a professional summary',
      ],
    },
    createdAt: new Date('2025-09-28T09:00:00Z'),
  },
];

export const mockJobDescriptions = [
  {
    id: 1,
    menteeId: 5,
    fileUrl: '/documents/jd_frontend_developer.pdf',
    parsedJson: {
      title: 'Frontend Developer',
      company: 'TechCorp Inc.',
      requiredSkills: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Git'],
      preferredSkills: ['Redux', 'Next.js', 'Tailwind CSS', 'Testing (Jest, React Testing Library)'],
      experience: '2-3 years',
      responsibilities: [
        'Build and maintain web applications using React',
        'Collaborate with designers and backend developers',
        'Write clean, maintainable code',
        'Participate in code reviews',
      ],
    },
    createdAt: new Date('2025-10-01T11:00:00Z'),
  },
  {
    id: 2,
    menteeId: 6,
    fileUrl: '/documents/jd_fullstack_engineer.pdf',
    parsedJson: {
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      requiredSkills: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'REST APIs'],
      preferredSkills: ['Docker', 'AWS', 'GraphQL', 'Microservices'],
      experience: '3-5 years',
      responsibilities: [
        'Develop full-stack web applications',
        'Design and implement RESTful APIs',
        'Optimize database queries and performance',
        'Deploy and maintain production systems',
      ],
    },
    createdAt: new Date('2025-09-29T15:00:00Z'),
  },
];

export const getCVByMentee = (menteeId) => {
  return mockCVVersions.filter(cv => cv.menteeId === menteeId);
};

export const getCurrentCV = (menteeId) => {
  return mockCVVersions.find(cv => cv.menteeId === menteeId && cv.isCurrent);
};

export const getJDByMentee = (menteeId) => {
  return mockJobDescriptions.filter(jd => jd.menteeId === menteeId);
};
