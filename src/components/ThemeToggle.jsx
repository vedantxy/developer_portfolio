import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={(e) => toggleTheme(e)}
      className="relative w-12 h-12 flex items-center justify-center rounded-2xl bg-[var(--bg-card)] border border-[var(--glass-border)] shadow-sm overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-10)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.div
            key="moon"
            initial={{ y: 20, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.3, ease: 'backOut' }}
            className="text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]"
          >
            <Moon size={22} fill="currentColor" strokeWidth={1.5} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: 20, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.3, ease: 'backOut' }}
            className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
          >
            <Sun size={22} fill="currentColor" strokeWidth={1.5} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle indicator beam */}
      <motion.div 
        className="absolute bottom-1 w-1 h-1 rounded-full bg-[var(--accent)]"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.button>
  );
};

export default ThemeToggle;
