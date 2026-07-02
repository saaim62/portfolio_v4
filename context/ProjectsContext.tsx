'use client';

import React, { createContext, useContext, ReactNode } from 'react';

// Define the structure for a project based on CV data
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  highlights: string[];
}

// Exact projects data extracted from the provided CV
const PROJECTS_DATA: Project[] = [
  {
    id: 'ai-job-scraping-pipeline',
    title: 'Autonomous AI Job-Scraping & Data Pipeline',
    description:
      'Architected and deployed an automated n8n data harvesting pipeline, initially built with a 5-node OpenAI (GPT-5 Mini) architecture. To optimize API costs and latency, successfully migrated the system to a local LLM infrastructure running qwen3.6:35b via Ollama on an M4 Pro (48GB RAM). Engineered a secure, low-latency reverse tunnel using bore.pub to expose the local model endpoint directly to the cloud n8n instance. The pipeline autonomously aggregates, parses, and matures multi-source unstructured web streams into high-fidelity, structured production datasets.',
    techStack: ['n8n', 'Ollama', 'Qwen3.6', 'OpenAI API', 'Reverse Tunneling', 'Python'],
    link: 'http://bore.pub:0000/',
    highlights: [
      'Reduced API costs and latency by migrating to local LLMs.',
      'Autonomous aggregation of multi-source unstructured data.',
      'Secure reverse tunneling for cloud exposure of local endpoints.',
    ],
  },
  {
    id: 'case-management-hub',
    title: 'Case Management Hub (SaaS Platform)',
    description:
      'A comprehensive, full-stack, HIPAA-compliant SaaS platform built from the ground up to automate complex legal and case workflows. Features robust multi-tenancy, enterprise security, and an active, rapidly expanding B2B client base.',
    techStack: ['Next.js', 'NestJS', 'MySQL', 'MongoDB', 'HIPAA Compliance', 'RBAC'],
    link: 'https://app.casemanagementhub.org/',
    highlights: [
      'Scaled to 70+ high-paying active B2B clients within the first quarter.',
      'Implemented strict data isolation and end-to-end encryption.',
      'Architected production-grade RESTful APIs for decoupled systems.',
    ],
  },
  {
    id: 'packtrack',
    title: 'PackTrack (Enterprise Scanner Solution)',
    description:
      'A specialized Android WMS application built for rugged enterprise Zebra hardware and PAX A920 smart devices, optimizing barcode decoding, secure ledger tracking, and supply chain logistics throughput.',
    techStack: ['Android SDK', 'Kotlin', 'Zebra Hardware Integration', 'PAX A920', 'WMS'],
    highlights: [
      'Optimized for rugged warehouse environments.',
      'Integrated physical Zebra enterprise hardware and smart payment terminals.',
      'Enhanced supply chain logistics throughput with secure ledger tracking.',
    ],
  },
  {
    id: 'seated',
    title: 'Seated',
    description:
      'A high-traffic restaurant reservation application transitioned to native Android to handle intense concurrent user traffic, successfully scaling to 4 million active users.',
    techStack: ['Android SDK', 'Kotlin', 'Firebase Realtime DB', 'Microservices'],
    highlights: [
      'Scaled system capability to support 4 million active users.',
      'Refactored from React Native to native Android for performance.',
      'Handled high-volume real-time data synchronization.',
    ],
  },
  {
    id: 'connectavo',
    title: 'Connectavo',
    description:
      'An industrial maintenance application incorporating advanced predictive analytics and real-time asset monitoring for automated factory environments. Contributed to a successful platform acquisition by the German corporate giant WAFIOS.',
    techStack: ['Android SDK', 'Java', 'React Native', 'API Contracts', 'Predictive Analytics'],
    highlights: [
      'Directly contributed to platform acquisition by WAFIOS.',
      'Rebuilt API interaction contracts, driving 90% improvement in cross-team velocity.',
      'Scaled application for industrial IoT plant-management.',
    ],
  },
];

// Define the context type
interface ProjectsContextType {
  projects: Project[];
  getProjectById: (id: string) => Project | undefined;
}

// Create the context with a default value
const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

// Provider component
export const ProjectsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const getProjectById = (id: string): Project | undefined => {
    return PROJECTS_DATA.find((project) => project.id === id);
  };

  return (
    <ProjectsContext.Provider value={{ projects: PROJECTS_DATA, getProjectById }}>
      {children}
    </ProjectsContext.Provider>
  );
};

// Custom hook to use the ProjectsContext
export const useProjects = (): ProjectsContextType => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};
