import { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';

const THEME_CYCLE = ['dark', 'light', 'neon'];

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return THEME_CYCLE.includes(saved) ? saved : 'dark';
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [togglePos, setTogglePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    // Apply theme class to <html> for CSS variable switching
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = (e) => {
    if (e && e.clientX && e.clientY) {
      setTogglePos({ x: e.clientX, y: e.clientY });
    }
    setIsTransitioning(true);
    setTheme((prev) => {
      const idx = THEME_CYCLE.indexOf(prev);
      return THEME_CYCLE[(idx + 1) % THEME_CYCLE.length];
    });
    setTimeout(() => setIsTransitioning(false), 850);
  };

  // Expose setTheme directly for Theme picker UIs
  const setThemeDirect = (t) => {
    if (!THEME_CYCLE.includes(t)) return;
    setIsTransitioning(true);
    setTheme(t);
    setTimeout(() => setIsTransitioning(false), 850);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setThemeDirect, isTransitioning, togglePos }}>
      <div className={isTransitioning ? 'theme-transitioning' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
