import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../hooks/useTheme';
import React, { memo } from 'react';

const NAV_ITEMS = [
  'Home', 'About', 'Skills', 'Projects', 'Hackathon', 'Education', 'Achievements', 'Certificates', 'Resume', 'Contact'
];

const Navbar = memo(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const { scrollY } = useScroll();

  // Dynamic transforms for premium feel
  const { theme } = useTheme();
  const navPadding = useTransform(scrollY, [0, 50], ['20px', '12px']);
  const navBg = useTransform(scrollY, [0, 50], [
    'rgba(248, 250, 252, 0)', 
    theme === 'dark' ? 'rgba(7, 11, 20, 0.92)' : 'rgba(248, 250, 252, 0.88)'
  ]);
  const navBorderColor = useTransform(scrollY, [0, 50], [
    'rgba(226, 232, 240, 0)', 
    theme === 'dark' ? 'rgba(129, 140, 248, 0.25)' : 'rgba(226, 232, 240, 0.4)'
  ]);
  const navShadow = useTransform(scrollY, [0, 50], [
    '0px 0px 0px rgba(0,0,0,0)', 
    theme === 'dark' 
      ? '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(129,140,248,0.08)' 
      : '0 8px 30px rgba(15,23,42,0.05)'
  ]);



  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY + 120;
          let currentSection = 'Home';
          
          for (const item of NAV_ITEMS) {
            const id = item === 'Home' ? 'home' : item.toLowerCase();
            const section = document.getElementById(id);
            if (section) {
              const top = section.offsetTop;
              const height = section.offsetHeight;
              if (scrollPos >= top && scrollPos < top + height) {
                currentSection = item;
              }
            }
          }
          
          if (currentSection !== activeItem) {
            setActiveItem(currentSection);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeItem]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const offset = 80; // Navbar height offset
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = elementPosition - offset - startPosition;
    const duration = 400; // Fast and snappy
    let start = null;

    // Ease out cubic
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animation = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      
      window.scrollTo(0, startPosition + distance * easeOutCubic(percentage));

      if (percentage < 1) {
        window.requestAnimationFrame(animation);
      }
    };

    window.requestAnimationFrame(animation);
  };

  const handleNavClick = (e, item) => {
    e.preventDefault();
    const sectionId = item === 'Home' ? 'home' : item.toLowerCase();
    
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    
    // Use custom scroll instead of direct navigation
    scrollToSection(sectionId);
    
    // Update active item immediately for perceived speed
    setActiveItem(item);
  };

  return (
    <>
      <motion.nav
        style={{ 
          paddingTop: navPadding, 
          paddingBottom: navPadding,
          background: navBg,
          backdropFilter: 'blur(20px)',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          borderBottomColor: navBorderColor,
          boxShadow: navShadow
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 lg:px-16"
      >
        <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between">
          
          {/* ── Hyper-Premium Brand Logo ── */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={(e) => handleNavClick(e, 'Home')}
            className="cursor-pointer flex items-center group"
          >
            {/* Custom SVG 'V' Logo - Refined to match image */}
            <svg width="45" height="45" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-11 h-11 -mr-2">
              {/* Left Stroke */}
              <path 
                d="M22 25L50 75" 
                stroke="url(#v-gradient-left)" 
                strokeWidth="18" 
                strokeLinecap="round" 
              />
              {/* Right Stroke */}
              <path 
                d="M78 25L50 75" 
                stroke="url(#v-gradient-right)" 
                strokeWidth="18" 
                strokeLinecap="round" 
              />
              <defs>
                <linearGradient id="v-gradient-left" x1="22" y1="25" x2="50" y2="75" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#a855f7" />
                </linearGradient>
                <linearGradient id="v-gradient-right" x1="78" y1="25" x2="50" y2="75" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#2563eb" />
                </linearGradient>
              </defs>
            </svg>

            <span className="text-4xl font-black tracking-tighter transition-colors flex items-center" style={{ color: 'var(--text-primary)' }}>
              edant<span className="inline-block w-3 h-3 rounded-full ml-1 bg-gradient-to-tr from-indigo-600 to-purple-500 shadow-sm self-end mb-1.5" />
            </span>
          </motion.div>

          {/* ── Center Navigation (Stripe Style) ── */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 px-1.5 py-1.5 rounded-full border shadow-inner" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, item)}
                className="relative px-4 py-2 text-[13px] font-bold tracking-tight transition-colors duration-300"
                style={{ color: activeItem === item ? 'var(--text-primary)' : 'var(--text-muted)' }}
              >
                <span className="relative z-10">{item}</span>
                {activeItem === item && (
                  <motion.div
                    layoutId="activeBubble"
                    className="absolute inset-0 rounded-full shadow-sm border"
                    style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {/* Hover Indicator */}
                <span className="absolute inset-0 rounded-full bg-[var(--accent-10)] opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ))}
          </div>

          {/* ── Actions (Toggle + Hire) ── */}
          <div className="flex items-center gap-3 md:gap-4">
            <ThemeToggle />
            


            {/* ── Mobile Trigger ── */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-2xl border shadow-sm overflow-hidden relative"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

        </div>

        {/* ── Mobile Menu (Full Overlay) ── */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden absolute top-full left-0 w-full backdrop-blur-3xl border-b p-6 shadow-2xl overflow-hidden"
              style={{ background: 'var(--glass-bg)', borderColor: 'var(--border)' }}
            >
              <div className="grid grid-cols-2 gap-3">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item}
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    onClick={(e) => handleNavClick(e, item)}
                    className="flex items-center justify-between p-4 rounded-2xl border transition-all"
                    style={{ 
                      background: activeItem === item ? 'var(--text-primary)' : 'var(--bg-card)', 
                      borderColor: activeItem === item ? 'var(--text-primary)' : 'var(--border)', 
                      color: activeItem === item ? 'var(--bg-primary)' : 'var(--text-secondary)' 
                    }}
                  >
                    <span className="font-bold text-sm uppercase tracking-widest">{item}</span>
                    <ArrowRight size={14} className={activeItem === item ? 'opacity-100' : 'opacity-20'} />
                  </Link>
                ))}
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;