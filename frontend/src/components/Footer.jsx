import React from 'react';
import { Globe } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="airbnb-footer">
      <div className="footer-container">
        <div className="footer-left">
          <span>© 2026 Airbnb, Inc.</span>
          <span className="footer-dot">·</span>
          <a href="#privacy">Privacy</a>
          <span className="footer-dot">·</span>
          <a href="#terms">Terms</a>
          <span className="footer-dot">·</span>
          <a href="#sitemap">Sitemap</a>
          <span className="footer-dot">·</span>
          <a href="#company-details">Company details</a>
        </div>

        <div className="footer-right">
          <button className="footer-lang-btn">
            <Globe size={16} color="#222222" />
            <span>English (IN)</span>
          </button>
          <span className="footer-currency">₹ INR</span>
        </div>
      </div>
    </footer>
  );
}
