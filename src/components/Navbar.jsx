import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import logo from '../assets/can logo.png';
import { useSmartAppUrl, PLAY_STORE_URL, APP_STORE_URL } from '../utils/smartRedirect';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/technology', label: 'Technology' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { appUrl, isApple } = useSmartAppUrl();

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 inset-x-0 z-[100] bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        
        {/* Left: Brand Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center flex-shrink-0 group">
          <img 
            src={logo} 
            alt="CAN Logo" 
            className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
          />
        </Link>

        {/* Center: Desktop Navigation Links (hidden on mobile/tablet < md) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-10">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-all duration-200 hover:text-white relative py-1 ${
                  isActive ? 'text-white font-semibold' : 'text-gray-400'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3.5 flex-shrink-0">
          {/* Smart App Download Button - Always Single Row & Mobile Friendly */}
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase !text-black bg-cyan-400 hover:bg-white hover:!text-black transition-all duration-300 shadow-[0_0_12px_rgba(34,211,238,0.35)] hover:shadow-[0_0_18px_rgba(255,255,255,0.6)] flex-shrink-0 cursor-pointer"
            title={isApple ? "Download on Apple App Store" : "Download on Google Play Store"}
          >
            <span>{isApple ? "IQ World iOS" : "IQ World App"}</span>
            <ArrowUpRight size={13} className="opacity-80" />
          </a>

          {/* Mobile Hamburger Toggle Button (visible on screens < md) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none flex-shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-[#07090e]/98 border-b border-white/10 backdrop-blur-2xl shadow-2xl"
          >
            <div className="px-5 pt-3 pb-6 space-y-4">
              {/* Nav Links */}
              <div className="space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-white/10 text-cyan-300 font-semibold'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    <span className="text-gray-500 text-xs">→</span>
                  </NavLink>
                ))}
                
                <Link
                  to="/iq-world-terms"
                  onClick={closeMenu}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <span>Terms & Conditions</span>
                  <span className="text-gray-500 text-xs">→</span>
                </Link>
              </div>

              {/* Dual Store Links in Mobile Drawer */}
              <div className="pt-3 border-t border-white/10">
                <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-2 px-1">
                  Download IQ World App
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 text-white text-xs font-medium transition-all"
                  >
                    <span>App Store</span>
                    <ArrowUpRight size={12} className="text-cyan-400" />
                  </a>
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 text-white text-xs font-medium transition-all"
                  >
                    <span>Google Play</span>
                    <ArrowUpRight size={12} className="text-cyan-400" />
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
