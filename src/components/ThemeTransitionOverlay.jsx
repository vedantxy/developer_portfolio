import { useContext, useEffect, useState, useMemo } from 'react';
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
                  ? 'bg-gradient-to-r from-transparent via-[#f0f4ff]/40 to-transparent' 
                  : 'bg-gradient-to-r from-transparent via-[#0d0f1a]/40 to-transparent'
              }`}
            />

            {/* Starfield (only for Light -> Dark) */}
            {theme === 'dark' && stars.map((star) => (
              <motion.div
                key={star.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ delay: star.delay, duration: 0.3 }}
                className="absolute bg-white rounded-full"
                style={{
                  top: star.top,
                  left: star.left,
                  width: star.size,
                  height: star.size,
                  boxShadow: '0 0 5px white'
                }}
              />
            ))}

            {/* Color Wave (Top-to-Bottom) */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: '100%' }}
              transition={{ duration: 1, ease: "linear" }}
              className={`absolute inset-0 h-1/2 opacity-10 bg-gradient-to-b ${
                theme === 'light' ? 'from-white to-transparent' : 'from-[#b8f2e6] to-transparent'
              }`}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeTransitionOverlay;
