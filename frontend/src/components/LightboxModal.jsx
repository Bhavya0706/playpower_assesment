import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Share, Heart } from 'lucide-react';
import './LightboxModal.css';

export default function LightboxModal({
  isOpen,
  onClose,
  photos,
  currentIndex,
  onNavigate,
  isSaved,
  onToggleSave
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + photos.length) % photos.length);
      } else if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % photos.length);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, currentIndex, photos, onNavigate, onClose]);

  if (!isOpen || !photos || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex] || photos[0];
  const photoCategory = (currentPhoto.caption || 'Photo').replace(/\s+\d+$/, '');

  const handlePrev = (e) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % photos.length);
  };

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      {/* Top Controls Bar */}
      <div className="lightbox-header" onClick={(e) => e.stopPropagation()}>
        <button className="lb-close-btn" onClick={onClose} aria-label="Close">
          <X size={18} color="#222222" />
          <span>Close</span>
        </button>

        <div className="lb-category" aria-live="polite">{photoCategory}</div>

        <div className="lb-header-right">
          <div className="lb-counter" aria-label={`Photo ${currentIndex + 1} of ${photos.length}`}>
            {currentIndex + 1} / {photos.length}
          </div>
          <div className="lb-actions">
          <button className="action-btn">
            <Share size={16} color="#222222" />
          </button>
          <button className="action-btn" onClick={onToggleSave}>
            <Heart size={16} color={isSaved ? '#FF385C' : '#222222'} fill={isSaved ? '#FF385C' : 'none'} />
          </button>
          </div>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <button className="lb-nav-btn prev-btn" onClick={handlePrev} aria-label="Previous photo">
          <ChevronLeft size={24} color="#222222" />
        </button>

        <div className="lb-image-wrapper">
          <img src={currentPhoto.url} alt={currentPhoto.caption || `Photo ${currentIndex + 1}`} />
        </div>

        <button className="lb-nav-btn next-btn" onClick={handleNext} aria-label="Next photo">
          <ChevronRight size={24} color="#222222" />
        </button>
      </div>

      {/* Bottom Caption Bar */}
      {currentPhoto.caption && (
        <div className="lightbox-footer" onClick={(e) => e.stopPropagation()}>
          <p className="lb-caption">{currentPhoto.caption}</p>
          {currentPhoto.subtext && <p className="lb-subtext">{currentPhoto.subtext}</p>}
        </div>
      )}
    </div>
  );
}
