import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Header
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/visualizer', label: 'Visualizer' },
    { path: '/notes', label: 'Notes' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gray-900 p-4 shadow-md">
      <nav className="container mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            <Link to="/">Sorting Visualizer</Link>
          </h1>
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-gray-300 hover:text-white transition-colors duration-300 ${
                  location.pathname === item.path ? 'font-semibold text-white' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-2 text-gray-300 hover:text-white transition-colors duration-300 ${
                  location.pathname === item.path ? 'font-semibold text-white' : ''
                }`}
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;