'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  delay: number;
}

const StatCard = ({ icon, value, label, description, delay }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.06]"
    >
      {/* Ambient glow effect */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-gradient-to-br from-violet-500/10 to-cyan-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />

      {/* Icon container */}
      <div className="relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10">
        {icon}
      </div>

      {/* Value */}
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, duration: 0.4 }}
        className="relative text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent"
      >
        {value}
      </motion.h3>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.3, duration: 0.4 }}
        className="relative mt-2 text-sm font-semibold uppercase tracking-widest text-violet-400/90"
      >
        {label}
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.4, duration: 0.4 }}
        className="relative mt-3 text-sm leading-relaxed text-white/50"
      >
        {description}
      </motion.p>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.5, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-violet-500/80 via-cyan-500/80 to-transparent"
      />
    </motion.div>
  );
};

const statsData: StatCardProps[] = [
  {
    icon: (
      <svg className="h-7 w-7 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    value: '7+',
    label: 'Years Experience',
    description:
      'Building scalable enterprise SaaS platforms, complex Warehouse Management Systems, and high-traffic mobile applications from scratch.',
    delay: 0,
  },
  {
    icon: (
      <svg className="h-7 w-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6 10.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm-6-7.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
    value: '70+',
    label: 'B2B Clients',
    description:
      'Successfully onboarded 70+ active high-paying B2B clients within the first quarter of launching the Case Management Hub SaaS platform.',
    delay: 0.1,
  },
  {
    icon: (
      <svg className="h-7 w-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6 10.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm-6-7.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
    value: '4M+',
    label: 'Active Users',
    description:
      'Scaled the Seated restaurant reservation application to support 4 million concurrent active users globally.',
    delay: 0.2,
  },
  {
    icon: (
      <svg className="h-7 w-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    value: 'HIPAA',
    label: 'Compliant Systems',
    description:
      'Architected secure, HIPAA-compliant enterprise infrastructure with end-to-end data encryption and granular role-based access control.',
    delay: 0.3,
  },
];

export default function StatsCards() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" id="stats">
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-500/[0.04] blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.03] blur-3xl" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400/80"
          >
            Impact at a Glance
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Building at Scale
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-6 text-lg leading-relaxed text-white/45"
          >
            From architecting multi-tenant SaaS platforms to scaling applications for millions of users — every line of code is engineered for impact.
          </motion.p>
        </motion.div>

        {/* Stats grid */}
        <div className="relative mt-16 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.8, duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="mx-auto mt-16 h-px w-48 origin-center bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />
      </div>
    </section>
  );
}
