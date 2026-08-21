import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import './StickySubNav.css';

export default function StickySubNav({ pricing, rating, reviewCount }) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('photos');

  useEffect(() => {
    const handleScroll = () => {
      const photosEl = document.getElementById('photos-section');

      // The reference keeps this bar off-screen until the gallery itself has
      // completely passed the top of the viewport.
      setIsVisible(Boolean(photosEl && photosEl.getBoundingClientRect().bottom <= 0));

      // Detect active section based on DOM element positions
      const amenitiesEl = document.getElementById('amenities-section');
      const reviewsEl = document.getElementById('reviews-section');
      const locationEl = document.getElementById('location-section');

      const scrollPos = window.scrollY + 104;
      const documentTop = (element) => window.scrollY + element.getBoundingClientRect().top;

      if (locationEl && scrollPos >= documentTop(locationEl)) {
        setActiveTab('location');
      } else if (reviewsEl && scrollPos >= documentTop(reviewsEl)) {
        setActiveTab('reviews');
      } else if (amenitiesEl && scrollPos >= documentTop(amenitiesEl)) {
        setActiveTab('amenities');
      } else if (photosEl && scrollPos >= documentTop(photosEl)) {
        setActiveTab('photos');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id, tabName) => {
    setActiveTab(tabName);

    if (id === 'photos-section') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const navHeight = document.querySelector('.secondary-sticky-nav')?.offsetHeight || 80;
      const targetTop = window.scrollY + element.getBoundingClientRect().top - navHeight - 24;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="secondary-sticky-nav">
      <div className="sticky-nav-container">
        {/* Left Section: Smooth Scroll Section Links */}
        <div className="sticky-nav-links">
          <button
            type="button"
            className={`sticky-nav-link ${activeTab === 'photos' ? 'active' : ''}`}
            onClick={() => scrollToSection('photos-section', 'photos')}
          >
            Photos
          </button>
          <button
            type="button"
            className={`sticky-nav-link ${activeTab === 'amenities' ? 'active' : ''}`}
            onClick={() => scrollToSection('amenities-section', 'amenities')}
          >
            Amenities
          </button>
          <button
            type="button"
            className={`sticky-nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => scrollToSection('reviews-section', 'reviews')}
          >
            Reviews
          </button>
          <button
            type="button"
            className={`sticky-nav-link ${activeTab === 'location' ? 'active' : ''}`}
            onClick={() => scrollToSection('location-section', 'location')}
          >
            Location
          </button>
        </div>

        {/* Right Section: Summary Pricing & Reserve Quick-Action */}
        <div className="sticky-nav-right">
          <div className="sticky-pricing-summary">
            <div className="pricing-line">
              <span className="bold-price">₹{pricing?.total ? pricing.total.toLocaleString('en-IN') : '28,499'}</span>
              <span className="price-subtext"> for 5 nights</span>
            </div>
            <div className="rating-line">
              <Star size={12} fill="#222222" color="#222222" />
              <span className="rating-score">{rating || '4.95'}</span>
              <span className="dot">·</span>
              <span className="reviews-subtext">{reviewCount || '19'} reviews</span>
            </div>
          </div>
          
          <button
            type="button"
            className="brand-reserve-btn"
            onClick={() => {
              const reserveBox = document.getElementById('reserve-card-box');
              if (reserveBox) {
                reserveBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}
