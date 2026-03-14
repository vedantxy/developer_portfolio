import { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [togglePos, setTogglePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = (e) => {
    if (e && e.clientX && e.clientY) {
      setTogglePos({ x: e.clientX, y: e.clientY });
    }
    
    setIsTransitioning(true);
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    
    // Reset transition state after animations complete
    setTimeout(() => {
      setIsTransitioning(false);
    }, 850);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning, togglePos }}>
      <div className={isTransitioning ? 'theme-transitioning' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
