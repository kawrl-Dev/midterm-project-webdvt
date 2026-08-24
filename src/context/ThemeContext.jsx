import { useState, useEffect } from "react";
import { ThemeContext } from "./theme-context";

const STORAGE_KEY = 'theme-preference';

// Converts a "#rrggbb" hex color into an "rgba(r, g, b, alpha)" string, used to build the translucent layers for the multilayer wave footer.
const hexToRgba = (hex, alpha) => {
  const parsed = hex.replace('#', '');
  const bigint = parseInt(parsed, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Base accent color per theme, picked to match the site's "coffee vibe" palette instead of a computed contrast color.
const BASE_WAVE_COLOR = {
  dark: '#BFC0C0',   // silver
  light: '#82665B',  // warm mocha
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : 'dark';
  });

  // Apply theme to the document and persist it whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Three translucent shades of the theme's base color, back-to-front, for the multilayered wave effect. Front layer is most opaque.
  const base = BASE_WAVE_COLOR[theme];
  const waveColors = [
    hexToRgba(base, 0.25),
    hexToRgba(base, 0.5),
    hexToRgba(base, 0.9),
  ];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, waveColors }}>
      {children}
    </ThemeContext.Provider>
  );
};