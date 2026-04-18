import { useContext } from 'react';
import { motion } from 'motion/react';
import { ThemeContext } from '../context/ThemeContext';
import { FileText, Mail, ArrowDown } from 'lucide-react';
import { FaLinkedinIn, FaGithub, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';

export default function Hero() {
  const { theme } = useContext(ThemeContext);

  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    { id: 1, name: 'GitHub', icon: <FaGithub size={18} />, url: 'https://github.com/vedantxy' },
    { id: 2, name: 'LinkedIn', icon: <FaLinkedinIn size={18} />, url: 'https://www.linkedin.com/in/vedant-patel-3b6a4636a/' },
    { id: 3, name: 'YouTube', icon: <FaYoutube size={18} />, url: 'https://www.youtube.com/@VedantPatel-y7k' },
    { id: 4, name: 'Twitter', icon: <FaXTwitter size={18} />, url: 'https://x.com/VedantPate1601' },
    { id: 5, name: 'LeetCode', icon: <SiLeetcode size={18} />, url: 'https://leetcode.com/u/Vedant_2403/' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* ── Background Grid & Gradients ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]" 
          style={{ backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      {/* ── Container ── */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[clamp(1rem,5vw,2.5rem)] flex flex-col flex-1 justify-center py-[clamp(2rem,8vw,5rem)]">
        
        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-[clamp(2.5rem,6vw,6rem)]">
          
          {/* PROFILE IMAGE (Fluid Scaling) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 relative"
          >
            <div 
              className="relative z-10 rounded-full border-[clamp(4px,1vw,10px)] border-white/50 dark:border-white/10 shadow-2xl overflow-hidden group transition-all duration-500"
              style={{ 
                width: 'clamp(200px, 40vw, 420px)', 
                height: 'clamp(200px, 40vw, 420px)' 
              }}
            >
              <img
                src="/hero-photo.jpg"
                alt="Vedant Patel"
                fetchPriority="high"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            {/* Glow Aura */}
            <div className="absolute inset-x-0 bottom-0 bg-blue-400/20 blur-[60px] h-1/2 rounded-full -z-10 animate-pulse" />
          </motion.div>

          {/* TEXT CONTENT */}
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left relative">
            
            {/* Watermark "PATEL" (Fixed Overflow issues) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.08, x: 0 }}
              className="absolute -top-[clamp(1.5rem,8vw,5rem)] left-0 lg:-left-12 font-black tracking-tighter pointer-events-none select-none whitespace-nowrap"
              style={{ fontSize: 'clamp(4rem, 16vw, 13rem)', color: 'var(--text-primary)' }}
            >
              PATEL
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-black tracking-tighter leading-none mb-4"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 9.5rem)', color: 'var(--text-primary)' }}
            >
              Vedant
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-bold tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: 'var(--accent)' }}
            >
              Full Stack Developer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-[550px] mb-10 leading-relaxed opacity-70"
              style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', color: 'var(--text-secondary)' }}
            >
              Engineering high-performance, visually stunning web experiences with modern frameworks, scalable architectures, and pixel-perfect design.
            </motion.p>

            {/* Social Icons (Responsive Wrap) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-[clamp(0.8rem,2vw,1.2rem)] mb-10"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[clamp(42px,5vw,52px)] h-[clamp(42px,5vw,52px)] flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all text-[var(--text-primary)]"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={() => window.open('https://drive.google.com/uc?export=download&id=1YFi7wZHKKj8DRVWcL4FBWq8gsH5BHpFS', '_blank')}
                className="px-[clamp(1.8rem,4vw,2.8rem)] py-[clamp(0.9rem,1.8vw,1.1rem)] rounded-2xl bg-blue-600 text-white font-bold transition-all hover:scale-[1.03] active:scale-95 shadow-xl shadow-blue-500/25 flex items-center gap-3"
                style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}
              >
                <FileText size={18} /> View Resume
              </button>
              <button
                onClick={() => handleScrollTo('contact')}
                className="px-[clamp(1.8rem,4vw,2.8rem)] py-[clamp(0.9rem,1.8vw,1.1rem)] rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-bold flex items-center gap-3 active:scale-95"
                style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)', color: 'var(--text-primary)' }}
              >
                <Mail size={18} /> Contact Me
              </button>
            </motion.div>

          </div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer"
          onClick={() => handleScrollTo('about')}
        >
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-40">Explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-blue-500"
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}