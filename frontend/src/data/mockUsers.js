// Mock user data for Mentoree platform
export const mockUsers = [
  {
    id: 1,
    email: 'mentor1@mentoree.com',
    role: 'mentor',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=1',
    name: 'Sarah Johnson',
    bio: 'Senior Software Engineer with 10+ years of experience in web development, specializing in React and Node.js. Passionate about helping junior developers grow their careers.',
    skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'System Design'],
    experience: '10+ years',
    price: 50,
    timezone: 'UTC+7',
    rating: 4.8,
    totalReviews: 45,
    responseTime: '< 1 hour',
    languages: ['English', 'Vietnamese'],
  },
  {
    id: 2,
    email: 'mentor2@mentoree.com',
    role: 'mentor',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=2',
    name: 'Michael Chen',
    bio: 'Full-stack developer and tech lead. I help developers master algorithms, data structures, and prepare for technical interviews at top tech companies.',
    skills: ['Algorithms', 'Data Structures', 'Python', 'Java', 'Interview Prep'],
    experience: '8 years',
    price: 45,
    timezone: 'UTC+8',
    rating: 4.9,
    totalReviews: 67,
    responseTime: '< 30 minutes',
    languages: ['English', 'Chinese'],
  },
  {
    id: 3,
    email: 'mentor3@mentoree.com',
    role: 'mentor',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=3',
    name: 'Emily Rodriguez',
    bio: 'UI/UX Designer and Frontend Developer. I specialize in creating beautiful, accessible, and user-friendly interfaces. Let me help you improve your design skills!',
    skills: ['UI/UX Design', 'Figma', 'React', 'CSS', 'Tailwind'],
    experience: '6 years',
    price: 40,
    timezone: 'UTC+0',
    rating: 4.7,
    totalReviews: 34,
    responseTime: '< 2 hours',
    languages: ['English', 'Spanish'],
  },
  {
    id: 4,
    email: 'mentor4@mentoree.com',
    role: 'mentor',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=4',
    name: 'David Kim',
    bio: 'DevOps Engineer and Cloud Architect. Expert in AWS, Docker, Kubernetes, and CI/CD pipelines. I help teams optimize their deployment processes.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    experience: '12 years',
    price: 60,
    timezone: 'UTC+9',
    rating: 4.9,
    totalReviews: 89,
    responseTime: '< 1 hour',
    languages: ['English', 'Korean'],
  },
  {
    id: 5,
    email: 'mentee1@mentoree.com',
    role: 'mentee',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=5',
    name: 'Alex Thompson',
    bio: 'Computer Science student looking to break into the tech industry. Eager to learn web development and software engineering best practices.',
    skills: ['HTML', 'CSS', 'JavaScript'],
    experience: '1 year',
  },
  {
    id: 6,
    email: 'mentee2@mentoree.com',
    role: 'mentee',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=6',
    name: 'Jessica Lee',
    bio: 'Junior developer looking to improve my React skills and learn about system design. Preparing for interviews at tech companies.',
    skills: ['React', 'JavaScript', 'Git'],
    experience: '2 years',
  },
  {
    id: 7,
    email: 'admin@mentoree.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=7',
    name: 'Admin User',
    bio: 'Platform administrator',
    skills: ['Platform Management', 'Support'],
  },
];

export const getCurrentUser = () => {
  // Simulate getting current user - default to mentee for demo
  return mockUsers[4]; // Alex Thompson (mentee)
};

export const getMentors = () => {
  return mockUsers.filter(user => user.role === 'mentor');
};

export const getMentees = () => {
  return mockUsers.filter(user => user.role === 'mentee');
};

export const getUserById = (id) => {
  return mockUsers.find(user => user.id === id);
};
