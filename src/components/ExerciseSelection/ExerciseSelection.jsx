import React from 'react';
import './ExerciseSelection.css';

// Dummy exercise data - in real app this would come from API
const exerciseDatabase = {
  'Chest': [
    'Bench Press',
    'Cable Crossovers',
    'Dumbbell Press',
    'Dumbbell Flies',
    'Flies Machine',
    'Incline Bench Press',
    'Incline Dumbbell Press',
    'Incline Flies Machine',
    'Push ups'
  ],
  'Back': [
    'Pull-ups',
    'Lat Pulldown',
    'Barbell Row',
    'Dumbbell Row',
    'Cable Row',
    'Deadlift',
    'T-Bar Row'
  ],
  'Legs': [
    'Squat',
    'Leg Press',
    'Leg Curl',
    'Leg Extension',
    'Lunges',
    'Romanian Deadlift',
    'Calf Raise'
  ],
  'Shoulders': [
    'Overhead Press',
    'Lateral Raise',
    'Front Raise',
    'Rear Delt Fly',
    'Shrugs'
  ],
  'Biceps': [
    'Barbell Curl',
    'Dumbbell Curl',
    'Hammer Curl',
    'Cable Curl',
    'Preacher Curl'
  ],
  'Triceps': [
    'Tricep Dips',
    'Overhead Extension',
    'Cable Pushdown',
    'Close Grip Bench Press',
    'Skull Crushers'
  ],
  'ABS': [
    'Crunches',
    'Plank',
    'Leg Raises',
    'Russian Twists',
    'Mountain Climbers'
  ],
  'Forearms': [
    'Wrist Curl',
    'Reverse Wrist Curl',
    'Farmer\'s Walk'
  ],
  'Cardio': [
    'Running',
    'Cycling',
    'Rowing',
    'Elliptical',
    'Jump Rope'
  ],
  'Mobility': [
    'Stretching',
    'Foam Rolling',
    'Yoga Flow',
    'Dynamic Warm-up'
  ]
};

const ExerciseSelection = ({ muscle, onSelect, onBack, onClose }) => {
  const exercises = exerciseDatabase[muscle] || [];

  const handleExerciseClick = (exercise) => {
    if (onSelect) {
      onSelect(exercise);
    }
  };

  return (
    <div className="exercise-selection">
      <div className="exercise-selection__header">
        <button
          type="button"
          className="exercise-selection__back-btn"
          onClick={onBack}
          aria-label="Back to muscle selection"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1 className="exercise-selection__title">{muscle}</h1>
      </div>

      <p className="exercise-selection__subtitle">Select an exercise</p>

      <div className="exercise-selection__list">
        {exercises.map((exercise) => (
          <button
            key={exercise}
            type="button"
            className="exercise-selection__item"
            onClick={() => handleExerciseClick(exercise)}
          >
            <span>{exercise}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExerciseSelection;

