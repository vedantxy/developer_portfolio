import { useState, useEffect, useCallback, useMemo } from 'react';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }) => {
  // Initialize from localStorage or system preference
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
      
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light'; // Fallback for hydration — default to light mode
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [togglePos, setTogglePos] = useState({ x: 0, y: 0 });

  // Update theme helper
  const updateTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;
  }, []);

  // Sync theme across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'theme' && (e.newValue === 'dark' || e.newValue === 'light')) {
        updateTheme(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [updateTheme]);

  // Initial application of theme class
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = useCallback((e) => {
    // Capture click position for ripple/overlay effects if needed
    if (e && e.clientX && e.clientY) {
      setTogglePos({ x: e.clientX, y: e.clientY });
    }

    setIsTransitioning(true);
    
    // Toggle between dark and light
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    updateTheme(nextTheme);

    // End transition state after animation finishes
    setTimeout(() => setIsTransitioning(false), 800);
  }, [theme, updateTheme]);

  // Direct set helper
  const setTheme = useCallback((t) => {
    if (t === 'dark' || t === 'light') {
      setIsTransitioning(true);
      updateTheme(t);
      setTimeout(() => setIsTransitioning(false), 800);
    }
  }, [updateTheme]);

  const contextValue = useMemo(() => ({
    theme,
    toggleTheme,
    setTheme,
    isTransitioning,
    togglePos
  }), [theme, toggleTheme, setTheme, isTransitioning, togglePos]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className={isTransitioning ? 'theme-transitioning' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
