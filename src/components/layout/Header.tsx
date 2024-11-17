import React from 'react';
import { useApp } from '../../contexts/AppContext';

const Header: React.FC = () => {
  const { state, currentBusinessConfig } = useApp();
  const { theme } = state;

  const headerStyle = {
    '--primary': theme.primary,
    '--secondary': theme.secondary,
    '--accent': theme.accent,
    '--background': theme.background,
  } as React.CSSProperties;

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={headerStyle}>
      <nav className="glass-morphism mx-4 my-4 px-6 py-4 rounded-2xl flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold" style={{ color: theme.primary }}>
            {currentBusinessConfig.name}
          </h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a 
            href="#services" 
            className="text-white/80 hover:text-white transition-colors"
            style={{ '--hover-color': theme.primary } as React.CSSProperties}
          >
            Services
          </a>
          <a 
            href="#about" 
            className="text-white/80 hover:text-white transition-colors"
            style={{ '--hover-color': theme.primary } as React.CSSProperties}
          >
            About
          </a>
          <a 
            href="#contact" 
            className="text-white/80 hover:text-white transition-colors"
            style={{ '--hover-color': theme.primary } as React.CSSProperties}
          >
            Contact
          </a>
        </div>

        <button 
          className="px-6 py-2 rounded-xl font-medium transition-colors"
          style={{ 
            backgroundColor: theme.background,
            color: theme.primary,
            boxShadow: `0 0 10px ${theme.primary}`,
          }}
        >
          Get Started
        </button>
      </nav>
    </header>
  );
};

export default Header;
