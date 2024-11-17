import React from 'react';
import { Navbar } from '../navigation/Navbar';
import { Footer } from './Footer';
import { useBusinessConfig } from '../../context/BusinessContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const business = useBusinessConfig();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
