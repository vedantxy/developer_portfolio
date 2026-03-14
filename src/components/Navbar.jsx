import { motion, AnimatePresence } from 'motion/react';
import { ThemeContext } from '../context/ThemeContext';
import { useContext, useState, useEffect, useRef } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

const Particle = ({ x, y, color }) => {
  const angle = Math.random() * Math.PI * 2;
  const velocity = 50 + Math.random() * 100;
  const tx = Math.cos(angle) * velocity;
  const ty = Math.sin(angle) * velocity;

  return (
    <motion.div
      initial={{ x, y, scale: 1, opacity: 1 }}
      animate={{ x: x + tx, y: y + ty, scale: 0, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed pointer-events-none z-[10000] w-1.5 h-1.5 rounded-full"
      style={{ backgroundColor: color }}
    />
  );
};

function Navbar() {
  const { theme, toggleTheme, isTransitioning, togglePos } = useContext(ThemeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [particles, setParticles] = useState([]);
  const toggleButtonRef = useRef(null);

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Certificates', 'Education', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggle = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    // Create particles
    const color = theme === 'dark' ? '#fbbf24' : '#60a5fa'; // Yellow for sun, Blue for stars
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      x,
      y,
      color
    }));
    
    setParticles((prev) => [...prev, ...newParticles]);
    toggleTheme(e);
    
    // Clear particles
    setTimeout(() => {
      setParticles((prev) => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);
  };

  const handleNavClick = (e, item) => {
    e.preventDefault();
    const sectionId = item.toLowerCase();
    const section = document.getElementById(sectionId);
    if (section) {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      } else {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      {/* Ripple Effect */}
      {isTransitioning && (
        <div 
          className="ripple-overlay"
          style={{ 
            left: togglePos.x, 
            top: togglePos.y,
            backgroundColor: theme === 'light' ? '#f0f4ff' : '#0d0f1a'
          }}
        />
      )}

      {/* Particles */}
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? theme === 'dark' 
              ? 'bg-[#1c1c1c]/95 backdrop-blur-xl shadow-lg shadow-[#b8f2e6]/5' 
              : 'bg-white/95 backdrop-blur-xl shadow-lg shadow-[#aed9e0]/10'
            : theme === 'dark'
              ? 'bg-[#1c1c1c]/80 backdrop-blur-md'
              : 'bg-white/80 backdrop-blur-md'
        } ${isTransitioning ? (theme === 'dark' ? 'animate-[navbar-flash-cyan_0.8s_ease-in-out]' : 'animate-[navbar-flash-lavender_0.8s_ease-in-out]') : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-1"
            >
              <motion.div
                className={`text-3xl font-black tracking-tighter ${
                  theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
                }`}
              >
                V<span className="text-[#00d4ff]">P</span><span className="text-purple-500">.</span>
              </motion.div>
              <motion.div
                className={`absolute -bottom-1 left-0 h-0.5 ${
                  theme === 'dark' ? 'bg-[#b8f2e6]' : 'bg-[#aed9e0]'
                }`}
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -2 }}
                  onClick={(e) => handleNavClick(e, item)}
                  className="relative group"
                >
                  <span className={`text-base font-medium transition-colors duration-200 ${
                    theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
                  }`}>
                    {item}
                  </span>
                  <motion.div
                    className={`absolute -bottom-1 left-0 h-0.5 ${
                      theme === 'dark' ? 'bg-[#b8f2e6]' : 'bg-[#aed9e0]'
                    }`}
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
              
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggle}
                className={`p-2.5 rounded-xl transition-all duration-300 relative ${
                  theme === 'dark' 
                    ? 'bg-[#b8f2e6]/10 text-[#b8f2e6]' 
                    : 'bg-[#aed9e0]/20 text-[#5e6472]'
                }`}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ scale: 0, rotate: -180, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0, rotate: 180, opacity: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20, 
                        duration: 0.4 
                      }}
                      className="animate-[sun-glow_2s_infinite]"
                    >
                      <Sun className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ scale: 0, rotate: 180, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0, rotate: -180, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="animate-[moon-twinkle_2s_infinite]"
                    >
                      <Moon className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mobile Menu Buttons */}
            <div className="flex items-center gap-2 md:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleToggle}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-[#b8f2e6]/10 text-[#b8f2e6]' 
                    : 'bg-[#aed9e0]/20 text-[#5e6472]'
                }`}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ scale: 0, rotate: -180, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0, rotate: 180, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <Sun className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ scale: 0, rotate: 180, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0, rotate: -180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-[#b8f2e6]/10 text-[#b8f2e6]' 
                    : 'bg-[#aed9e0]/20 text-[#5e6472]'
                }`}
                aria-label="Toggle mobile menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="md:hidden overflow-hidden"
              >
                <div className="flex flex-col space-y-2 py-4">
                  {navItems.map((item, idx) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`text-base font-medium px-4 py-3 rounded-xl transition-all duration-200 ${
                        theme === 'dark'
                          ? 'text-[#b8f2e6] hover:bg-[#b8f2e6]/10'
                          : 'text-[#5e6472] hover:bg-[#aed9e0]/20'
                      }`}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
}

export default Navbar;