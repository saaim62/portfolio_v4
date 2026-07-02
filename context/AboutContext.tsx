import React, { createContext, useContext, ReactNode } from 'react';

// --- Type Definitions ---

interface ContactInfo {
  phone: string;
  email: string;
  github: string;
  linkedin: string;
}

interface SkillCategory {
  category: string;
  skills: string[];
}

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  achievements: string[];
}

interface Project {
  title: string;
  description: string;
  link?: string;
}

interface Education {
  institution: string;
  degree: string;
  period: string;
}

interface AboutData {
  name: string;
  title: string;
  location: string;
  contact: ContactInfo;
  summary: string;
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  education: Education;
}

// --- Context Data (Exact CV Information) ---

const aboutData: AboutData = {
  name: 'Saim Asif',
  title: 'Senior Software Engineer | Full Stack & AI Specialist',
  location: 'New Jersey, United States',
  contact: {
    phone: '+92 320 6090154',
    email: 'saaim62@gmail.com',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
  summary:
    'Full Stack AI Engineer & Technical Team Lead with over 7 years of experience building scalable enterprise SaaS platforms, complex Warehouse Management Systems (WMS), and high-traffic mobile applications from scratch. Specialized in Next.js, NestJS, and modern backend architectures with hybrid database systems (MySQL + MongoDB), along with deep expertise in native Android (Kotlin/Java) hardware integrations and cross-platform ecosystems. Proven track record of leading cross-functional engineering teams, architecting secure, compliant systems (HIPAA), and driving immediate business value — including scaling a platform to 70+ high-paying active B2B clients within its first quarter.',
  skills: [
    {
      category: 'AI & Automation',
      skills: [
        'Local LLM Deployment (Ollama, Qwen, DeepSeek)',
        'n8n Orchestration',
        'OpenAI API',
        'Prompt Engineering',
        'Autonomous Data Pipelines',
      ],
    },
    {
      category: 'Frontend',
      skills: [
        'Next.js',
        'React',
        'TypeScript',
        'JavaScript',
        'Redux',
        'Tailwind CSS',
        'Android SDK (Kotlin/Java)',
        'React Native',
      ],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'NestJS', 'Python', 'FastAPI', 'REST APIs', 'Microservices Architecture'],
    },
    {
      category: 'Databases',
      skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase Realtime DB'],
    },
    {
      category: 'Architecture & Tools',
      skills: [
        'SaaS',
        'Multi-Tenancy',
        'HIPAA Compliance',
        'Docker',
        'CI/CD',
        'Zebra Hardware Integration',
        'Git',
      ],
    },
  ],
  experience: [
    {
      company: 'Airiodion Group',
      role: 'Senior Full Stack & AI Engineer',
      period: 'Oct 2024 – Jun 2026',
      location: 'USA',
      type: 'Remote',
      achievements: [
        'Architected and led the full-stack development of a highly scalable, multi-tenant enterprise SaaS platform from scratch: https://app.casemanagementhub.org/',
        'Engineered a secure backend infrastructure using NestJS and a hybrid database model (MySQL + MongoDB) to ensure strict data isolation and rapid query performance.',
        'Implemented rigorous HIPAA compliance protocols, end-to-end data encryption, and granular role-based access control (RBAC) to handle sensitive workflows.',
        'Managed the complete product lifecycle from concept to production, successfully onboarding 70+ active high-paying clients between January and March alone.',
        'Designed production-grade RESTful APIs to decouple systems and maximize processing speed across frontend and backend services.',
        'Directed engineering workflows across distributed teams, standardizing code quality, performance optimizations, and continuous deployment pipelines.',
      ],
    },
    {
      company: 'FORTNA',
      role: 'Senior Software Engineer',
      period: 'Mar 2022 – Sep 2024',
      location: 'USA',
      type: 'Remote',
      achievements: [
        'Developed and optimized enterprise-level applications tailored for complex warehouse operations, production logistics, and automated inventory flows.',
        'Built out core features for heavy-duty Warehouse Management Systems (WMS), handling high-volume real-time data synchronization.',
        'Engineered native Android solutions optimized for rugged warehouse environments, integrating physical Zebra enterprise hardware and PAX A920 smart payment terminals.',
        'Focused extensively on low-latency multithreading, robust background processing, and Firebase-backed real-time messaging to ensure zero downtime on the floor.',
      ],
    },
    {
      company: 'Connectavo',
      role: 'Android Engineer',
      period: 'Mar 2019 – Jan 2022',
      location: 'Germany',
      type: 'Remote',
      achievements: [
        'Built, scaled, and maintained the core native Android application for an industrial IoT plant-management platform, directly contributing to a successful platform acquisition by the German corporate giant WAFIOS.',
        'Successfully refactored and converted the application from React Native to native Android, scaling system capability to support 4 million active users.',
        'Collaborated directly with backend infrastructure leads to rebuild API interaction contracts, driving a 90% improvement in cross-team development velocity.',
      ],
    },
  ],
  projects: [
    {
      title: 'Autonomous AI Job-Scraping & Data Pipeline',
      description:
        'Architected and deployed an automated n8n data harvesting pipeline, initially built with a 5-node OpenAI (GPT-5 Mini) architecture. To optimize API costs and latency, successfully migrated the system to a local LLM infrastructure running qwen3.6:35b via Ollama on an M4 Pro (48GB RAM). Engineered a secure, low-latency reverse tunnel using bore.pub: http://bore.pub:0000/ to expose the local model endpoint directly to the cloud n8n instance. The pipeline autonomously aggregates, parses, and matures multi-source unstructured web streams into high-fidelity, structured production datasets.',
    },
    {
      title: 'Case Management Hub (SaaS Platform)',
      description:
        'A comprehensive, full-stack, HIPAA-compliant SaaS platform built from the ground up to automate complex legal and case workflows. Features robust multi-tenancy, enterprise security, and an active, rapidly expanding B2B client base.',
    },
    {
      title: 'PackTrack (Enterprise Scanner Solution)',
      description:
        'A specialized Android WMS application built for rugged enterprise Zebra hardware and PAX A920 smart devices, optimizing barcode decoding, secure ledger tracking, and supply chain logistics throughput.',
    },
    {
      title: 'Seated',
      description:
        'A high-traffic restaurant reservation application transitioned to native Android to handle intense concurrent user traffic, successfully scaling to 4 million active users.',
    },
    {
      title: 'Connectavo',
      description:
        'An industrial maintenance application incorporating advanced predictive analytics and real-time asset monitoring for automated factory environments.',
    },
  ],
  education: {
    institution: 'Superior University, Lahore',
    degree: 'Bachelor of Science in Computer Science',
    period: '2016 – 2020',
  },
};

// --- Context Creation ---

interface AboutContextType {
  data: AboutData;
}

const AboutContext = createContext<AboutContextType | undefined>(undefined);

// --- Provider Component ---

export const AboutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <AboutContext.Provider value={{ data: aboutData }}>{children}</AboutContext.Provider>;
};

// --- Custom Hook ---

export const useAbout = (): AboutContextType => {
  const context = useContext(AboutContext);
  if (context === undefined) {
    throw new Error('useAbout must be used within an AboutProvider');
  }
  return context;
};
