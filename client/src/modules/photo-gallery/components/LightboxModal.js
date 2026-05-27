import { useCallback, useEffect, useRef } from 'react';
import { useBodyScrollLock } from '../../home/hooks/useBodyScrollLock';

function LightboxModal({ items, activeIndex, onClose, onNavigate }) {
  const closeButtonRef = useRef(null);

  useBodyScrollLock(activeIndex !== null);

  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  const handleKeyDown = useCallback(
    (event) => {
      if (activeIndex === null) {
        return;
      }
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'ArrowRight') {
        onNavigate(1);
      }
      if (event.key === 'ArrowLeft') {
        onNavigate(-1);
      }
    },
    [activeIndex, onClose, onNavigate],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (activeIndex !== null) {
      closeButtonRef.current?.focus();
    }
  }, [activeIndex]);

  if (!activeItem) {
    return null;
  }

  return (
    <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label={`${activeItem.title} photo preview`}>
      <button type="button" className="photo-lightbox__backdrop" aria-label="Close gallery preview" onClick={onClose} />
      <div className="photo-lightbox__panel eduhive-card">
        <button
          ref={closeButtonRef}
          type="button"
          className="photo-lightbox__close"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
        <figure className="photo-lightbox__figure mb-0">
          <img src={activeItem.imageUrl} alt={activeItem.alt} className="photo-lightbox__image" />
          <figcaption className="photo-lightbox__caption">
            <span className="st-label">{activeItem.stack}</span>
            <strong>{activeItem.title}</strong>
          </figcaption>
        </figure>
        <div className="photo-lightbox__controls">
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => onNavigate(-1)}>
            Previous
          </button>
          <span className="photo-lightbox__counter">
            {activeIndex + 1} / {items.length}
          </span>
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => onNavigate(1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default LightboxModal;
