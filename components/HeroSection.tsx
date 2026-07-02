'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Handle Spotlight Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const smoothX = useSpring(mousePosition.x, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mousePosition.y, { stiffness: 50, damping: 20 });

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      {/* Dynamic Background */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15), transparent 60%)',
          x: smoothX,
          y: smoothY
        }}
      />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center mt-20"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="flex flex-col items-center"
        >
          {/* Status Badge */}
          <motion.div variants={textVariants} className="mb-8 relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative px-4 py-2 bg-black/50 ring-1 ring-white/10 rounded-full flex items-center gap-2 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm font-medium text-slate-300">Available for highly impactful roles</span>
            </div>
          </motion.div>

          {/* Main Typography */}
          <motion.h1 variants={textVariants} className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-4">
            <span className="text-white">Saim </span>
            <span className="relative">
              <span className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-2xl opacity-40 animate-pulse" />
              <span className="relative bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Asif.
              </span>
            </span>
          </motion.h1>

          <motion.p variants={textVariants} className="text-xl md:text-2xl text-slate-400 max-w-2xl mt-6 font-light leading-relaxed">
            Architecting intelligent systems. Full Stack Engineer specializing in Next.js, Node, and High-Performance AI Integrations.
          </motion.p>

          <motion.div variants={textVariants} className="flex flex-wrap items-center justify-center gap-4 mt-12">
            <a href="#projects" className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-slate-200 transition-colors duration-300 flex items-center gap-2">
              View Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a href="#contact" className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-colors duration-300 backdrop-blur-md">
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating 3D Elements (CSS Only) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ y: [-20, 20], rotate: [0, 10] }} 
          transition={{ repeat: Infinity, duration: 6, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute top-1/4 left-[15%] w-32 h-32 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-transparent backdrop-blur-3xl shadow-2xl"
          style={{ transformStyle: 'preserve-3d', transform: 'rotateX(20deg) rotateY(-20deg)' }}
        />
        <motion.div 
          animate={{ y: [20, -20], rotate: [0, -10] }} 
          transition={{ repeat: Infinity, duration: 7, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute bottom-1/4 right-[15%] w-40 h-40 rounded-full border border-purple-500/20 bg-gradient-to-tl from-purple-500/10 to-transparent backdrop-blur-3xl shadow-[0_0_50px_rgba(168,85,247,0.15)]"
        />
      </div>
    </section>
  );
};

export default HeroSection;