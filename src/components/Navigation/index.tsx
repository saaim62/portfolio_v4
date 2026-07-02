'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'py-4 backdrop-blur-xl bg-black/40 border-b border-white/10 shadow-lg shadow-black/20'
          : 'py-6 backdrop-blur-md bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="#hero"
            className="group flex items-center gap-2 text-xl font-bold tracking-tight text-white hover:text-emerald-400 transition-colors duration-300"
          >
            <span className="relative">
              <span className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></span>
              <span className="relative">SAIM ASIF</span>
            </span>
            <span className="text-xs font-medium text-white/50 ml-1 hidden sm:inline-block">
              | Full Stack & AI Engineer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {/* CTA Button */}
            <Link
              href="#contact"
              className="relative px-5 py-2.5 text-sm font-semibold text-white rounded-lg overflow-hidden group bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-2">
                Get in Touch
                <Mail className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-white/70 hover:text-emerald-400 transition-colors duration-300 py-2"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 px-5 py-3 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 text-center shadow-lg shadow-emerald-500/20"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;