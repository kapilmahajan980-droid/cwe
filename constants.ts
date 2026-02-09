import { ResumeTemplate, ProjectTemplate } from './types';

export const RESUMES: ResumeTemplate[] = [
  {
    id: 'devops',
    title: 'DevOps Resume',
    image: 'https://i.postimg.cc/Vs7mwYrR/resms.png',
    atsScore: 97,
    companies: ['Amazon', 'Microsoft', 'Deloitte', 'TechSoft Limited'],
    isLocked: true,
    price: 199,
    includes: ['Latex Resume Template', 'Projects: project 1, project 2', 'projects installation', 'Related job alert', 'NotesKit', 'Interview Questions Sheet']
  },
  {
    id: 'web-dev',
    title: 'Web-dev Resume',
    image: 'https://i.postimg.cc/Vs7mwYrR/resms.png',
    atsScore: 95,
    companies: ['Google', 'Meta', 'Netflix'],
    isLocked: true,
    price: 199,
    includes: ['Modern Web Template', 'React Projects', 'Portfolio Guide']
  },
  {
    id: 'data-science',
    title: 'Data science Resume',
    image: 'https://i.postimg.cc/Vs7mwYrR/resms.png',
    atsScore: 94,
    companies: ['OpenAI', 'IBM', 'Tesla'],
    isLocked: true,
    price: 199,
    includes: ['ML Portfolio', 'Python Scripts', 'Dataset Resources']
  },
  {
    id: 'sde',
    title: 'Software SDE Resume',
    image: 'https://i.postimg.cc/Vs7mwYrR/resms.png',
    atsScore: 96,
    companies: ['Apple', 'Microsoft', 'Adobe'],
    isLocked: true,
    price: 199,
    includes: ['FAANG Style', 'Algo Solutions', 'System Design']
  },
  {
    id: 'uiux',
    title: 'UIUX Design Resume',
    image: 'https://i.postimg.cc/Vs7mwYrR/resms.png',
    atsScore: 92,
    companies: ['Airbnb', 'Spotify', 'Pinterest'],
    isLocked: true,
    price: 199,
    includes: ['Visual CV', 'Behance Integration', 'Case Study Guide']
  },
  {
    id: 'react',
    title: 'React Dev Resume',
    image: 'https://i.postimg.cc/Vs7mwYrR/resms.png',
    atsScore: 98,
    companies: ['Vercel', 'Netlify', 'Stripe'],
    isLocked: true,
    price: 199,
    includes: ['Hooks Master', 'State Mgmt', 'Next.js Guide']
  },
  {
    id: 'nextjs',
    title: 'Next Js Dev Resume',
    image: 'https://i.postimg.cc/Vs7mwYrR/resms.png',
    atsScore: 99,
    companies: ['Vercel', 'Twitter', 'Twitch'],
    isLocked: true,
    price: 199,
    includes: ['Server Components', 'SEO Best Practices', 'Hydration Guide']
  },
  {
    id: 'electrical',
    title: 'Electrical engg Resume',
    image: 'https://i.postimg.cc/Vs7mwYrR/resms.png',
    atsScore: 91,
    companies: ['Siemens', 'GE', 'Schneider'],
    isLocked: true,
    price: 199,
    includes: ['Industry Standards', 'CAD Experience', 'Safety Protocols']
  }
];

// Branch interface
export interface Branch {
  id: string;
  name: string;
  image: string;
  color?: string;
}

// Main resume branches
export const RESUME_BRANCHES: Branch[] = [
  {
    id: 'software-it',
    name: 'Software & IT',
    image: 'https://i.postimg.cc/Vs7mwYrR/resms.png'
  },
  {
    id: 'core-engineering',
    name: 'Core Engineering',
    image: 'https://i.postimg.cc/Vs7mwYrR/resms.png'
  },
  {
    id: 'civil',
    name: 'Civil Engineering',
    image: 'https://i.postimg.cc/Vs7mwYrR/resms.png'
  },
  {
    id: 'mechanical',
    name: 'Mechanical Engineering',
    image: 'https://i.postimg.cc/Vs7mwYrR/resms.png'
  },
  {
    id: 'electronics',
    name: 'Electronics & E&TC',
    image: 'https://i.postimg.cc/Vs7mwYrR/resms.png'
  },
  {
    id: 'data-ai',
    name: 'Data Science & AI',
    image: 'https://i.postimg.cc/Vs7mwYrR/resms.png'
  },
  {
    id: 'fresher',
    name: 'Internship / Fresher',
    image: 'https://i.postimg.cc/Vs7mwYrR/resms.png'
  },
  {
    id: 'other',
    name: 'Other Domains',
    image: 'https://i.postimg.cc/Vs7mwYrR/resms.png'
  }
];

// Map resumes to branches
export const RESUMES_BY_BRANCH: Record<string, ResumeTemplate[]> = {
  'software-it': [
    RESUMES[1], // web-dev
    RESUMES[5], // react
    RESUMES[6], // nextjs
  ],
  'core-engineering': [
    RESUMES[3], // sde
  ],
  'civil': [
    RESUMES[3], // sde (placeholder)
  ],
  'mechanical': [
    RESUMES[3], // sde (placeholder)
  ],
  'electronics': [
    RESUMES[7], // electrical
  ],
  'data-ai': [
    RESUMES[2], // data-science
  ],
  'fresher': [
    RESUMES[0], // devops
    RESUMES[4], // uiux
  ],
  'other': [
    RESUMES[3], // sde (placeholder)
  ]
};

export const PROJECTS: ProjectTemplate[] = [
  { id: 'p1', title: 'Software projects', image: 'https://picsum.photos/seed/p1/200/200', category: 'Software', isLocked: true, color: 'bg-green-500' },
  { id: 'p2', title: 'Website Projects', image: 'https://picsum.photos/seed/p2/200/200', category: 'Web', isLocked: true, color: 'bg-blue-400' },
  { id: 'p3', title: 'Android App Projects', image: 'https://picsum.photos/seed/p3/200/200', category: 'Android', isLocked: true, color: 'bg-orange-400' },
  { id: 'p4', title: 'php project codes', image: 'https://picsum.photos/seed/p4/200/200', category: 'PHP', isLocked: true, color: 'bg-purple-500' },
  { id: 'p5', title: 'E&TC projects', image: 'https://picsum.photos/seed/p5/200/200', category: 'E&TC', isLocked: true, color: 'bg-slate-600' },
  { id: 'p6', title: 'AI & Data sci Projects', image: 'https://picsum.photos/seed/p6/200/200', category: 'AI', isLocked: true, color: 'bg-cyan-500' },
  { id: 'p7', title: 'Final Year Projects', image: 'https://picsum.photos/seed/p7/200/200', category: 'Academic', isLocked: true, color: 'bg-red-400' },
  { id: 'p8', title: 'School Projects', image: 'https://picsum.photos/seed/p8/200/200', category: 'School', isLocked: true, color: 'bg-purple-400' }
];
