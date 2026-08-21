import React from 'react';
import { Home, Plus, Minus, Search, ChevronRight } from 'lucide-react';
import './LocationSection.css';

export default function LocationSection({ location }) {
  return (
    <div className="location-section-container" id="location-section">
      <div className="section-divider"></div>
      <h2 className="location-title">Where you'll be</h2>
      <p className="location-subtitle">{location || "Candolim, Goa, India"}</p>

      {/* Styled Map Graphic Representation */}
      <div className="map-view-box">
        {/* Map Header Controls */}
        <div className="map-control-btn search-ctrl">
          <Search size={18} color="#222222" />
        </div>
        <div className="map-zoom-stack">
          <button className="map-control-btn zoom-in"><Plus size={18} color="#222222" /></button>
          <button className="map-control-btn zoom-out"><Minus size={18} color="#222222" /></button>
        </div>

        {/* Custom SVG/Canvas Styled Map Background */}
        <div className="map-graphic-bg">
          <div className="map-circle-zone circle-left"></div>
          <div className="map-circle-zone circle-right"></div>
          <div className="map-pin-badge">
            <Home size={22} color="#ffffff" fill="#222222" />
          </div>
        </div>
      </div>

      <p className="map-caption-text">Exact location will be provided after booking.</p>

      {/* Neighbourhood Highlights */}
      <div className="neighbourhood-highlights">
        <h3>Neighbourhood highlights</h3>
        <p className="neighbourhood-desc">
          Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.
        </p>
        <button className="show-more-link">
          <span>Show more</span>
          <ChevronRight size={16} color="#222222" />
        </button>
      </div>
    </div>
  );
}
