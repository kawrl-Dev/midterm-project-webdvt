import React, {createContext, useContext, useState, useEffect} from "react";

const ThemeContext = createContext();
const STORAGE_KEY = 'theme-preference';

export const getContrastingColor = (rgbString) => {
  if (!rgbString) return '#3c9bf9';
 
  // Extract RGB values from string like "rgb(255, 99, 71)"
  const rgbValues = rgbString.match(/\d+/g);
  if (!rgbValues || rgbValues.length < 3) return '#1a1a1a';
 
  const [r, g, b] = rgbValues.map(Number);
 
  // Calculate relative luminance / perceptual brightness (0 to 255)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
 
  // If background is bright, return dark contrast wave; if dark, return light/vibrant wave
  return brightness > 150 ? '#0f172a' : '#f8fafc';
};

// Converts a "#rrggbb" hex color into an "rgba(r, g, b, alpha)" string,
// used to build the translucent layers for the multilayer wave footer.
const hexToRgba = (hex, alpha) => {
  const parsed = hex.replace('#', '');
  const bigint = parseInt(parsed, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
 
// Base accent color per theme. Chosen to contrast well against
// Bootstrap's default dark/light `data-bs-theme` backgrounds.
const BASE_WAVE_COLOR = {
  dark: '#38bdf8', // light cyan, pops against dark backgrounds
  light: '#1e3a8a', // deep blue, pops against light backgrounds
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
 
  // Three translucent shades of the same base color, back-to-front,
  // for the multilayered wave effect. Front layer is most opaque.
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
 
export const useTheme = () => useContext(ThemeContext);