'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// ─── Animation Variants ────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

// ─── Skill Tag Component ───────────────────────────────────────────────
const SkillTag = ({ label, index }: { label: string; index: number }) => (
  <motion.span
    variants={fadeInUp}
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-white/5 border border-white/10 text-gray-300 hover:bg-indigo-500/10 hover:border-indigo-500/30 hover:text-white hover:-translate-y-1 transition-all duration-300 cursor-default shadow-sm"
  >
    {label}
  </motion.span>
);

// ─── Experience Component ─────────────────────────────────────────
interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

const ExperienceCard = ({ exp, index }: { exp: Experience; index: number }) => (
  <motion.div
    variants={fadeInUp}
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    className="relative group p-8 rounded-3xl glass-panel hover:bg-white/[0.04] transition-all duration-500"
  >
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    
    <div className="relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors duration-300">{exp.role}</h3>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          {exp.period}
        </span>
      </div>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm font-medium text-indigo-400">{exp.company}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <span className="text-xs text-gray-400">{exp.location}</span>
      </div>
      <ul className="space-y-3">
        {exp.bullets.map((bullet, bi) => (
          <li key={bi} className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500/50 flex-shrink-0" />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const AboutSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const summary = `Full Stack AI Engineer & Technical Team Lead with over 7 years of experience building scalable enterprise SaaS platforms, complex Warehouse Management Systems (WMS), and high-traffic mobile applications from scratch. Specialized in Next.js, NestJS, and modern backend architectures with hybrid database systems (MySQL + MongoDB), along with deep expertise in native Android (Kotlin/Java) hardware integrations and cross-platform ecosystems.`;

  const skills = {
    'AI & Automation': ['Local LLM Deployment', 'Ollama', 'Qwen', 'DeepSeek', 'n8n Orchestration', 'OpenAI API', 'Prompt Engineering', 'Autonomous Data Pipelines'],
    Frontend: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'Redux', 'Tailwind CSS', 'Android SDK', 'Kotlin/Java', 'React Native'],
    Backend: ['Node.js', 'NestJS', 'Python', 'FastAPI', 'REST APIs', 'Microservices Architecture'],
    Databases: ['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase Realtime DB'],
    'Architecture & Tools': ['SaaS', 'Multi-Tenancy', 'HIPAA Compliance', 'Docker', 'CI/CD', 'Zebra Hardware Integration', 'Git'],
  };

  const experience: Experience[] = [
    {
      company: 'Airiodion Group',
      role: 'Senior Full Stack & AI Engineer',
      period: 'Oct 2024 – Jun 2026',
      location: 'USA | Remote',
      bullets: [
        'Architected and led the full-stack development of a highly scalable, multi-tenant enterprise SaaS platform from scratch.',
        'Engineered a secure backend infrastructure using NestJS and a hybrid database model (MySQL + MongoDB) to ensure strict data isolation and rapid query performance.',
        'Implemented rigorous HIPAA compliance protocols, end-to-end data encryption, and granular role-based access control (RBAC).',
        'Managed the complete product lifecycle from concept to production, successfully onboarding 70+ active high-paying clients between January and March alone.',
        'Designed production-grade RESTful APIs to decouple systems and maximize processing speed across frontend and backend services.',
        'Directed engineering workflows across distributed teams, standardizing code quality, performance optimizations, and continuous deployment pipelines.',
      ],
    },
    {
      company: 'FORTNA',
      role: 'Senior Software Engineer',
      period: 'Mar 2022 – Sep 2024',
      location: 'USA | Remote',
      bullets: [
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
      location: 'Germany | Remote',
      bullets: [
        'Built and maintained the core native Android application for an industrial IoT plant-management platform, directly contributing to a successful platform acquisition by the German corporate giant WAFIOS.',
        'Engineered features to maintain and monitor heavy gear machines and industrial equipment across automated factory floors.',
        'Collaborated directly with backend infrastructure leads to rebuild API interaction contracts, driving a 90% improvement in cross-team development velocity.',
      ],
    },
  ];

  const allSkills = Object.values(skills).flat();

  return (
    <section id="about" ref={ref} className="relative w-full py-32 z-[2]">
      {/* ── Background Glow ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/[0.04] blur-[150px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* ── Section Header Bento ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 glass-panel p-10 md:p-14 rounded-[2rem] relative group overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-50" />
            
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-8">
              About Me
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
              Crafting the Future with <br className="hidden sm:block" />
              <span className="text-gradient">AI & Full Stack</span>
            </h2>
            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl font-light">
              {summary}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 grid grid-rows-2 gap-8"
          >
            <div className="glass-panel p-8 rounded-[2rem] flex flex-col justify-center items-center text-center group hover:bg-white/[0.04] transition-colors">
              <h3 className="text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-500 text-gradient">7+</h3>
              <p className="text-sm text-slate-400 uppercase tracking-widest font-medium">Years Experience</p>
            </div>
            <div className="glass-panel p-8 rounded-[2rem] flex flex-col justify-center items-center text-center group hover:bg-white/[0.04] transition-colors">
              <h3 className="text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-500 text-gradient">70+</h3>
              <p className="text-sm text-slate-400 uppercase tracking-widest font-medium">B2B Clients</p>
            </div>
          </motion.div>
        </div>

        {/* ── Skills & Experience Grid ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Experience Column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-7 space-y-8"
          >
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-indigo-500 rounded-full" />
              Professional Experience
            </h3>
            
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <ExperienceCard key={exp.company} exp={exp} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Skills Column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="sticky top-32">
              <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-4">
                <span className="w-12 h-[2px] bg-purple-500 rounded-full" />
                Technical Arsenal
              </h3>
              <div className="flex flex-wrap gap-3">
                {allSkills.map((skill, i) => (
                  <SkillTag key={skill} label={skill} index={i} />
                ))}
              </div>
              
              {/* Quick Contact Bento */}
              <motion.div 
                variants={fadeInUp}
                className="mt-12 glass-panel p-8 rounded-[2rem]"
              >
                <h4 className="text-lg font-semibold text-white mb-6">Let's build something.</h4>
                <div className="space-y-4">
                  <a href="mailto:saaim62@gmail.com" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    saaim62@gmail.com
                  </a>
                  <a href="https://www.linkedin.com/in/senior-software-engineer2/" target="_blank" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </div>
                    linkedin.com/in/senior-software-engineer2
                  </a>
                  <a href="https://github.com/saaim62" target="_blank" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    github.com/saaim62
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;