import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Skills", path: "/skills" },
  { title: "Projects", path: "/projects" },
  { title: "Profiles", path: "/profiles" },
  { title: "Resume", path: "/resume" },
  { title: "Contact", path: "/contact" },
];

const Navbar = () => {
  return (
    <header className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-display font-bold text-white tracking-wider text-gradient">
          PORTFOLIO
        </NavLink>
        
        <nav className="hidden md:flex space-x-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.title}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? "text-accent bg-white/5" : "text-gray-300 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {link.title}
            </NavLink>
          ))}
        </nav>
        
        {/* Mobile menu button could be added here later */}
      </div>
    </header>
  );
};

export default Navbar;
