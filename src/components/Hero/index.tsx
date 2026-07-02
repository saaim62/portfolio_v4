import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, Phone, MapPin, ArrowRight, Cpu, Database, Code2 } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-slate-300 tracking-widest uppercase">Available for new opportunities</span>
        </div>

        {/* Name & Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-tight">
          Saim Asif
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 mb-10 font-light tracking-wide">
          Senior Software Engineer | Full Stack & AI Specialist
        </p>

        {/* Professional Summary */}
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-slate-500 leading-relaxed text-lg md:text-xl font-light">
            Full Stack AI Engineer with 7+ years of experience building scalable enterprise SaaS platforms, 
            complex Warehouse Management Systems, and high-traffic mobile applications. Specialized in Next.js, 
            NestJS, and modern backend architectures with deep expertise in AI automation and hardware integrations.
          </p>
        </div>

        {/* Contact Information */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 text-slate-400">
          <div className="flex items-center gap-3 group">
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-slate-700 transition-colors">
              <MapPin size={16} className="text-blue-400" />
            </div>
            <span className="text-sm font-medium">New Jersey, United States</span>
          </div>
          <div className="flex items-center gap-3 group">
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-slate-700 transition-colors">
              <Phone size={16} className="text-emerald-400" />
            </div>
            <span className="text-sm font-medium">+92 320 6090154</span>
          </div>
          <div className="flex items-center gap-3 group">
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-slate-700 transition-colors">
              <Mail size={16} className="text-purple-400" />
            </div>
            <span className="text-sm font-medium">saaim62@gmail.com</span>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Link 
            href="#projects" 
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-slate-950 rounded-lg font-semibold hover:bg-slate-200 transition-all duration-300 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
          >
            View Projects
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="#contact" 
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-slate-700 text-white rounded-lg font-semibold hover:bg-slate-900 hover:border-slate-600 transition-all duration-300"
          >
            Contact Me
          </Link>
        </div>

        {/* Tech Stack Highlights */}
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-6">Core Technologies</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Next.js', 'React', 'TypeScript', 'NestJS', 'Node.js', 'Python', 'FastAPI', 'MySQL', 'MongoDB', 'PostgreSQL', 'Docker', 'Kotlin'].map((tech) => (
              <span 
                key={tech} 
                className="px-4 py-2 rounded-md bg-slate-900/50 border border-slate-800 text-slate-400 text-sm font-medium hover:text-white hover:border-slate-600 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-8 mt-16">
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors duration-300 transform hover:scale-110">
            <Github size={24} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors duration-300 transform hover:scale-110">
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;