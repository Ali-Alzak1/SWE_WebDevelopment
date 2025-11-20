import React from 'react';
import Rating from '../Rating/Rating';
import './ProgramDetailModal.css';

const ProgramDetailModal = ({ program, onClose, onRatingSubmit, onOpenProgram }) => {
  if (!program) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOpenProgramClick = () => {
    if (onOpenProgram) {
      onOpenProgram(program.id);
      onClose(); // Close modal when opening program detail
    }
  };

  return (
    <div className="program-detail-modal__backdrop" onClick={handleBackdropClick}>
      <div className="program-detail-modal__content" role="dialog" aria-modal="true" aria-labelledby="program-detail-title">
        <div className="program-detail-modal__header">
          <h2 id="program-detail-title" className="program-detail-modal__title">{program.title}</h2>
          <button
            className="program-detail-modal__close"
            onClick={onClose}
            aria-label="Close program details"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="program-detail-modal__body">
          <div className="program-detail-modal__info">
            <p className="program-detail-modal__author">By {program.author}</p>
            <div className="program-detail-modal__rating-display">
              <span className="program-detail-modal__rating-label">Rating:</span>
              <span className="program-detail-modal__rating-value">{program.rating.toFixed(1)} / 5.0</span>
            </div>
            <p className="program-detail-modal__summary">{program.summary}</p>
          </div>

          <div className="program-detail-modal__rating-section">
            <Rating
              defaultValue={0}
              onChange={(value) => console.log('Rating changed:', value)}
              onSubmit={onRatingSubmit}
              size="md"
              label="What is your opinion on this workout?"
            />
          </div>

          <div className="program-detail-modal__actions">
            <button
              type="button"
              className="btn btn-primary program-detail-modal__action-btn"
              onClick={handleOpenProgramClick}
              aria-label="Open full program details"
            >
              Open Program
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailModal;

