import { createContext } from 'react';

export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
  isTransitioning: false,
  togglePos: { x: 0, y: 0 }
});
