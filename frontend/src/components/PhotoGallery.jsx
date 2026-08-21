import React from 'react';
import { Grid } from 'lucide-react';
import './PhotoGallery.css';

export default function PhotoGallery({ photos, onOpenLightbox, onOpenPhotoTour }) {
  if (!photos || photos.length === 0) return null;

  const mainPhoto = photos[0];
  const secondaryPhotos = photos.slice(1, 5);

  return (
    <div className="photo-gallery-wrapper" id="photos-section">
      <div className="photo-grid">
        {/* Main Hero Large Photo */}
        <div 
          className="photo-item main-photo"
          onClick={() => onOpenPhotoTour(0)}
        >
          <img src={mainPhoto.url} alt={mainPhoto.caption || "Main photo"} />
          <div className="photo-dim-overlay"></div>
        </div>

        {/* 4 Grid Photos on Right */}
        <div className="secondary-photos-grid">
          {secondaryPhotos.map((photo, index) => (
            <div 
              key={photo.id || index + 1}
              className={`photo-item secondary-photo photo-pos-${index}`}
              onClick={() => onOpenPhotoTour(index + 1)}
            >
              <img src={photo.url} alt={photo.caption || `Photo ${index + 2}`} />
              <div className="photo-dim-overlay"></div>
            </div>
          ))}
        </div>

        {/* Show all photos button overlay */}
        <button 
          className="show-all-photos-btn"
          onClick={() => onOpenPhotoTour()}
        >
          <Grid size={16} color="#222222" />
          <span>Show all photos</span>
        </button>
      </div>
    </div>
  );
}
