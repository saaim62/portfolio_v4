import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types for Global State and CV Data
interface UserCV {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  summary: string;
  skills: {
    aiAutomation: string[];
    frontend: string[];
    backend: string[];
    databases: string[];
    architecture: string[];
  };
  experience: Array<{
    company: string;
    role: string;
    period: string;
    location: string;
    description: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    link?: string;
  }>;
  education: {
    institution: string;
    degree: string;
    period: string;
  };
}

interface GlobalState {
  user: UserCV;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

// Create Context
const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

// CV Data Constants (No Placeholders)
const CV_DATA: UserCV = {
  name: "Saim Asif",
  title: "Senior Software Engineer | Full Stack & AI Specialist",
  location: "New Jersey, United States",
  phone: "+92 320 6090154",
  email: "saaim62@gmail.com",
  github: "GitHub",
  linkedin: "LinkedIn",
  summary: "Full Stack AI Engineer & Technical Team Lead with over 7 years of experience building scalable enterprise SaaS platforms, complex Warehouse Management Systems (WMS), and high-traffic mobile applications from scratch. Specialized in Next.js, NestJS, and modern backend architectures with hybrid database systems (MySQL + MongoDB), along with deep expertise in native Android (Kotlin/Java) hardware integrations and cross-platform ecosystems. Proven track record of leading cross-functional engineering teams, architecting secure, compliant systems (HIPAA), and driving immediate business value — including scaling a platform to 70+ high-paying active B2B clients within its first quarter.",
  skills: {
    aiAutomation: ["Local LLM Deployment (Ollama, Qwen, DeepSeek)", "n8n Orchestration", "OpenAI API", "Prompt Engineering", "Autonomous Data Pipelines"],
    frontend: ["Next.js", "React", "TypeScript", "JavaScript", "Redux", "Tailwind CSS", "Android SDK (Kotlin/Java)", "React Native"],
    backend: ["Node.js", "NestJS", "Python", "FastAPI", "REST APIs", "Microservices Architecture"],
    databases: ["MySQL", "MongoDB", "PostgreSQL", "Firebase Realtime DB"],
    architecture: ["SaaS", "Multi-Tenancy", "HIPAA Compliance", "Docker", "CI/CD", "Zebra Hardware Integration", "Git"]
  },
  experience: [
    {
      company: "Airiodion Group",
      role: "Senior Full Stack & AI Engineer",
      period: "Oct 2024 – Jun 2026",
      location: "USA | Remote",
      description: [
        "Architected and led the full-stack development of a highly scalable, multi-tenant enterprise SaaS platform from scratch: https://app.casemanagementhub.org/",
        "Engineered a secure backend infrastructure using NestJS and a hybrid database model (MySQL + MongoDB) to ensure strict data isolation and rapid query performance.",
        "Implemented rigorous HIPAA compliance protocols, end-to-end data encryption, and granular role-based access control (RBAC) to handle sensitive workflows.",
        "Managed the complete product lifecycle from concept to production, successfully onboarding 70+ active high-paying clients between January and March alone.",
        "Designed production-grade RESTful APIs to decouple systems and maximize processing speed across frontend and backend services.",
        "Directed engineering workflows across distributed teams, standardizing code quality, performance optimizations, and continuous deployment pipelines."
      ]
    },
    {
      company: "FORTNA",
      role: "Senior Software Engineer",
      period: "Mar 2022 – Sep 2024",
      location: "USA | Remote",
      description: [
        "Developed and optimized enterprise-level applications tailored for complex warehouse operations, production logistics, and automated inventory flows.",
        "Built out core features for heavy-duty Warehouse Management Systems (WMS), handling high-volume real-time data synchronization.",
        "Engineered native Android solutions optimized for rugged warehouse environments, integrating physical Zebra enterprise hardware and PAX A920 smart payment terminals.",
        "Focused extensively on low-latency multithreading, robust background processing, and Firebase-backed real-time messaging to ensure zero downtime on the floor."
      ]
    },
    {
      company: "Connectavo",
      role: "Android Engineer",
      period: "Mar 2019 – Jan 2022",
      location: "Germany | Remote",
      description: [
        "Built, scaled, and maintained the core native Android application for an industrial IoT plant-management platform, directly contributing to a successful platform acquisition by the German corporate giant WAFIOS.",
        "Successfully refactored and converted the application from React Native to native Android, scaling system capability to support 4 million active users.",
        "Collaborated directly with backend infrastructure leads to rebuild API interaction contracts, driving a 90% improvement in cross-team development velocity."
      ]
    }
  ],
  projects: [
    {
      name: "Autonomous AI Job-Scraping & Data Pipeline",
      description: "Architected and deployed an automated n8n data harvesting pipeline, initially built with a 5-node OpenAI (GPT-5 Mini) architecture. To optimize API costs and latency, successfully migrated the system to a local LLM infrastructure running qwen3.6:35b via Ollama on an M4 Pro (48GB RAM). Engineered a secure, low-latency reverse tunnel using bore.pub: http://bore.pub:0000/ to expose the local model endpoint directly to the cloud n8n instance. The pipeline autonomously aggregates, parses, and matures multi-source unstructured web streams into high-fidelity, structured production datasets.",
      link: "http://bore.pub:0000/"
    },
    {
      name: "Case Management Hub (SaaS Platform)",
      description: "A comprehensive, full-stack, HIPAA-compliant SaaS platform built from the ground up to automate complex legal and case workflows. Features robust multi-tenancy, enterprise security, and an active, rapidly expanding B2B client base.",
      link: "https://app.casemanagementhub.org/"
    },
    {
      name: "PackTrack (Enterprise Scanner Solution)",
      description: "A specialized Android WMS application built for rugged enterprise Zebra hardware and PAX A920 smart devices, optimizing barcode decoding, secure ledger tracking, and supply chain logistics throughput."
    },
    {
      name: "Seated",
      description: "A high-traffic restaurant reservation application transitioned to native Android to handle intense concurrent user traffic, successfully scaling to 4 million active users."
    },
    {
      name: "Connectavo",
      description: "An industrial maintenance application incorporating advanced predictive analytics and real-time asset monitoring for automated factory environments."
    }
  ],
  education: {
    institution: "Superior University, Lahore",
    degree: "Bachelor of Science in Computer Science",
    period: "2016 – 2020"
  }
};

// Provider Component
export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const value: GlobalState = {
    user: CV_DATA,
    theme,
    toggleTheme
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom Hook for accessing global state
export const useGlobalState = (): GlobalState => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

// Navbar Layout Component
export const NavbarLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  // This layout wraps the application with global state management.
  // It ensures all components, including the Navbar, have access to the CV data and theme.
  return (
    <GlobalStateProvider>
      {/* Navbar UI would typically be rendered here or imported */}
      {children}
    </GlobalStateProvider>
  );
};

export default NavbarLayout;