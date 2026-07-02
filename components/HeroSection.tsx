'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const lineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: '100%',
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const skillsVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const floatingShapes = [
    { size: 320, top: '-10%', left: '-5%', color: 'rgba(99, 102, 241, 0.08)' },
    { size: 240, top: '60%', right: '-3%', color: 'rgba(168, 85, 247, 0.06)' },
    { size: 180, bottom: '5%', left: '10%', color: 'rgba(59, 130, 246, 0.05)' },
  ];

  const skillCategories = [
    {
      label: 'AI & Automation',
      skills: ['Ollama', 'Qwen', 'DeepSeek', 'n8n', 'OpenAI API'],
    },
    {
      label: 'Frontend',
      skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Kotlin'],
    },
    {
      label: 'Backend',
      skills: ['NestJS', 'Node.js', 'Python', 'FastAPI', 'Microservices'],
    },
    {
      label: 'Databases',
      skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase'],
    },
  ];

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]"
    >
      {/* Floating background shapes */}
      {floatingShapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl"
          style={{
            width: shape.size,
            height: shape.size,
            backgroundColor: shape.color,
            ...shape,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)]" />

      {/* Content container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center pt-28"
      >
        {/* Status badge */}
        <motion.div variants={badgeVariants} className="mb-8">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-300 text-sm font-medium tracking-wide"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Available for new opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={titleVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-4"
        >
          Saim{' '}
          <span
            className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Asif
          </span>
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl text-gray-400 font-light mb-6 max-w-3xl mx-auto"
        >
          Senior Software Engineer | Full Stack & AI Specialist
        </motion.p>

        {/* Location */}
        <motion.p
          variants={itemVariants}
          className="text-base text-gray-500 mb-8 flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          Pakistan, Lahore
        </motion.p>

        {/* Divider line */}
        <motion.div variants={lineVariants} className="flex justify-center mb-10">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        </motion.div>

        {/* Summary */}
        <motion.p
          variants={itemVariants}
          className="text-gray-400 leading-relaxed max-w-3xl mx-auto mb-12 text-base sm:text-lg"
        >
          Full Stack AI Engineer & Technical Team Lead with over{' '}
          <span className="text-indigo-300 font-medium">7+ years</span> of experience building scalable
          enterprise SaaS platforms, complex Warehouse Management Systems, and high-traffic mobile
          applications. Specialized in Next.js, NestJS, and modern backend architectures with deep expertise
          in native Android hardware integrations.
        </motion.p>

        {/* Skills */}
        <motion.div variants={skillsVariants} className="mb-12">
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {skillCategories.map((category) => (
              <div key={category.label} className="text-left">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-medium">
                  {category.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-gray-300 text-sm hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={ctaVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-base overflow-hidden"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3.5 rounded-xl border border-white/10 text-gray-300 font-medium text-base hover:border-indigo-500/40 hover:bg-white/[0.03] hover:text-white transition-all duration-300"
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {[{
            value: '7+',
            label: 'Years Experience',
          }, {
            value: '70+',
            label: 'B2B Clients Onboarded',
          }, {
            value: '4M+',
            label: 'Users Scaled To',
          }, {
            value: 'HIPAA',
            label: 'Compliant Systems',
          }].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-white/40"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;