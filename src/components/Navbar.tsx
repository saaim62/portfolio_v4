"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('#hero');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Handle scroll effect for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const sections = navItems.map((item) => item.href.replace('#', ''));
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Trap focus within mobile menu when open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Focus first link in mobile menu
      const firstLink = navRef.current?.querySelector('a');
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = (): void => {
    setIsMenuOpen((prev) => !prev);
  };

  // High contrast colors for accessibility (WCAG AA compliant)
  const colors = {
    bg: isScrolled ? '#0a0a0a' : 'transparent',
    bgMobile: '#0a0a0a',
    text: '#ffffff',
    textSecondary: '#e5e5e5',
    accent: '#60a5fa', // Bright blue for high contrast
    focusRing: '#3b82f6',
    hoverBg: 'rgba(96, 165, 250, 0.1)',
    border: 'rgba(255, 255, 255, 0.1)',
  };

  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      {/* Navigation bar */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#0a0a0a] shadow-lg' : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <Link
              href="#hero"
              className="text-xl font-bold text-white hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded-md px-2 py-1"
              aria-label="Saim Asif - Home"
            >
              <span className="text-blue-400">SAIM</span>
              <span className="text-white">ASIF</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded-md px-3 py-2 ${
                      isActive
                        ? 'text-blue-400'
                        : 'text-gray-300 hover:text-white'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                    tabIndex={0}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <button
              ref={menuButtonRef}
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={toggleMenu}
            >
              <span className="sr-only">
                {isMenuOpen ? 'Close menu' : 'Open menu'}
              </span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden bg-[#0a0a0a] border-t border-gray-800`}
          role="menu"
          aria-label="Mobile navigation"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset ${
                    isActive
                      ? 'text-blue-400 bg-gray-800'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                  tabIndex={isMenuOpen ? 0 : -1}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;