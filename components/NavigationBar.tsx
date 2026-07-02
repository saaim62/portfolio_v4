'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

interface MagneticNavItemProps {
  children: React.ReactNode;
  href: string;
  isActive?: boolean;
}

const MagneticNavItem: React.FC<MagneticNavItemProps> = ({ children, href, isActive }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    x.set(mouseX * 0.3);
    y.set(mouseY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`relative px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-300 rounded-full ${
        isActive
          ? 'text-white'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      {isActive && (
        <motion.span
          layoutId="activeNav"
          className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full border border-white/10"
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
};

interface NavSectionProps {
  label: string;
  href: string;
  isActive: boolean;
}

const NavSection: React.FC<NavSectionProps> = ({ label, href, isActive }) => (
  <MagneticNavItem href={href} isActive={isActive}>
    {label}
  </MagneticNavItem>
);

export default function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'contact'];
    const handleScrollDetect = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScrollDetect);
    return () => window.removeEventListener('scroll', handleScrollDetect);
  }, []);

  const navLinks: NavSectionProps[] = [
    { label: 'Home', href: '#hero', isActive: activeSection === 'hero' },
    { label: 'About', href: '#about', isActive: activeSection === 'about' },
    { label: 'Projects', href: '#projects', isActive: activeSection === 'projects' },
    { label: 'Contact', href: '#contact', isActive: activeSection === 'contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-20 py-4 ${
          isScrolled
            ? 'bg-black/40 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <motion.a
          href="#hero"
          className="relative group flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', damping: 20, stiffness: 400 }}
        >
          <motion.div
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/80 to-fuchsia-500/80 backdrop-blur-md border border-white/10 flex items-center justify-center"
            whileHover={{ rotate: 6, scale: 1.1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <span className="text-white font-bold text-lg">SA</span>
          </motion.div>
          <div className="hidden sm:block">
            <span className="text-white font-semibold text-lg tracking-tight">Saim Asif</span>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 -mt-0.5 ml-1">
              AI Fullstack Engineer
            </span>
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavSection key={link.href} {...link} />
          ))}
        </div>

        {/* CTA Button - Desktop */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.a
            href="#contact"
            className="relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white rounded-full overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute inset-0 bg-gradient-to-r from-violet-600/50 to-fuchsia-600/50 backdrop-blur-sm rounded-full border border-white/10" />
            <span className="relative z-10 flex items-center gap-2">
              Let&apos;s Talk
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', damping: 15, stiffness: 300 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
          </motion.a>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <motion.button
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-md border border-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div className="relative w-5 h-4">
            <motion.span
              className="absolute left-0 w-full h-0.5 bg-white rounded-full"
              animate={{
                top: mobileMenuOpen ? '50%' : '0%',
                rotate: mobileMenuOpen ? 45 : 0,
                width: mobileMenuOpen ? '100%' : '80%',
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="absolute left-0 w-[80%] h-0.5 bg-white rounded-full"
              animate={{
                opacity: mobileMenuOpen ? 0 : 1,
                width: mobileMenuOpen ? '0%' : '80%',
              }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="absolute left-0 w-full h-0.5 bg-white rounded-full"
              animate={{
                top: mobileMenuOpen ? '50%' : '100%',
                rotate: mobileMenuOpen ? -45 : 0,
                width: mobileMenuOpen ? '100%' : '80%',
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        </motion.button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-black/80 backdrop-blur-xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-black/60 backdrop-blur-2xl border-l border-white/5 p-8 flex flex-col justify-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-8">
                <span className="text-white font-semibold text-xl">Saim Asif</span>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 -mt-0.5 ml-1">
                  AI Fullstack Engineer
                </span>
              </div>

              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 60, opacity: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative block px-5 py-4 text-lg font-medium rounded-2xl transition-all duration-300 ${
                    link.isActive
                      ? 'text-white bg-white/10 border border-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 60, opacity: 0 }}
                transition={{ delay: navLinks.length * 0.08 + 0.1, duration: 0.4 }}
                className="mt-6"
              >
                <motion.a
                  href="#contact"
                  className="relative inline-flex items-center justify-center gap-2 w-full px-6 py-4 text-base font-medium text-white rounded-2xl overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600" />
                  <span className="relative z-10">Get in Touch</span>
                </motion.a>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: navLinks.length * 0.08 + 0.2, duration: 0.4 }}
                className="mt-12 pt-6 border-t border-white/5 space-y-3"
              >
                <a href="mailto:saim62@gmail.com" className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">saim62@gmail.com</span>
                </a>
                <a href="tel:+923206090154" className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm">+92 320 6090154</span>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Glass Pill - Scroll Progress Indicator */}
      <motion.div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: isScrolled ? 1 : 0, y: isScrolled ? 0 : 40 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 px-4 py-2.5 bg-black/50 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl shadow-black/30">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                link.isActive ? 'bg-white' : 'bg-white/20'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
}