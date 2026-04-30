import { useContext, useMemo, memo } from 'react';
import { motion } from 'motion/react';
import { ThemeContext } from '../context/ThemeContext';
import { FileText, Mail, ArrowDown } from 'lucide-react';
import { FaLinkedinIn, FaGithub, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import HeroThreeScene from './HeroThreeScene';
import './Hero.css';

const SOCIAL_LINKS = [
  { id: 1, name: 'GitHub', icon: <FaGithub size={20} />, url: 'https://github.com/vedantxy' },
  { id: 2, name: 'LinkedIn', icon: <FaLinkedinIn size={20} />, url: 'https://www.linkedin.com/in/vedant-patel-3b6a4636a/' },
  { id: 3, name: 'YouTube', icon: <FaYoutube size={20} />, url: 'https://www.youtube.com/@VedantPatel-y7k' },
  { id: 4, name: 'Twitter', icon: <FaXTwitter size={20} />, url: 'https://x.com/VedantPate1601' },
  { id: 5, name: 'LeetCode', icon: <SiLeetcode size={20} />, url: 'https://leetcode.com/u/Vedant_2403/' },
];

const Hero = memo(() => {
  const { isTransitioning } = useContext(ThemeContext);

  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };



  // Generate random particles for the Anti-Gravity effect
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      size: `${Math.random() * 4 + 2}px`
    }));
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen lg:h-screen w-full flex flex-col overflow-x-clip transition-colors duration-500 pb-20 lg:pb-0"
    >
      {/* Layered Background Elements are now handled by BackgroundSystem */}
      
      {/* ── Layered Background elements removed ── */}

      {/* ── Cyber Neon Aura (Preserved for Dark Mode Depth) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 dark:opacity-100 transition-opacity duration-1000">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-indigo-600/20 blur-[150px] rounded-full" 
        />
      </div>


      {/* ── Main Content Container ── */}
      <div className="relative z-10 max-w-[1200px] mx-auto w-full px-6 md:px-12 flex flex-col flex-1 py-10 md:py-20 justify-center min-h-screen">

        {/* ── Main Hero Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[80px] items-center">
          
          {/* LEFT: Text Content */}
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10 pt-4 lg:pt-0">
            
            {/* Location Tag */}


             {/* Heading Context */}
            <div className="w-full relative mb-8">
              <motion.div
                initial={{ opacity: 0, x: "-50%", y: 20 }}
                animate={{ opacity: 0.05, x: "-50%", y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="font-black leading-none tracking-tighter select-none pointer-events-none absolute top-0 left-1/2 uppercase whitespace-nowrap"
                style={{ 
                  fontSize: 'clamp(80px, 20vw, 280px)',
                  zIndex: -1,
                  color: 'var(--text-primary)',
                  transform: 'translateX(-50%)'
                }}
              >
                PATEL
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl sm:text-7xl md:text-[120px] lg:text-[140px] font-black tracking-tighter leading-[0.85] relative z-10 mt-20 sm:mt-40 md:mt-48 lg:mt-60"
                style={{ color: 'var(--text-primary)' }}
              >
                Vedant
              </motion.h1>
            </div>

            {/* Subheading & Desc */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col w-full"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight mb-4" style={{ color: 'var(--text-secondary)' }}>
                Full Stack Developer.
              </h2>
              <p className="font-normal text-base sm:text-lg max-w-[500px] leading-relaxed mb-8 mx-auto lg:mx-0" style={{ color: 'var(--text-muted)' }}>
                I build modern, scalable and high-performance web applications.
              </p>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center lg:justify-start gap-4 mb-8"
            >
              {SOCIAL_LINKS.map((link) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic="true"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-white border border-slate-100 text-slate-500 hover:text-slate-900 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>

            {/* CTA's */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 w-full px-4 sm:px-0 mt-4 md:mt-0"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                data-magnetic="true"
                data-cursor-text="Resume"
                onClick={() => window.open('https://drive.google.com/uc?export=download&id=1YFi7wZHKKj8DRVWcL4FBWq8gsH5BHpFS', '_blank')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-sky-400 text-white font-bold text-sm transition-all shadow-[0_8px_20px_rgba(59,130,246,0.25)] hover:shadow-[0_12px_24px_rgba(59,130,246,0.35)] flex items-center justify-center gap-2"
              >
                <FileText size={18} />
                View Resume
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                data-magnetic="true"
                data-cursor-text="Contact"
                onClick={() => handleScrollTo('contact')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-slate-200 text-slate-600 font-bold text-sm hover:border-slate-300 transition-colors bg-white/60 flex items-center justify-center gap-2"
              >
                <Mail size={18} />
                Contact Me
              </motion.button>
            </motion.div>

          </div>

          {/* RIGHT: Visual Element (3D Scene + Profile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 flex items-center justify-center relative mt-28 mb-4 lg:mt-0 lg:mb-0 lg:translate-x-20 xl:translate-x-32"
          >
            {/* 3D Background Scene */}
            <div className="absolute inset-0 z-0 w-[140%] h-[140%] sm:w-[120%] sm:h-[120%] -translate-x-[20%] -translate-y-[20%] sm:-translate-x-[10%] sm:-translate-y-[10%] opacity-40 dark:opacity-60 pointer-events-none">
              <HeroThreeScene />
            </div>

            {/* Profile Image Container (Floating over 3D) */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[420px] md:h-[420px] rounded-full flex items-center justify-center p-1"
            >
              {/* Animated Glowing Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 animate-spin-slow opacity-60 blur-sm" />
              
              <div className="relative w-full h-full rounded-full p-2 bg-white/10 backdrop-blur-3xl border border-white/30 shadow-[0_30px_100px_rgba(0,0,0,0.2)] flex items-center justify-center overflow-hidden">
                <div className="w-full h-full rounded-full overflow-hidden relative group bg-black/5 border-2 border-white">
                  <img
                    src="/hero-photo.jpg"
                    alt="Vedant Patel"
                    fetchPriority="high"
                    width="600"
                    height="600"
                    loading="eager"
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000 hover:scale-110"
                  />
                  
                  {/* Subtle Overlay Glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </div>
              </div>

              {/* Orbital Glow Dots */}
              <div className="absolute -top-4 right-[20%] w-3 h-3 bg-blue-400 rounded-full blur-sm animate-pulse" />
              <div className="absolute bottom-[10%] -left-2 w-4 h-4 bg-purple-400 rounded-full blur-md animate-pulse delay-700" />
            </motion.div>

            {/* Geometric Accents (Newspaper style details) */}
            <div className="absolute -top-6 -right-6 w-24 h-24 border-t-2 border-r-2 border-slate-900/10 dark:border-white/10 pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-slate-900/10 dark:border-white/10 pointer-events-none" />
          </motion.div>

        </div>

        {/* Bottom Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="hidden sm:flex absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-3 cursor-pointer z-20 group"
          onClick={() => handleScrollTo('about')}
        >
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400 group-hover:text-slate-600 transition-colors">
            Discover
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex justify-center p-1.5 transition-colors group-hover:border-slate-400">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full bg-slate-400 group-hover:bg-slate-600"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
});

export default Hero;