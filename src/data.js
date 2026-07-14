// ============================================================
// EDIT ME — this file holds every piece of real content on the
// site. Nothing elsewhere needs to change for a content update.
// ============================================================

export const profile = {
  name: 'ARON',
  surname: 'ONKWARE',
  roles: [
    'Full-Stack Developer',
    'UI/UX Designer',
    'Product Engineer',
    'Open Source Contributor',
  ],
  tagline:
    'I build fast, accessible products end-to-end — from wireframe to working code, shipped in production.',
  location: 'Nairobi, Kenya',
  availability: 'Available for work',
  githubUsername: 'draron-dare-045', // used to pull the live contribution graph
  stats: [
    { label: 'Years experience', value: 3, suffix: '+' },
    { label: 'Projects shipped', value: 24, suffix: '+' },
    { label: 'Happy clients', value: 12, suffix: '+' },
  ],
  socials: {
    github: 'https://github.com/draron-dare-045',
    linkedin: 'https://linkedin.com/in/your-username',
    twitter: 'https://x.com/your-username',
    instagram: 'https://instagram.com/your-username',
  },
  resumeUrl: '#', // link to your CV (Google Drive, etc.)
  email: 'aron@example.com',
  phone: '+254 700 000 000',
}

// Wall of Fame — awards, talks, features, hackathon wins
export const achievements = [
  {
    title: 'Hackathon Winner — Civic Tech Track',
    org: 'Nairobi Innovation Week',
    date: 'March 2026',
    description:
      'Led a team of four to build a civic-tech platform for public spending transparency, placing first in the civic tech track.',
    link: '#',
  },
  {
    title: 'Speaker — Frontend Patterns at Scale',
    org: 'DevFest Nairobi',
    date: 'November 2025',
    description:
      'Gave a talk on component architecture and design systems for teams shipping fast without breaking consistency.',
    link: '#',
  },
  {
    title: 'Top 5 Finalist — AI Innovation Challenge',
    org: 'Regional AI Summit',
    date: 'June 2026',
    description:
      'Built an AI-assisted matching tool connecting students with mentorship opportunities based on skill gaps.',
    link: '#',
  },
]

// Projects — filterable by category
export const projectCategories = [
  'All',
  'Web Development',
  'UI/UX Design',
  'Data & AI',
]

export const projects = [
  {
    title: 'Project One',
    category: 'Web Development',
    description:
      'A short, punchy description of what this project does and the problem it solves.',
    image: '',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    title: 'Project Two',
    category: 'UI/UX Design',
    description:
      'A short, punchy description of what this project does and the problem it solves.',
    image: '',
    tags: ['Figma', 'Design System'],
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    title: 'Project Three',
    category: 'Data & AI',
    description:
      'A short, punchy description of what this project does and the problem it solves.',
    image: '',
    tags: ['Python', 'Pandas', 'ML'],
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    title: 'Project Four',
    category: 'Web Development',
    description:
      'A short, punchy description of what this project does and the problem it solves.',
    image: '',
    tags: ['Next.js', 'Tailwind', 'Stripe'],
    liveUrl: '#',
    codeUrl: '#',
  },
]

export const services = [
  {
    title: 'Web Development',
    description:
      'Responsive, performant web apps built with React, Next.js and modern tooling — from component architecture to deployment.',
  },
  {
    title: 'UI/UX Design',
    description:
      'End-to-end product design grounded in research, wireframes and high-fidelity prototypes that guide users and build trust.',
  },
  {
    title: 'Data & AI',
    description:
      'Data pipelines, dashboards and AI-powered features that turn raw data into decisions teams can act on.',
  },
]