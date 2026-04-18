import { useContext } from 'react';
import { motion } from 'motion/react';
import { ThemeContext } from '../context/ThemeContext';
import { FileText, Mail, ArrowDown } from 'lucide-react';
import { FaLinkedinIn, FaGithub, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';

export default function Hero() {
  const { isTransitioning } = useContext(ThemeContext);

  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    { id: 1, name: 'GitHub', icon: <FaGithub size={20} />, url: 'https://github.com/vedantxy' },
    { id: 2, name: 'LinkedIn', icon: <FaLinkedinIn size={20} />, url: 'https://www.linkedin.com/in/vedant-patel-3b6a4636a/' },
    { id: 3, name: 'YouTube', icon: <FaYoutube size={20} />, url: 'https://www.youtube.com/@VedantPatel-y7k' },
    { id: 4, name: 'Twitter', icon: <FaXTwitter size={20} />, url: 'https://x.com/VedantPate1601' },
    { id: 5, name: 'LeetCode', icon: <SiLeetcode size={20} />, url: 'https://leetcode.com/u/Vedant_2403/' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col overflow-x-clip transition-colors duration-500"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* ── Cyber Neon Aura (Only in dark) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 dark:opacity-100 transition-opacity duration-1000">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-indigo-600/30 blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-purple-600/20 blur-[150px] rounded-full" 
        />
      </div>

      {/* Decorative partial ring (Top Left) */}
      <div className="absolute left-0 top-20 -translate-x-1/2 w-32 h-32 rounded-full border border-[var(--border)] opacity-40 pointer-events-none z-0" />

      {/* ── Background Grid ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '96px 96px',
        }}
      />



      {/* ── Main Content Container ── */}
      <div className="relative z-10 max-w-[1200px] mx-auto w-full px-6 md:px-12 flex flex-col flex-1 pt-4 pb-10 md:py-20 justify-center min-h-screen">

        {/* ── Main Hero Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-[80px] items-center">
          
          {/* LEFT: Text Content */}
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Location Tag */}


             {/* Heading Context */}
            <div className="w-full relative mb-8">
              <motion.div
                initial={{ opacity: 0, x: "-50%", y: 20 }}
                animate={{ opacity: 0.1, x: "-50%", y: 0 }}
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
                className="text-8xl md:text-[140px] font-black tracking-tighter leading-[0.85] relative z-10 mt-16 md:mt-60"
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
              <h2 className="text-xl md:text-2xl font-medium tracking-tight mb-4" style={{ color: 'var(--text-secondary)' }}>
                Full Stack Developer.
              </h2>
              <p className="font-normal text-lg max-w-[500px] leading-relaxed mb-8 mx-auto lg:mx-0" style={{ color: 'var(--text-muted)' }}>
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
              {socialLinks.map((link) => (
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
              className="flex flex-row items-center justify-center lg:justify-start gap-4 w-full"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                data-magnetic="true"
                data-cursor-text="Resume"
                onClick={() => window.open('https://drive.google.com/uc?export=download&id=1YFi7wZHKKj8DRVWcL4FBWq8gsH5BHpFS', '_blank')}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-sky-400 text-white font-bold text-sm transition-all shadow-[0_8px_20px_rgba(59,130,246,0.25)] hover:shadow-[0_12px_24px_rgba(59,130,246,0.35)] flex items-center gap-2"
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
                className="px-8 py-3.5 rounded-full border border-slate-200 text-slate-600 font-bold text-sm hover:border-slate-300 transition-colors bg-white/60 flex items-center gap-2"
              >
                <Mail size={18} />
                Contact Me
              </motion.button>
            </motion.div>

          </div>

          {/* RIGHT: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 flex items-center justify-center lg:justify-end relative mt-0 lg:translate-x-48"
          >
            {/* Outer Soft Glow */}
            <div className="absolute w-[350px] h-[350px] md:w-[480px] md:h-[480px] rounded-full bg-blue-100/60 blur-[80px] z-0" />
            
            {/* Image Container (Double Ring) */}
            <div className="relative z-10 w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full p-2.5 bg-white/80 backdrop-blur-md border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.08)] flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden border border-slate-100 relative group bg-white shadow-inner">
                <img
                  src="/hero-photo.jpg"
                  alt="Vedant Patel"
                  fetchPriority="high"
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
          onClick={() => handleScrollTo('about')}
        >
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400">
            Scroll to discover
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-slate-500"
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}