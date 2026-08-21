import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe, Menu } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsLangOpen(false);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="main-navbar" ref={navRef}>
      <div className="navbar-container">
        {/* Left: Airbnb Logo */}
        <Link to="/" className="navbar-logo clickable-hover" title="Airbnb">
          <svg
            className="logo-icon"
            viewBox="0 0 32 32"
            fill="#FF385C"
            height="32"
            width="32"
            aria-label="Airbnb homepage"
            role="img"
          >
            <path d="M29.24 22.68c-.13-.39-.31-.96-.73-1.98-.15-.35-.33-.81-.53-1.31a38.07 38.07 0 0 0-6.87-11.6C19.2 5.57 17.5 4.5 16 4.5s-3.2 1.07-5.11 3.29a38.07 38.07 0 0 0-6.87 11.6c-.2.5-.38.96-.53 1.31-.42 1.02-.6 1.59-.73 1.98a8.3 8.3 0 0 0 2 8.13C6.38 32.32 8.5 33 11 33c2.72 0 5.25-1.05 7.02-2.9 1.77 1.85 4.3 2.9 7.02 2.9 2.5 0 4.62-.68 6.24-2.19a8.3 8.3 0 0 0 2-8.13zM16 7.27c1.1 0 2.22.84 3.65 2.5 1.55 1.82 3.19 4.33 4.88 7.47-1.7 3.03-3.6 5.86-5.63 8.39-1.02 1.28-2.02 2.37-2.9 3.17-.88-.8-1.88-1.89-2.9-3.17-2.03-2.53-3.93-5.36-5.63-8.39 1.69-3.14 3.33-5.65 4.88-7.47 1.43-1.66 2.55-2.5 3.65-2.5z" />
          </svg>
          <span className="logo-text">airbnb</span>
        </Link>

        {/* Middle: Search Pill Bar */}
        <div className="search-pill-container">
          <button className="search-pill-btn">
            <div className="house-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                <path d="M16 3L3 13V28C3 28.5523 3.44772 29 4 29H12V19H20V29H28C28.5523 29 29 28.5523 29 28V13L16 3Z" fill="#717171" stroke="#484848" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M12 29V19H20V29" fill="#FF385C"/>
              </svg>
            </div>
            <span className="search-pill-item bold">Anywhere</span>
            <span className="search-pill-divider"></span>
            <span className="search-pill-item bold">Anytime</span>
            <span className="search-pill-divider"></span>
            <span className="search-pill-item light">Add guests</span>
            <div className="search-icon-wrapper">
              <Search size={14} color="#ffffff" strokeWidth={3} />
            </div>
          </button>
        </div>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Become a Host Link */}
          <Link to="/host" className="host-link-btn">
            Become a host
          </Link>

          {/* Language Circle Button */}
          <div className="nav-dropdown-wrapper">
            <button 
              className="globe-btn-circle" 
              onClick={() => {
                setIsLangOpen(!isLangOpen);
                setIsMenuOpen(false);
              }}
              title="Choose a language"
            >
              <Globe size={18} color="#222222" strokeWidth={1.8} />
            </button>

            {isLangOpen && (
              <div className="dropdown-menu lang-dropdown">
                <div className="dropdown-item bold-item">Language and region</div>
                <div className="dropdown-item">English (IN)</div>
                <div className="dropdown-item">Hindi (IN)</div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item bold-item">Currency</div>
                <div className="dropdown-item">₹ INR (Indian Rupee)</div>
                <div className="dropdown-item">$ USD (US Dollar)</div>
              </div>
            )}
          </div>

          {/* Profile Menu Pill Combo Button */}
          <div className="nav-dropdown-wrapper">
            <button 
              className="profile-menu-pill"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsLangOpen(false);
              }}
              title="Profile menu"
            >
              <Menu size={18} color="#222222" strokeWidth={2} />
            </button>

            {isMenuOpen && (
              <div className="dropdown-menu profile-dropdown">
                <div className="dropdown-item bold-item">Sign up</div>
                <div className="dropdown-item">Log in</div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item">Airbnb your home</div>
                <div className="dropdown-item">Help Centre</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
