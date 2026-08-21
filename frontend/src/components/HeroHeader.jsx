import React from 'react';
import { Share, Heart } from 'lucide-react';
import './HeroHeader.css';

export default function HeroHeader({ title, isSaved, onToggleSave }) {
  return (
    <div className="hero-header">
      <h1 className="hero-title">{title || "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10"}</h1>
      <div className="hero-actions">
        <button className="action-btn">
          <Share size={16} color="#222222" />
          <span className="action-label">Share</span>
        </button>
        <button 
          className={`action-btn save-btn ${isSaved ? 'saved' : ''}`}
          onClick={onToggleSave}
        >
          <Heart 
            size={16} 
            color={isSaved ? '#FF385C' : '#222222'} 
            fill={isSaved ? '#FF385C' : 'none'} 
            className="heart-icon"
          />
          <span className="action-label">{isSaved ? 'Saved' : 'Save'}</span>
        </button>
      </div>
    </div>
  );
}
