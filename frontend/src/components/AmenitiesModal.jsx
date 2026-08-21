import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './AmenitiesModal.css';

export default function AmenitiesModal({ isOpen, onClose, amenities }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content amenities-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <X size={18} color="#222222" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="amenities-modal-body">
          <h2 className="modal-title">What this place offers</h2>

          {amenities && amenities.map((cat, idx) => (
            <div key={idx} className="amenity-category-block">
              <h3 className="category-title">{cat.category}</h3>
              <div className="category-items-list">
                {cat.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="category-item-row">
                    <span className="item-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
