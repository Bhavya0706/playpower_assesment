import React, { useEffect } from 'react';
import { ChevronLeft, Share, Heart } from 'lucide-react';
import './PhotoTourModal.css';

const EXTRA_PHOTOS = [
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
];

const TOUR_SECTION_BY_SOURCE_INDEX = {
  0: 'living-room-1',
  1: 'living-room-1',
  2: 'full-kitchen',
  3: 'bedroom',
  4: 'bathroom',
  5: 'living-room-2',
  6: 'exterior',
};

export default function PhotoTourModal({ isOpen, onClose, photos, onOpenLightbox, isSaved, onToggleSave, initialPhotoIndex }) {
  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && onClose();
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', closeOnEscape);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || initialPhotoIndex === null || initialPhotoIndex === undefined) return undefined;

    const timer = window.setTimeout(() => {
      const sectionId = TOUR_SECTION_BY_SOURCE_INDEX[initialPhotoIndex] || 'living-room-1';
      document.getElementById(`tour-${sectionId}`)?.scrollIntoView({ block: 'start' });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isOpen, initialPhotoIndex]);

  if (!isOpen || !photos?.length) return null;

  const photoAt = (index) => photos[index % photos.length];
  const sections = [
    { id: 'living-room-1', name: 'Living room 1', details: 'Sofa · Air conditioning · Ceiling fan · TV', sourceIndexes: [0, 1, 0] },
    { id: 'living-room-2', name: 'Living room 2', details: 'Ceiling fan · Hot tub', sourceIndexes: [5, 0, 5] },
    { id: 'full-kitchen', name: 'Full kitchen', details: 'Refrigerator · Microwave · Cooking basics', sourceIndexes: [2, 2, 0] },
    { id: 'bedroom', name: 'Bedroom', details: '1 double bed · Air conditioning', sourceIndexes: [3, 3, 1] },
    { id: 'bathroom', name: 'Full bathroom', details: 'Hot water · Hair dryer', sourceIndexes: [4, 4, 3] },
    { id: 'exterior', name: 'Exterior', details: 'Building entrance · Shared pool', sourceIndexes: [6, 6, 5] },
    { id: 'additional-photos', name: 'Additional photos', details: 'A few more details from around the home', sourceIndexes: [0, 1, 2] },
  ];

  // This flat sequence powers the Lightbox, so every image in the tour can
  // move through all other tour images using the keyboard or arrows.
  const tourPhotos = sections.flatMap((section, sectionIndex) =>
    section.sourceIndexes.map((sourceIndex, imageIndex) => {
      const source = photoAt(sourceIndex);
      return {
        ...source,
        id: `tour-${section.id}-${imageIndex}`,
        url: imageIndex === 0 ? source.url : EXTRA_PHOTOS[(sectionIndex + imageIndex) % EXTRA_PHOTOS.length],
        caption: `${section.name}${imageIndex ? ` ${imageIndex + 1}` : ''}`,
        subtext: section.details,
      };
    })
  );

  const goToSection = (id) => document.getElementById(`tour-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="photo-tour-overlay" role="dialog" aria-modal="true" aria-label="Photo tour">
      <header className="tour-header">
        <button className="tour-back-btn" type="button" onClick={onClose} aria-label="Close photo tour"><ChevronLeft size={28} /></button>
        <h1>Photo tour</h1>
        <div className="tour-actions">
          <button className="tour-icon-btn" type="button" aria-label="Share listing"><Share size={22} /></button>
          <button className="tour-icon-btn" type="button" onClick={onToggleSave} aria-label={isSaved ? 'Remove from saved' : 'Save listing'}><Heart size={22} color={isSaved ? '#ff385c' : '#222222'} fill={isSaved ? '#ff385c' : 'none'} /></button>
        </div>
      </header>

      <main className="tour-body-container">
        <nav className="tour-category-nav" aria-label="Photo categories">
          {sections.map((section) => (
            <button className="tour-category-card" type="button" key={section.id} onClick={() => goToSection(section.id)}>
              <img src={photoAt(section.sourceIndexes[0]).url} alt="" />
              <span>{section.name}</span>
            </button>
          ))}
        </nav>

        <div className="tour-section-list">
          {sections.map((section, sectionIndex) => (
            <section className="tour-photo-section" id={`tour-${section.id}`} key={section.id}>
              <div className="tour-section-label">
                <h2>{section.name}</h2>
                <p>{section.details}</p>
              </div>
              <div className="tour-section-images">
                {section.sourceIndexes.map((sourceIndex, imageIndex) => {
                  const photo = photoAt(sourceIndex);
                  const imageUrl = imageIndex === 0 ? photo.url : EXTRA_PHOTOS[(sectionIndex + imageIndex) % EXTRA_PHOTOS.length];
                  const lightboxPhotoIndex = sectionIndex * 3 + imageIndex;
                  return (
                    <button type="button" className={`tour-section-image ${imageIndex === 0 ? 'tour-image-featured' : ''}`} key={`${section.id}-${imageIndex}`} onClick={() => onOpenLightbox(lightboxPhotoIndex, tourPhotos)} aria-label={`View ${section.name} photo ${imageIndex + 1}`}>
                      <img src={imageUrl} alt={`${section.name} ${imageIndex + 1}`} />
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
