'use client';

import React from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  metrics?: string;
  icon: 'ai' | 'saas' | 'hardware' | 'scale' | 'iot';
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
  },
  {
    id: 'packtrack',
    title: 'PackTrack (Enterprise Scanner Solution)',
    description:
      'Developed a specialized Android WMS application tailored for rugged enterprise Zebra hardware and PAX A920 smart payment terminals. Optimized barcode decoding, secure ledger tracking, and supply chain logistics throughput. Focused on low-latency multithreading, robust background processing, and Firebase-backed real-time messaging to ensure zero downtime in warehouse environments.',
    tags: ['Kotlin', 'Java', 'Zebra SDK', 'PAX A920', 'Firebase', 'WMS'],
    metrics: 'Zero Downtime on Floor',
    icon: 'hardware',
  },
  {
    id: 'seated',
    title: 'Seated',
    description:
      'Built, scaled, and maintained the core native Android application for a high-traffic restaurant reservation platform. Successfully refactored and converted the application from React Native to native Android, scaling system capability to support 4 million active users. Collaborated with backend leads to rebuild API interaction contracts, driving a 90% improvement in cross-team development velocity.',
    tags: ['Native Android', 'React Native', 'High Concurrency', 'API Contracts'],
    metrics: 'Scaled to 4M Active Users',
    icon: 'scale',
  },
  {
    id: 'connectavo',
    title: 'Connectavo',
    description:
      'Developed an industrial maintenance application incorporating advanced predictive analytics and real-time asset monitoring for automated factory environments. Directly contributed to a successful platform acquisition by the German corporate giant WAFIOS. Rebuilt API interaction contracts to drive significant improvements in development velocity.',
    tags: ['Android', 'IoT', 'Predictive Analytics', 'Real-time DB', 'WAFIOS'],
    metrics: 'Acquired by WAFIOS',
    icon: 'iot',
  },
];

const ProjectIcon: React.FC<{ type: Project['icon'] }> = ({ type }) => {
  const icons: Record<Project['icon'], JSX.Element> = {
    ai: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
      </svg>
    ),
    saas: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    hardware: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    scale: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    iot: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  };
  return icons[type];
};

const ProjectsGallery: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background Gradient Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            A selection of enterprise-grade applications, AI pipelines, and scalable systems I have architected and delivered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-300 flex flex-col h-full"
            >
              {/* Icon & Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-zinc-800/50 rounded-xl text-zinc-300 group-hover:text-white group-hover:bg-zinc-700 transition-colors">
                  <ProjectIcon type={project.icon} />
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-zinc-800"
                    aria-label={`View ${project.title}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>

              {/* Metrics Badge */}
              {project.metrics && (
                <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/50">
                  <span className="text-xs font-medium text-emerald-400">{project.metrics}</span>
                </div>
              )}

              {/* Description */}
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-zinc-950 font-semibold hover:bg-zinc-200 transition-colors"
          >
            View Full Resume
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGallery;