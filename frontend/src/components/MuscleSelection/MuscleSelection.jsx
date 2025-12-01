import React from 'react';
import './MuscleSelection.css';

const defaultMuscles = [
  'ABS',
  'Back',
  'Biceps',
  'Chest',
  'Legs',
  'Shoulders',
  'Triceps',
  'Forearms',
  'Cardio',
  'Mobility'
];

const MuscleSelection = ({ onSelect, onClose }) => {
  const handleMuscleClick = (muscle) => {
    if (onSelect) {
      onSelect(muscle);
    }
  };

  return (
    <div className="muscle-selection">
      <div className="muscle-selection__header">
        <button
          type="button"
          className="muscle-selection__close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <h1 className="muscle-selection__title">Select a Muscle or category</h1>
      </div>

      <div className="muscle-selection__list">
        {defaultMuscles.map((muscle) => (
          <button
            key={muscle}
            type="button"
            className="muscle-selection__item"
            onClick={() => handleMuscleClick(muscle)}
          >
            <span>{muscle}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MuscleSelection;

