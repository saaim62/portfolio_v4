import React from 'react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6 relative overflow-hidden">
      {/* Subtle background gradient for premium feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl z-0" />

      <div className="max-w-4xl mx-auto text-center z-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent animate-fade-in-up">
          SAIM ASIF
        </h1>
        <h2 className="text-xl md:text-2xl text-slate-300 font-medium mb-6 tracking-wide">
          Senior Software Engineer | Full Stack & AI Specialist
        </h2>
        <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in-up delay-100">
          Full Stack AI Engineer & Technical Team Lead with over 7 years of experience building scalable enterprise SaaS platforms, complex Warehouse Management Systems (WMS), and high-traffic mobile applications from scratch. Specialized in Next.js, NestJS, and modern backend architectures with hybrid database systems.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
          <a
            href="#projects"
            className="px-8 py-3 bg-white text-slate-950 font-semibold rounded-lg hover:bg-slate-200 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-slate-700 text-white font-semibold rounded-lg hover:border-slate-500 hover:bg-slate-900 transition-all duration-300 transform hover:scale-105"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;