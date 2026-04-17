import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const { scrollY } = useScroll();

  // Dynamic transforms for premium feel
  const navPadding = useTransform(scrollY, [0, 50], ['20px', '12px']);
  const navBg = useTransform(scrollY, [0, 50], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.7)']);
  const navBorder = useTransform(scrollY, [0, 50], ['rgba(0, 0, 0, 0)', '1px solid rgba(0, 0, 0, 0.05)']);
  const navShadow = useTransform(scrollY, [0, 50], ['none', '0 20px 40px rgba(0, 0, 0, 0.03)']);

  const navItems = [
    'Home', 'About', 'Skills', 'Projects', 'Education', 'Achievements', 'Certificates', 'Hackathon', 'Resume', 'Contact'
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Modern active section detection
      const scrollPos = window.scrollY + 100;
      for (const item of navItems) {
        const section = document.getElementById(item.toLowerCase());
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
    const section = document.getElementById(item.toLowerCase());
    if (section) {
      const offset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <motion.nav
        style={{ 
          paddingTop: navPadding, 
          paddingBottom: navPadding,
          background: navBg,
          backdropFilter: 'blur(20px)',
          borderBottom: navBorder,
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
              <span className="text-2xl font-black tracking-[-0.04em] text-slate-900 leading-none">
                PATEL<span className="text-indigo-600">.</span>
              </span>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-[1px] w-4 bg-indigo-200" />
                <span className="text-[9px] font-black text-slate-400 tracking-[0.4em] uppercase opacity-70">
                  Dev Portfolio
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Center Navigation (Stripe Style) ── */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 px-1.5 py-1.5 rounded-full bg-slate-50 border border-slate-100 shadow-inner">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, item)}
                className="relative px-4 py-2 text-[13px] font-bold tracking-tight transition-colors duration-300"
                style={{ color: activeItem === item ? '#0f172a' : '#64748b' }}
              >
                <span className="relative z-10">{item}</span>
                {activeItem === item && (
                  <motion.div
                    layoutId="activeBubble"
                    className="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-100"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {/* Hover Indicator */}
                <span className="absolute inset-0 rounded-full bg-slate-200/40 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
            ))}
          </div>

          {/* ── Primary CTA (Hire Me) ── */}
          <div className="hidden lg:flex items-center">
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => handleNavClick(e, 'Contact')}
              className="relative group px-8 py-3 rounded-full bg-slate-900 text-white font-bold text-sm overflow-hidden"
            >
              {/* Gradient Aura */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex items-center gap-2">
                <span>Hire Me</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
              
              {/* Glow Blur Effect */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[80%] h-10 bg-blue-500/40 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
            </motion.button>
          </div>

          {/* ── Mobile Trigger ── */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-900 overflow-hidden relative"
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

        {/* ── Mobile Menu (Full Overlay) ── */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-3xl border-b border-slate-100 p-6 shadow-2xl overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-3">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${activeItem === item ? 'bg-slate-900 border-slate-900 text-white' : 'bg-slate-50 border-slate-100 text-slate-600'}`}
                  >
                    <span className="font-bold text-sm uppercase tracking-widest">{item}</span>
                    <ArrowRight size={14} className={activeItem === item ? 'opacity-100' : 'opacity-20'} />
                  </motion.a>
                ))}
              </div>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full mt-6 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20"
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