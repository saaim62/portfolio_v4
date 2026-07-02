'use client';

import NavigationBar from '../components/NavigationBar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsGallery from '../components/ProjectsGallery';
import ContactForm from '../components/ContactForm';
import StatsCards from '../components/StatsCards';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 selection:bg-indigo-500/30 selection:text-white">
      {/* Navigation */}
      <NavigationBar />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats/Metrics Section */}
      <div className="py-12 bg-[#0a0a0f]">
        <StatsCards />
      </div>

      {/* About Section (Includes Skills & Experience) */}
      <AboutSection />

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-12 text-center">
            Featured <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <ProjectsGallery />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#0a0a0f]">
        <div className="max-w-4xl mx-auto px-6">
           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-center">
            Get In <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Interested in collaborating or have a project in mind? Feel free to reach out. I'm currently open to new opportunities and interesting challenges.
          </p>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/[0.05] bg-[#0a0a0f]">
        <p>© {new Date().getFullYear()} Saim Asif. All rights reserved.</p>
        <p className="mt-2">Built with Next.js, Framer Motion & Tailwind CSS v4</p>
      </footer>
    </div>
  );
}