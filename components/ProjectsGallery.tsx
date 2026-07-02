'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  metrics?: string;
  icon: 'ai' | 'saas' | 'hardware' | 'scale' | 'iot';
  span: 'col-span-1' | 'col-span-2' | 'col-span-1 md:col-span-2 lg:col-span-2';
}

const projectsData: Project[] = [
  {
    id: 'case-management-hub',
    title: 'Case Management Hub (SaaS Platform)',
    description:
      'Architected and led the full-stack development of a highly scalable, multi-tenant enterprise SaaS platform from scratch. Engineered secure backend infrastructure using NestJS with a hybrid database model (MySQL + MongoDB) for strict data isolation. Implemented rigorous HIPAA compliance protocols, end-to-end data encryption, and granular RBAC. Successfully onboarded 70+ active high-paying B2B clients within the first quarter.',
    tags: ['Next.js', 'NestJS', 'MySQL', 'MongoDB', 'HIPAA', 'RBAC', 'SaaS'],
    link: 'https://app.casemanagementhub.org/',
    metrics: '70+ Active B2B Clients in Q1',
    icon: 'saas',
    span: 'col-span-1 md:col-span-2 lg:col-span-2',
  },
  {
    id: 'ai-job-scraping-pipeline',
    title: 'Autonomous AI Job-Scraping & Data Pipeline',
    description:
      'Architected an automated n8n data harvesting pipeline, initially built with a 5-node OpenAI (GPT-5 Mini) architecture. Optimized API costs and latency by migrating to local LLM infrastructure running qwen3.6:35b via Ollama on an M4 Pro (48GB RAM). Engineered a secure, low-latency reverse tunnel using bore.pub to expose the local model endpoint directly to the cloud n8n instance. The pipeline autonomously aggregates, parses, and matures multi-source unstructured web streams into high-fidelity structured datasets.',
    tags: ['n8n', 'Ollama', 'Qwen', 'OpenAI', 'Reverse Tunneling', 'Python'],
    link: 'http://bore.pub:0000/',
    metrics: 'Cost & Latency Optimized',
    icon: 'ai',
    span: 'col-span-1',
  },
  {
    id: 'packtrack',
    title: 'PackTrack (Enterprise Scanner Solution)',
    description:
      'Developed a specialized Android WMS application tailored for rugged enterprise Zebra hardware and PAX A920 smart payment terminals. Optimized barcode decoding, secure ledger tracking, and supply chain logistics throughput. Focused on low-latency multithreading, robust background processing, and Firebase-backed real-time messaging to ensure zero downtime in warehouse environments.',
    tags: ['Kotlin', 'Java', 'Zebra SDK', 'PAX A920', 'Firebase', 'WMS'],
    metrics: 'Zero Downtime on Floor',
    icon: 'hardware',
    span: 'col-span-1',
  },
  {
    id: 'seated',
    title: 'Seated',
    description:
      'Built, scaled, and maintained the core native Android application for a high-traffic restaurant reservation platform. Successfully refactored and converted the application from React Native to native Android, scaling system capability to support 4 million active users. Collaborated with backend leads to rebuild API interaction contracts, driving a 90% improvement in cross-team development velocity.',
    tags: ['Native Android', 'React Native', 'High Concurrency', 'API Contracts'],
    metrics: 'Scaled to 4M Active Users',
    icon: 'scale',
    span: 'col-span-1 md:col-span-2 lg:col-span-2',
  },
  {
    id: 'connectavo',
    title: 'Connectavo',
    description:
      'Developed an industrial maintenance application incorporating advanced predictive analytics and real-time asset monitoring for automated factory environments. Directly contributed to a successful platform acquisition by the German corporate giant WAFIOS. Rebuilt API interaction contracts to drive significant improvements in development velocity.',
    tags: ['Android', 'IoT', 'Predictive Analytics', 'Real-time DB', 'WAFIOS'],
    metrics: 'Acquired by WAFIOS',
    icon: 'iot',
    span: 'col-span-1 md:col-span-3 lg:col-span-3',
  },
];

const ProjectIcon: React.FC<{ type: Project['icon'] }> = ({ type }) => {
  const icons = {
    ai: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
      </svg>
    ),
    saas: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    hardware: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" />
      </svg>
    ),
    scale: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    iot: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  };
  return icons[type];
};

const ProjectsGallery: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section id="projects" ref={ref} className="py-32 relative z-[2] overflow-hidden w-full">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-500/[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-8">
            Work & Architecture
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg sm:text-xl font-light">
            A selection of enterprise-grade applications, AI pipelines, and scalable systems I have architected and delivered.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {projectsData.map((project) => (
            <motion.div
              variants={itemVariants}
              key={project.id}
              className={`group relative glass-panel p-8 md:p-10 hover:bg-white/[0.04] transition-all duration-500 flex flex-col h-full overflow-hidden ${project.span}`}
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                  <div className="p-4 bg-white/5 rounded-2xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-500 shadow-sm border border-white/10 group-hover:border-indigo-400">
                    <ProjectIcon type={project.icon} />
                  </div>
                  
                  {project.metrics && (
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
                      <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">{project.metrics}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 text-base leading-relaxed mb-8 flex-grow font-light">
                  {project.description}
                </p>

                {/* Footer (Tags & Link) */}
                <div className="flex flex-wrap items-end justify-between gap-6 mt-auto">
                  <div className="flex flex-wrap gap-2 flex-grow">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/5 text-slate-300 border border-white/10 group-hover:border-indigo-500/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-indigo-500 hover:border-indigo-400 transition-all duration-300 shadow-sm"
                      aria-label={`View ${project.title}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsGallery;