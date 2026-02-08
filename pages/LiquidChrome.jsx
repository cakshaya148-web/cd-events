// LiquidChrome.jsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const LiquidChrome = () => {
  const { theme } = useTheme();
  const [bgColor, setBgColor] = useState(theme.bgColor);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      setBgColor(theme.bgColor);
    };

    // Initial update
    handleThemeChange();

    // Listen for theme updates
    const interval = setInterval(() => {
      if (bgColor !== theme.bgColor) {
        setBgColor(theme.bgColor);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [theme.bgColor, bgColor]);

  return (
    <div
      className="min-h-screen w-full fixed top-0 left-0 z-[-1] transition-colors duration-500"
      style={{ 
        backgroundColor: bgColor,
      }}
    />
  );
};

export default LiquidChrome;