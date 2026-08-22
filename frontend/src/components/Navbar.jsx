import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe, Menu } from 'lucide-react';
import './Navbar.css';
import houseIcon from '../assets/house.avif';

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
 
      <i className="fa-brands fa-airbnb logo-icon"></i>
      <span className="logo-text">airbnb</span>
        </Link>

        {/* Middle: Search Pill Bar */}
        <div className="search-pill-container">
          <button className="search-pill-btn">
           {/**
            * <div className="house-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                <path d="M16 3L3 13V28C3 28.5523 3.44772 29 4 29H12V19H20V29H28C28.5523 29 29 28.5523 29 28V13L16 3Z" fill="#717171" stroke="#484848" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M12 29V19H20V29" fill="#FF385C"/>
              </svg>

              
            </div>
            */} 

            <div className="house-icon-wrapper">
    <img src={houseIcon} alt="House" />
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
