// src/contexts/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(undefined);

const THEME_STORAGE_KEY = 'subtasked-theme-mode';

const colors = {
  jetBlack: '#0a0a0a',
  deepPurple: '#1e0e2a',
  neonOrange: '#ff7b00',
  mutedGrey: '#b0a8b9',
};

export function ThemeProvider({ children }) {
  const [mode, setModeState] = useState(() => {
    // Initialize from localStorage or default to 'full-haunt'
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'casual-dark' || stored === 'full-haunt' 
      ? stored 
      : 'full-haunt';
  });

  useEffect(() => {
    // Persist theme mode to localStorage whenever it changes
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, [mode]);

  const setMode = (newMode) => {
    if (newMode === 'casual-dark' || newMode === 'full-haunt') {
      setModeState(newMode);
    }
  };

  const value = {
    mode,
    setMode,
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
