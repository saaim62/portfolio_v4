'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// ─── Animation Variants ────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
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
    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 cursor-default"
  >
    {label}
  </motion.span>
);

// ─── Experience Card Component ─────────────────────────────────────────
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
    className="relative pl-8 pb-10 last:pb-0 group"
  >
    {/* Timeline line */}
    <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/60 via-white/10 to-transparent" />
    {/* Dot */}
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: index * 0.12 + 0.2 }}
      className="absolute left-[-4px] top-1.5 w-2.5 h-2.5 rounded-full bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.6)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.9)] transition-shadow duration-500"
    />

    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-violet-300 transition-colors duration-300">{exp.role}</h3>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 whitespace-nowrap">
          {exp.period}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
        <span className="text-sm font-medium text-violet-400">{exp.company}</span>
        <span className="w-1 h-1 rounded-full bg-white/20" />
        <span className="text-xs text-gray-500">{exp.location}</span>
      </div>
      <ul className="space-y-2">
        {exp.bullets.map((bullet, bi) => (
          <motion.li
            key={bi}
            variants={fadeInUp}
            custom={index * 10 + bi}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-start gap-2 text-sm text-gray-400 leading-relaxed"
          >
            <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-500/60 flex-shrink-0" />
            {bullet}
          </motion.li>
        ))}
      </ul>
    </div>
  </motion.div>
);

// ─── Main AboutSection Component ───────────────────────────────────────
const AboutSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.15 });

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
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 sm:py-32"
    >
      {/* ── Background ambient glow ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-violet-600/[0.07] blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-indigo-600/[0.06] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        {/* ── Section Header ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-6"
          >
            About Me
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Crafting the Future with{' '}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              AI & Full Stack
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            {summary}
          </p>
        </motion.div>

        {/* ── Skills Grid ──────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-20 sm:mb-24"
        >
          <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-px bg-gradient-to-r from-violet-500 to-transparent" />
            Technical Expertise
          </h3>
          <div className="flex flex-wrap gap-3">
            {allSkills.map((skill, i) => (
              <SkillTag key={skill} label={skill} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ── Experience Timeline ──────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mb-20 sm:mb-24"
        >
          <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-px bg-gradient-to-r from-violet-500 to-transparent" />
            Professional Experience
          </h3>
          <div className="space-y-2">
            {experience.map((exp, i) => (
              <ExperienceCard key={exp.company} exp={exp} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ── Education & Contact Strip ──────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Education */}
          <motion.div
            variants={fadeInUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
          >
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              Education
            </h4>
            <p className="text-white font-medium">Bachelor of Science in Computer Science</p>
            <p className="text-gray-400 text-sm mt-1">Superior University, Lahore (2016 – 2020)</p>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={fadeInUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
          >
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get in Touch
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">
                <span className="text-white font-medium">Email:</span> saaim62@gmail.com
              </p>
              <p className="text-gray-400">
                <span className="text-white font-medium">Phone:</span> +92 320 6090154
              </p>
              <p className="text-gray-400">
                <span className="text-white font-medium">Location:</span> Pakistan, Lahore
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;