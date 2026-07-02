import React from 'react';

const AboutMe: React.FC = () => {
  const professionalSummary = "Full Stack AI Engineer & Technical Team Lead with over 7 years of experience building scalable enterprise SaaS platforms, complex Warehouse Management Systems (WMS), and high-traffic mobile applications from scratch. Specialized in Next.js, NestJS, and modern backend architectures with hybrid database systems (MySQL + MongoDB), along with deep expertise in native Android (Kotlin/Java) hardware integrations and cross-platform ecosystems. Proven track record of leading cross-functional engineering teams, architecting secure, compliant systems (HIPAA), and driving immediate business value — including scaling a platform to 70+ high-paying active B2B clients within its first quarter.";

  const skills = {
    'AI & Automation': ['Local LLM Deployment (Ollama, Qwen, DeepSeek)', 'n8n Orchestration', 'OpenAI API', 'Prompt Engineering', 'Autonomous Data Pipelines'],
    'Frontend': ['Next.js', 'React', 'TypeScript', 'JavaScript', 'Redux', 'Tailwind CSS', 'Android SDK (Kotlin/Java)', 'React Native'],
    'Backend': ['Node.js', 'NestJS', 'Python', 'FastAPI', 'REST APIs', 'Microservices Architecture'],
    'Databases': ['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase Realtime DB'],
    'Architecture & Tools': ['SaaS', 'Multi-Tenancy', 'HIPAA Compliance', 'Docker', 'CI/CD', 'Zebra Hardware Integration', 'Git']
  };

  const experience = [
    {
      company: 'Airiodion Group',
      role: 'Senior Full Stack & AI Engineer',
      period: 'Oct 2024 – Jun 2026 | USA | Remote',
      highlights: [
        'Architected and led the full-stack development of a highly scalable, multi-tenant enterprise SaaS platform from scratch.',
        'Engineered a secure backend infrastructure using NestJS and a hybrid database model (MySQL + MongoDB).',
        'Implemented rigorous HIPAA compliance protocols, end-to-end data encryption, and granular role-based access control (RBAC).',
        'Successfully onboarding 70+ active high-paying clients between January and March alone.',
        'Designed production-grade RESTful APIs to decouple systems and maximize processing speed.',
        'Directed engineering workflows across distributed teams, standardizing code quality and performance optimizations.'
      ]
    },
    {
      company: 'FORTNA',
      role: 'Senior Software Engineer',
      period: 'Mar 2022 – Sep 2024 | USA | Remote',
      highlights: [
        'Developed and optimized enterprise-level applications tailored for complex warehouse operations, production logistics, and automated inventory flows.',
        'Built out core features for heavy-duty Warehouse Management Systems (WMS), handling high-volume real-time data synchronization.',
        'Engineered native Android solutions optimized for rugged warehouse environments, integrating physical Zebra enterprise hardware and PAX A920 smart payment terminals.',
        'Focused extensively on low-latency multithreading, robust background processing, and Firebase-backed real-time messaging.'
      ]
    },
    {
      company: 'Connectavo',
      role: 'Android Engineer',
      period: 'Mar 2019 – Jan 2022 | Germany | Remote',
      highlights: [
        'Built, scaled, and maintained the core native Android application for an industrial IoT plant-management platform.',
        'Successfully refactored and converted the application from React Native to native Android, scaling system capability to support 4 million active users.',
        'Collaborated directly with backend infrastructure leads to rebuild API interaction contracts, driving a 90% improvement in cross-team development velocity.'
      ]
    }
  ];

  const education = {
    institution: 'Superior University, Lahore',
    period: '2016 – 2020',
    degree: 'Bachelor of Science in Computer Science'
  };

  return (
    <section id="about" className="min-h-screen bg-slate-950 text-slate-200 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4">
            Saim Asif
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light">
            Senior Software Engineer | Full Stack & AI Specialist
          </p>
        </div>

        {/* Professional Summary */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-white mb-6 border-b border-slate-800 pb-2">
            Professional Summary
          </h2>
          <p className="text-lg leading-relaxed text-slate-300 max-w-4xl mx-auto">
            {professionalSummary}
          </p>
        </div>

        {/* Technical Skills */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-white mb-8 border-b border-slate-800 pb-2">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">{category}</h3>
                <ul className="space-y-2">
                  {skillList.map((skill, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-slate-300">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Experience */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-white mb-8 border-b border-slate-800 pb-2">
            Professional Experience
          </h2>
          <div className="space-y-10">
            {experience.map((job, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-slate-800 hover:border-blue-500/50 transition-colors duration-300">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-950 border-2 border-blue-400 rounded-full"></div>
                <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{job.role}</h3>
                      <p className="text-lg text-blue-400 font-medium">{job.company}</p>
                    </div>
                    <span className="text-sm text-slate-500 mt-2 md:mt-0 whitespace-nowrap">
                      {job.period}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {job.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="flex items-start">
                        <svg className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-300">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-3xl font-semibold text-white mb-8 border-b border-slate-800 pb-2">
            Education
          </h2>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 max-w-2xl">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h3 className="text-xl font-semibold text-white">{education.degree}</h3>
                <p className="text-lg text-blue-400">{education.institution}</p>
              </div>
              <span className="text-sm text-slate-500 mt-2 md:mt-0">
                {education.period}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;