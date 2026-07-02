export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    id: 'case-management-hub',
    title: 'Case Management Hub (SaaS Platform)',
    description:
      'Architected and led the full-stack development of a highly scalable, multi-tenant enterprise SaaS platform from scratch. Engineered a secure backend using NestJS with a hybrid database model (MySQL + MongoDB) for strict data isolation and rapid query performance. Implemented rigorous HIPAA compliance protocols, end-to-end data encryption, and granular role-based access control (RBAC). Successfully onboarded 70+ active high-paying B2B clients within the first quarter.',
    tags: ['Next.js', 'NestJS', 'MySQL', 'MongoDB', 'HIPAA Compliance', 'Multi-Tenancy', 'RBAC', 'SaaS'],
    link: 'https://app.casemanagementhub.org/',
  },
  {
    id: 'autonomous-ai-pipeline',
    title: 'Autonomous AI Job-Scraping & Data Pipeline',
    description:
      'Architected and deployed an automated n8n data harvesting pipeline. Initially built with a 5-node OpenAI (GPT-5 Mini) architecture, optimized by migrating to local LLM infrastructure running qwen3.6:35b via Ollama on M4 Pro hardware. Engineered a secure, low-latency reverse tunnel using bore.pub to expose the local model endpoint to the cloud n8n instance. The pipeline autonomously aggregates, parses, and matures multi-source unstructured web streams into high-fidelity structured production datasets.',
    tags: ['n8n', 'Ollama', 'Qwen', 'Local LLM', 'OpenAI API', 'Prompt Engineering', 'Data Pipelines', 'Automation'],
  },
  {
    id: 'packtrack',
    title: 'PackTrack (Enterprise Scanner Solution)',
    description:
      'Developed a specialized Android WMS application tailored for rugged enterprise Zebra hardware and PAX A920 smart payment terminals. Optimized barcode decoding, secure ledger tracking, and supply chain logistics throughput. Focused on low-latency multithreading, robust background processing, and integration with physical hardware in high-volume warehouse environments.',
    tags: ['Android SDK', 'Kotlin', 'Java', 'Zebra Hardware', 'PAX A920', 'WMS', 'Hardware Integration'],
  },
  {
    id: 'seated',
    title: 'Seated',
    description:
      'Built and scaled a high-traffic restaurant reservation application. Successfully refactored and converted the core application from React Native to native Android to handle intense concurrent user traffic, scaling system capability to support 4 million active users. Collaborated with backend leads to rebuild API interaction contracts, driving significant improvements in development velocity.',
    tags: ['Android SDK', 'Kotlin', 'React Native', 'API Integration', 'High-Traffic Systems'],
  },
  {
    id: 'connectavo',
    title: 'Connectavo',
    description:
      'Built, scaled, and maintained the core native Android application for an industrial IoT plant-management platform. Incorporated advanced predictive analytics and real-time asset monitoring for automated factory environments. Directly contributed to a successful platform acquisition by the German corporate giant WAFIOS.',
    tags: ['Android SDK', 'Kotlin', 'IoT', 'Predictive Analytics', 'Real-Time Monitoring'],
  },
];