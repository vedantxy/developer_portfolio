import { memo } from 'react';
import { motion } from 'motion/react';
import { FileText, Mail } from 'lucide-react';
import { FaLinkedinIn, FaGithub, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import HeroThreeScene from './HeroThreeScene';
import './Hero.css';

const SOCIAL_LINKS = [
  { id: 1, name: 'GitHub',   icon: <FaGithub size={18} />,   url: 'https://github.com/vedantxy',                                     color: '#818CF8' },
  { id: 2, name: 'LinkedIn', icon: <FaLinkedinIn size={18} />,url: 'https://www.linkedin.com/in/vedant-patel-3b6a4636a/',            color: '#38BDF8' },
  { id: 3, name: 'YouTube',  icon: <FaYoutube size={18} />,   url: 'https://www.youtube.com/@VedantPatel-y7k',                       color: '#F87171' },
  { id: 4, name: 'Twitter',  icon: <FaXTwitter size={18} />,  url: 'https://x.com/VedantPate1601',                                   color: '#94A3B8' },
  { id: 5, name: 'LeetCode', icon: <SiLeetcode size={18} />,  url: 'https://leetcode.com/u/Vedant_2403/',                            color: '#FBBF24' },
];

const Hero = memo(() => {
  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen lg:h-screen w-full flex flex-col overflow-x-clip transition-colors duration-500 pb-20 lg:pb-0"
    >
      {/* ── Animated Cyber Aura (dark mode) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 dark:opacity-100 transition-opacity duration-1000">
        <motion.div
          animate={{ scale: [1, 1.25, 1], rotate: [0, 120, 0], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[-15%] right-[-15%] w-[75vw] h-[75vw] rounded-full"
          style={{ background: 'radial-gradient(circle, #4F46E5 0%, #7C3AED 40%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full"
          style={{ background: 'radial-gradient(circle, #0EA5E9 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Main Content Container ── */}
      <div className="relative z-10 max-w-[1200px] mx-auto w-full px-6 md:px-12 flex flex-col flex-1 py-10 md:py-20 justify-center min-h-screen">

        {/* ── Main Hero Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[80px] items-center">

          {/* LEFT: Text Content */}
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10 pt-4 lg:pt-0">

            {/* ── Heading Watermark + Name ── */}
            <div className="w-full relative mb-8">
              <motion.div
                initial={{ opacity: 0, x: '-50%', y: 20 }}
                animate={{ opacity: 1, x: '-50%', y: 0 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="font-black leading-none tracking-tighter select-none pointer-events-none absolute top-0 left-1/2 uppercase whitespace-nowrap hero-watermark"
                style={{
                  fontSize: 'clamp(80px, 20vw, 280px)',
                  zIndex: -1,
                  transform: 'translateX(-50%)',
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

            {/* ── Subheading & Desc ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col w-full"
            >
              {/* Role badge */}
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border
                  bg-indigo-50 border-indigo-200 text-indigo-600
                  dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse" />
                  Available for Work
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-4 bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                Full Stack Developer.
              </h2>
              <p className="font-normal text-base sm:text-lg max-w-[460px] leading-relaxed mb-8 mx-auto lg:mx-0"
                style={{ color: 'var(--text-muted)' }}>
                I build modern, scalable and high-performance web applications with clean architecture.
              </p>
            </motion.div>

            {/* ── Social Icons (Premium Dark-mode aware) ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-8"
            >
              {SOCIAL_LINKS.map((link) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-text={link.name}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  className="
                    w-11 h-11 rounded-2xl flex items-center justify-center
                    transition-all duration-300 relative group
                    bg-slate-100 border border-slate-200 text-slate-500
                    hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800
                    hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]
                    dark:bg-white/5 dark:border-white/10 dark:text-slate-400
                    dark:hover:bg-white/10 dark:hover:border-white/20 dark:hover:text-white
                    dark:hover:shadow-[0_8px_32px_rgba(129,140,248,0.2)]
                  "
                  aria-label={link.name}
                  style={{ '--icon-glow': link.color }}
                >
                  {/* Glow on hover (dark mode) */}
                  <span
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:block hidden"
                    style={{ boxShadow: `0 0 20px ${link.color}30, inset 0 0 12px ${link.color}10` }}
                  />
                  <span className="relative z-10 group-hover:scale-110 transition-transform duration-200">
                    {link.icon}
                  </span>
                </motion.a>
              ))}
            </motion.div>

            {/* ── CTA Buttons ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full px-4 sm:px-0 mt-4 md:mt-0"
            >
              {/* Primary — View Resume */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                data-cursor-text="Resume"
                onClick={() => window.open('https://drive.google.com/file/d/11Bq7BQVkRGz1B9hu8DkeOuWN5KZFdFki/view?usp=sharing', '_blank')}
                className="
                  relative w-full sm:w-auto px-8 py-3.5 rounded-full
                  font-bold text-sm text-white overflow-hidden
                  flex items-center justify-center gap-2.5
                  bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600
                  shadow-[0_8px_24px_rgba(99,102,241,0.35)]
                  hover:shadow-[0_12px_32px_rgba(99,102,241,0.5)]
                  transition-shadow duration-300
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
                  before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700
                "
              >
                <FileText size={17} className="shrink-0" />
                View Resume
              </motion.button>

              {/* Secondary — Contact Me */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                data-cursor-text="Contact"
                onClick={() => handleScrollTo('contact')}
                className="
                  w-full sm:w-auto px-8 py-3.5 rounded-full
                  font-bold text-sm flex items-center justify-center gap-2.5
                  border transition-all duration-300
                  border-slate-300 text-slate-700 bg-white/70 backdrop-blur-sm
                  hover:border-indigo-400 hover:text-indigo-600 hover:bg-white
                  hover:shadow-[0_8px_24px_rgba(99,102,241,0.15)]
                  dark:border-white/15 dark:text-slate-200 dark:bg-white/5
                  dark:hover:border-indigo-500/60 dark:hover:text-indigo-300
                  dark:hover:bg-indigo-500/10
                  dark:hover:shadow-[0_8px_32px_rgba(129,140,248,0.2)]
                "
              >
                <Mail size={17} className="shrink-0" />
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
            <div className="absolute inset-0 z-0 w-[140%] h-[140%] sm:w-[120%] sm:h-[120%] -translate-x-[20%] -translate-y-[20%] sm:-translate-x-[10%] sm:-translate-y-[10%] opacity-40 dark:opacity-70 pointer-events-none">
              <HeroThreeScene />
            </div>

            {/* Profile Image Container */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[420px] md:h-[420px] rounded-full flex items-center justify-center p-1"
            >
              {/* Animated Glowing Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-violet-500 to-cyan-400 animate-spin-slow opacity-70 dark:opacity-80 blur-[2px]" />

              <div className="relative w-full h-full rounded-full p-2 bg-white/10 dark:bg-black/20 backdrop-blur-3xl border border-white/30 dark:border-indigo-500/20 shadow-[0_30px_100px_rgba(0,0,0,0.2)] dark:shadow-[0_30px_100px_rgba(99,102,241,0.15)] flex items-center justify-center overflow-hidden">
                <div className="w-full h-full rounded-full overflow-hidden relative group bg-black/5 border-2 border-white dark:border-indigo-900/40">
                  <img
                    src="/hero-photo.webp"
                    alt="Vedant Patel"
                    fetchPriority="high"
                    width="600"
                    height="600"
                    loading="eager"
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000 hover:scale-110"
                  />
                  {/* Overlay Glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </div>
              </div>

              {/* Orbital Glow Dots */}
              <div className="absolute -top-4 right-[20%] w-3 h-3 bg-indigo-400 dark:bg-indigo-300 rounded-full blur-sm animate-pulse" />
              <div className="absolute bottom-[10%] -left-2 w-4 h-4 bg-violet-400 dark:bg-violet-300 rounded-full blur-md animate-pulse delay-700" />
              <div className="absolute top-[30%] -right-3 w-2 h-2 bg-cyan-400 rounded-full blur-sm animate-pulse delay-1000 hidden dark:block" />
            </motion.div>

            {/* Geometric Accents */}
            <div className="absolute -top-6 -right-6 w-24 h-24 border-t-2 border-r-2 border-slate-900/10 dark:border-indigo-500/30 pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-slate-900/10 dark:border-violet-500/30 pointer-events-none" />
          </motion.div>

        </div>

        {/* ── Scroll Indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="hidden sm:flex absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-3 cursor-pointer z-20 group"
          onClick={() => handleScrollTo('about')}
        >
          <span className="text-[10px] font-black tracking-[0.4em] uppercase
            text-slate-400 group-hover:text-slate-600 transition-colors
            dark:text-slate-500 dark:group-hover:text-indigo-400">
            Discover
          </span>
          <div className="w-6 h-10 rounded-full border-2 flex justify-center p-1.5 transition-colors
            border-slate-300 group-hover:border-slate-400
            dark:border-indigo-500/40 dark:group-hover:border-indigo-400/70">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full
                bg-slate-400 group-hover:bg-slate-600
                dark:bg-indigo-400 dark:group-hover:bg-indigo-300"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;