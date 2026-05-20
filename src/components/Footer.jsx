import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, memo } from 'react';
import { Github, Linkedin, Twitter, ArrowUp, Youtube } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';

const NAV_ITEMS = [
  'Home', 'About', 'Skills', 'Projects', 'Hackathon', 'Education', 'Achievements', 'Certificates', 'Resume', 'Contact'
];

const Footer = memo(() => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Track scroll position to show back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = elementPosition - offset - startPosition;
    const duration = 500;
    let start = null;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animation = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      window.scrollTo(0, startPosition + distance * easeOutCubic(percentage));
      if (percentage < 1) window.requestAnimationFrame(animation);
    };

    window.requestAnimationFrame(animation);
  };

  const handleNavClick = (e, item) => {
    e.preventDefault();
    const sectionId = item === 'Home' ? 'home' : item.toLowerCase();
    scrollToSection(sectionId);
  };

  const handleScrollToTop = () => {
    const startPosition = window.scrollY;
    const duration = 600;
    let start = null;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animation = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      window.scrollTo(0, startPosition - startPosition * easeOutCubic(percentage));
      if (percentage < 1) window.requestAnimationFrame(animation);
    };

    window.requestAnimationFrame(animation);
  };

  return (
    <footer className="relative mt-20 pt-16 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
      {/* Decorative Atmospheric Radial Gradients */}
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12">
          
          {/* Column 1: Brand & Philosophy */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center group cursor-pointer" onClick={(e) => handleNavClick(e, 'Home')}>
              <span className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Vedant<span className="text-indigo-500 font-extrabold ml-0.5">.</span>
              </span>
            </div>
            <p className="text-sm font-medium leading-relaxed opacity-70 max-w-[280px]" style={{ color: 'var(--text-primary)' }}>
              Building practical, high-performance digital products with clean code and intentional UX.
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mt-0.5" style={{ color: 'var(--text-primary)' }}>
              ALWAYS LEARNING. ALWAYS BUILDING.
            </p>
          </div>

          {/* Column 2: Explore Navigation */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] opacity-50" style={{ color: 'var(--text-primary)' }}>
              Explore
            </h4>
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href={`#${item === 'Home' ? 'home' : item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, item)}
                  className="text-sm font-semibold opacity-60 hover:opacity-100 hover:text-indigo-500 transition-all duration-300 w-fit flex items-center gap-1.5 group"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Connect details */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] opacity-50" style={{ color: 'var(--text-primary)' }}>
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:vedantpatelxy12@gmail.com"
                className="text-sm font-semibold opacity-60 hover:opacity-100 hover:text-indigo-500 transition-all duration-300 w-fit"
                style={{ color: 'var(--text-primary)' }}
              >
                vedantpatelxy12@gmail.com
              </a>
              <span
                className="text-sm font-semibold opacity-60"
                style={{ color: 'var(--text-primary)' }}
              >
                Gujarat, India
              </span>
            </div>
          </div>

          {/* Column 4: Social Links (Follow Me) */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] opacity-50" style={{ color: 'var(--text-primary)' }}>
              Follow Me
            </h4>
            <div className="flex gap-3 flex-wrap">
              <SocialIcon icon={<Github size={18} />} url="https://github.com/vedantxy" />
              <SocialIcon icon={<Linkedin size={18} />} url="https://www.linkedin.com/in/vedant-patel-3b6a4636a/" />
              <SocialIcon icon={<SiLeetcode size={18} />} url="https://leetcode.com/u/Vedant_2403/" />
              <SocialIcon icon={<Youtube size={18} />} url="https://www.youtube.com/@VedantPatel-y7k" />
              <SocialIcon icon={<Twitter size={18} />} url="https://x.com/VedantPate1601" />
            </div>
          </div>
        </div>

        {/* Bottom copyright details */}
        <div className="border-t mt-12 pt-8 flex items-center justify-center" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs font-medium opacity-50 text-center tracking-wide" style={{ color: 'var(--text-primary)' }}>
            © {new Date().getFullYear()} Vedant Patel. All rights reserved.
          </p>
        </div>
      </div>

      {/* Floating Scroll Top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={handleScrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white shadow-2xl z-[40] cursor-pointer shadow-indigo-500/30 border border-indigo-400/20"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
});

function SocialIcon({ icon, url }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -3, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 bg-[var(--bg-primary)] border-[var(--border)] text-[var(--text-secondary)] hover:text-indigo-600 dark:hover:text-white hover:border-indigo-500/30 dark:hover:border-indigo-500/30"
    >
      {icon}
    </motion.a>
  );
}

SocialIcon.displayName = 'SocialIcon';
Footer.displayName = 'Footer';

export default Footer;
