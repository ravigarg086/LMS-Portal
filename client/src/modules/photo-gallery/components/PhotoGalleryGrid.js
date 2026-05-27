import { useState } from 'react';
import LightboxModal from './LightboxModal';

function PhotoGalleryGrid({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const openLightbox = (index) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);

  const navigateLightbox = (direction) => {
    setActiveIndex((current) => {
      if (current === null) {
        return null;
      }
      return (current + direction + items.length) % items.length;
    });
  };

  return (
    <article className="eduhive-card role-panel photo-gallery-panel">
      <header className="photo-gallery-panel__header">
        <span className="st-label">Live Virtual Class</span>
        <h2 id="photo-gallery-heading" className="photo-gallery-panel__title">
          Course Photo Gallery
        </h2>
        <p className="role-panel__desc mb-0">
          Course images are generated dynamically from the LMS catalog. Select a photo to open the lightbox preview.
        </p>
      </header>

      <div className="row g-3 photo-gallery-grid" aria-labelledby="photo-gallery-heading">
        {items.map((item, index) => (
          <div key={item.id} className="col-6 col-md-4 col-lg-3">
            <button
              type="button"
              className="photo-gallery-card"
              onClick={() => openLightbox(index)}
              aria-label={`Open ${item.title} in lightbox`}
            >
              <span className="photo-gallery-card__media st-grayscale">
                <img src={item.imageUrl} alt={item.alt} loading="lazy" className="photo-gallery-card__image" />
              </span>
              <span className="photo-gallery-card__body">
                <span className="photo-gallery-card__stack">{item.stack}</span>
                <span className="photo-gallery-card__title">{item.title}</span>
              </span>
            </button>
          </div>
        ))}
      </div>

      <p className="photo-gallery-panel__meta mb-0">Showing {items.length} course photos from {new Set(items.map((i) => i.stack)).size} tracks.</p>

      <LightboxModal
        items={items}
        activeIndex={activeIndex}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </article>
  );
}

export default PhotoGalleryGrid;
