import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../hooks/useTheme';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  // Dynamic transforms for premium feel
  const { theme } = useTheme();
  const navPadding = useTransform(scrollY, [0, 50], ['20px', '12px']);
  const navBg = useTransform(scrollY, [0, 50], ['rgba(0,0,0,0)', theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(248, 250, 252, 0.8)']);
  const navBorderColor = useTransform(scrollY, [0, 50], ['rgba(0, 0, 0, 0)', 'var(--border)']);
  const navShadow = useTransform(scrollY, [0, 50], ['none', 'var(--glow)']);

  const navItems = [
    'Home', 'About', 'Skills', 'Projects', 'Education', 'Achievements', 'Certificates', 'Hackathon', 'Resume', 'Contact'
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Modern active section detection
      const scrollPos = window.scrollY + 100;
      for (const item of navItems) {
        const id = item === 'Home' ? 'home' : item.toLowerCase();
        const section = document.getElementById(id);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveItem(item);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const handleNavClick = (e, item) => {
    e.preventDefault();
    const route = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
    
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    
    navigate(route);
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
            whileHover={{ scale: 1.02 }}
            onClick={(e) => handleNavClick(e, 'Home')}
            className="cursor-pointer group flex items-center gap-4"
          >
            {/* 3D Abstract Icon */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              {/* Neon Glow Rings */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-[-4px] bg-indigo-500/20 rounded-[18px] blur-md" 
              />
              
              {/* Outer Shell */}
              <motion.div 
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 rounded-[16px] shadow-[0_10px_30px_rgba(79,70,229,0.3),inset_0_2px_4px_rgba(255,255,255,0.3)]" 
              />
              
              {/* Inner Glass Layer */}
              <div className="absolute inset-[3px] bg-white/10 backdrop-blur-[2px] rounded-[13px] border border-white/20" />
              
              {/* Glowing "V" Initial */}
              <span className="relative z-10 text-white font-black text-2xl italic tracking-tighter drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]">
                V
              </span>
            </div>

            {/* Premium Typography */}
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-[-0.04em] leading-none" style={{ color: 'var(--text-primary)' }}>
                PATEL<span style={{ color: 'var(--accent)' }}>.</span>
              </span>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-[1px] w-4" style={{ background: 'var(--accent-30)' }} />
                <span className="text-[9px] font-black tracking-[0.4em] uppercase opacity-70" style={{ color: 'var(--text-muted)' }}>
                  Dev Portfolio
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Center Navigation (Stripe Style) ── */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 px-1.5 py-1.5 rounded-full border shadow-inner" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
            {navItems.map((item) => (
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
            
            <div className="hidden lg:flex items-center">
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => handleNavClick(e, 'Contact')}
                className="relative group px-8 py-3 rounded-full text-white font-bold text-sm overflow-hidden"
                style={{ background: 'var(--text-primary)' }}
              >
                {/* Gradient Aura */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex items-center gap-2">
                  <span style={{ color: 'var(--bg-primary)' }}>Hire Me</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" style={{ color: 'var(--bg-primary)' }} />
                </div>
                
                {/* Glow Blur Effect */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[80%] h-10 bg-blue-500/40 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
              </motion.button>
            </div>

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
                {navItems.map((item) => (
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
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full mt-6 py-5 rounded-2xl text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20"
                style={{ background: 'var(--accent)' }}
                onClick={(e) => handleNavClick(e, 'Contact')}
              >
                Launch Project
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

export default Navbar;