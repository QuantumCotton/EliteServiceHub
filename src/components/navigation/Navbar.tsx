import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBusinessConfig } from '../../context/BusinessContext';
import { cn } from '../../lib/utils';

interface NavLink {
  to: string;
  label: string;
}

const navLinks: NavLink[] = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/test-shadcn', label: 'Components' }
];

export const Navbar: React.FC = () => {
  const { currentBusinessConfig: { theme, name } } = useBusinessConfig();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActiveLink = (path: string): boolean => {
    return location.pathname === path || 
      (path !== '/' && location.pathname.startsWith(path));
  };

  const linkStyles = (path: string) => ({
    color: isActiveLink(path) ? theme.accent : theme.text,
    ':hover': {
      color: theme.accent
    }
  });

  return (
    <nav style={{ backgroundColor: theme.primary }}>
      <div className="max-w-7xl mx-auto px-4 shadow-lg">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-xl font-bold"
              style={{ color: theme.text }}
            >
              {name}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "transition-colors duration-200",
                  isActiveLink(to) ? "font-semibold" : ""
                )}
                style={linkStyles(to)}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
              style={{ color: theme.text }}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div 
          className="md:hidden"
          style={{ backgroundColor: theme.primaryMuted }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "block px-3 py-2 transition-colors duration-200",
                  isActiveLink(to) ? "font-semibold" : ""
                )}
                style={linkStyles(to)}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
