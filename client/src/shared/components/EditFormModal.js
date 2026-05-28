import { useEffect, useRef } from 'react';
import { useBodyScrollLock } from '../../modules/home/hooks/useBodyScrollLock';
import '../styles/form-modal.css';

function EditFormModal({ open, onClose, title, subtitle, wide = false, children }) {
  const dialogRef = useRef(null);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    dialogRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="account-modal" role="presentation">
      <button
        type="button"
        className="account-modal__backdrop"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        className={`account-modal__panel eduhive-card${wide ? ' account-modal__panel--wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-form-modal-title"
        tabIndex={-1}
      >
        <div className="account-modal__header">
          <div>
            {subtitle && <span className="st-label">{subtitle}</span>}
            <h2 id="edit-form-modal-title" className="account-modal__title">
              {title}
            </h2>
          </div>
          <button type="button" className="account-modal__close" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="edit-form-modal__body">{children}</div>
      </div>
    </div>
  );
}

export default EditFormModal;
