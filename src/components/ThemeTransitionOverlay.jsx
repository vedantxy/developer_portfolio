import { useContext, useMemo } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';

const ThemeTransitionOverlay = () => {
  const { theme, isTransitioning } = useContext(ThemeContext);

  const stars = useMemo(() => {
    if (!isTransitioning || theme !== 'dark') return [];
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 0.5,
      size: Math.random() * 2 + 1
    }));
  }, [isTransitioning, theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[45] overflow-hidden">
      <AnimatePresence>
        {isTransitioning && (
          <>
            {/* Diagonal Wipe */}
            <motion.div
              initial={{ x: '-100%', skewX: -20 }}
              animate={{ x: '100%', skewX: -20 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={`absolute inset-0 w-[150%] ${
                theme === 'light' 
                  ? 'bg-gradient-to-r from-transparent via-slate-100/30 to-transparent' 
                  : 'bg-gradient-to-r from-transparent via-indigo-900/30 to-transparent'
              }`}
            />

            {/* Starfield (only for Light -> Dark) */}
            {theme === 'dark' && stars.map((star) => (
              <motion.div
                key={star.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ delay: star.delay, duration: 0.3 }}
                className="absolute bg-indigo-300 rounded-full"
                style={{
                  top: star.top,
                  left: star.left,
                  width: star.size,
                  height: star.size,
                  boxShadow: '0 0 8px rgba(165, 180, 252, 0.4)'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeTransitionOverlay;
