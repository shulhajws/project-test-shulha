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
      className={`fixed w-full z-50 transition-all duration-300 header-main ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } ${scrollPosition > 10 ? 'bg-orange-500/90 backdrop-blur-sm header-scrolled' : 'bg-orange-500 header-top'}`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center header-container">
        <div className="logo text-white font-bold text-xl header-logo">
          Suitmedia
        </div>
        
        <nav className="hidden md:block header-desktop-nav">
          <ul className="flex space-x-6 header-nav-list">
            {navItems.map((item) => (
              <li key={item.path} className="header-nav-item">
                <a 
                  href={item.path}
                  className={`text-white font-medium hover:text-white/80 pb-1 header-nav-link ${
                    location.pathname === item.path || 
                    (location.pathname === '/' && item.path === '/ideas')
                      ? 'border-b-2 border-white header-nav-link-active' 
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
          className="md:hidden text-white focus:outline-none header-mobile-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 header-hamburger-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <div 
        className={`md:hidden bg-orange-500 transition-all duration-300 overflow-hidden header-mobile-menu ${
          mobileMenuOpen ? 'max-h-80 opacity-100 header-mobile-menu-open' : 'max-h-0 opacity-0 header-mobile-menu-closed'
        }`}
      >
        <nav className="container mx-auto px-4 py-2 header-mobile-nav">
          <ul className="flex flex-col space-y-2 py-2 header-mobile-nav-list">
            {navItems.map((item) => (
              <li key={item.path} className="header-mobile-nav-item">
                <a 
                  href={item.path}
                  className={`block text-white font-medium py-2 hover:bg-orange-400 px-2 rounded header-mobile-nav-link ${
                    location.pathname === item.path || 
                    (location.pathname === '/' && item.path === '/ideas')
                      ? 'bg-orange-600 header-mobile-nav-link-active' 
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