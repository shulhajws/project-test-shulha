import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useScrollPosition from '../hooks/useScrollPosition';

const Header = () => {
  const { scrollPosition, scrollDirection } = useScrollPosition();
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    if (scrollDirection === 'down' && scrollPosition > 50) {
      setVisible(false);
      setMobileMenuOpen(false);
    } else {
      setVisible(true);
    }
  }, [scrollPosition, scrollDirection]);
  
  const navItems = [
    { label: 'Work', path: '/work' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Ideas', path: '/ideas' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
  ];
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } ${scrollPosition > 10 ? 'bg-orange-500/90 backdrop-blur-sm' : 'bg-orange-500'}`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="logo text-white font-bold text-xl">
          Suitmedia
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.path}>
                <a 
                  href={item.path}
                  className={`text-white font-medium hover:text-white/80 pb-1 ${
                    location.pathname === item.path || 
                    (location.pathname === '/' && item.path === '/ideas')
                      ? 'border-b-2 border-white' 
                      : ''
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <div 
        className={`md:hidden bg-orange-500 transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container mx-auto px-4 py-2">
          <ul className="flex flex-col space-y-2 py-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <a 
                  href={item.path}
                  className={`block text-white font-medium py-2 hover:bg-orange-400 px-2 rounded ${
                    location.pathname === item.path || 
                    (location.pathname === '/' && item.path === '/ideas')
                      ? 'bg-orange-600' 
                      : ''
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;