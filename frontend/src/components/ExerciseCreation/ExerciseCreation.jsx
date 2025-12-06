import React, { useState } from 'react';
import './ExerciseCreation.css';
import { idGenerator } from '../../utils/idGenerator';

const ExerciseCreation = ({
  exercise: exerciseData,
  muscle,
  onEdit,
  onDelete,
  onShare,
  onUpdate,
  isEditable = true
}) => {
  const [unit, setUnit] = useState(exerciseData?.unit || 'KG');
  const [sets, setSets] = useState(exerciseData?.sets || [
    { id: idGenerator.getSetId(), weight: '', reps: '' },
    { id: idGenerator.getSetId(), weight: '', reps: '' },
    { id: idGenerator.getSetId(), weight: '', reps: '' }
  ]);
  const [notes, setNotes] = useState(exerciseData?.notes || '');
  const [showExerciseMenu, setShowExerciseMenu] = useState(false);

  const exerciseName = exerciseData?.name || exerciseData || '';

  const handleAddSet = () => {
    const newSet = {
      id: idGenerator.getSetId(),
      weight: '',
      reps: ''
    };
    const updatedSets = [...sets, newSet];
    setSets(updatedSets);
    if (onUpdate) {
      onUpdate({ sets: updatedSets, unit, notes });
    }
  };

  const handleDeleteSet = (setId) => {
    const newSets = sets.filter(s => s.id !== setId);
    setSets(newSets);
    if (onUpdate) {
      onUpdate({ sets: newSets, unit, notes });
    }
  };

  const handleSetChange = (setId, field, value) => {
    const newSets = sets.map(set =>
      set.id === setId ? { ...set, [field]: value } : set
    );
    setSets(newSets);
    if (onUpdate) {
      onUpdate({ sets: newSets, unit, notes });
    }
  };

  const handleUnitToggle = () => {
    const newUnit = unit === 'KG' ? 'LBS' : 'KG';
    setUnit(newUnit);
    if (onUpdate) {
      onUpdate({ sets, unit: newUnit, notes });
    }
  };

  const handleNotesChange = (value) => {
    setNotes(value);
    if (onUpdate) {
      onUpdate({ sets, unit, notes: value });
    }
  };

  const handleEdit = () => {
    setShowExerciseMenu(false);
    if (onEdit) {
      onEdit();
    }
  };

  const handleDelete = () => {
    setShowExerciseMenu(false);
    if (onDelete) {
      onDelete();
    }
  };


  return (
    <div className="exercise-creation">
      <div className="exercise-creation__header">
        <div className="exercise-creation__title-section">
          <h2 className="exercise-creation__title">{exerciseName}</h2>
          <p className="exercise-creation__subtitle">{sets.length} sets 6-8 reps</p>
        </div>
        <div className="exercise-creation__controls">
          <div className="exercise-creation__unit-toggle">
            <button
              type="button"
              className={`exercise-creation__unit-btn ${unit === 'KG' ? 'is-active' : ''}`}
              onClick={handleUnitToggle}
              disabled={!isEditable}
            >
              KG
            </button>
            <button
              type="button"
              className={`exercise-creation__unit-btn ${unit === 'LBS' ? 'is-active' : ''}`}
              onClick={handleUnitToggle}
              disabled={!isEditable}
            >
              LBS
            </button>
          </div>
          <div className="exercise-creation__menu-wrapper">
            <button
              type="button"
              className="exercise-creation__menu-btn"
              onClick={() => setShowExerciseMenu(!showExerciseMenu)}
              aria-label="Exercise options"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
            {showExerciseMenu && (
              <>
                <div
                  className="exercise-creation__menu-backdrop"
                  onClick={() => setShowExerciseMenu(false)}
                />
                <div className="exercise-creation__menu">
                  <button
                    type="button"
                    className="exercise-creation__menu-item"
                    onClick={handleEdit}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Edit Exercise
                  </button>
                  <button
                    type="button"
                    className="exercise-creation__menu-item"
                    onClick={handleDelete}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="exercise-creation__sets">
        <div className="exercise-creation__sets-header">
          <span className="exercise-creation__header-weight">Weight</span>
          <span className="exercise-creation__header-reps">Reps</span>
        </div>
        {sets.map((set, index) => (
          <div key={set.id} className="exercise-creation__set-row">
            <span className="exercise-creation__set-number">{index + 1}</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="exercise-creation__set-input"
              placeholder="0"
              value={set.weight}
              onChange={(e) => {
                if (isEditable) {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  handleSetChange(set.id, 'weight', value);
                }
              }}
              readOnly={!isEditable}
            />
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="exercise-creation__set-input"
              placeholder="0"
              value={set.reps}
              onChange={(e) => {
                if (isEditable) {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  handleSetChange(set.id, 'reps', value);
                }
              }}
              readOnly={!isEditable}
            />
            <button
              type="button"
              className="exercise-creation__delete-set-btn"
              onClick={() => handleDeleteSet(set.id)}
              disabled={!isEditable}
              aria-label={`Delete set ${index + 1}`}
            >
              Delete Set
            </button>
          </div>
        ))}
        <div className="exercise-creation__add-set">
          <button
            type="button"
            className="exercise-creation__add-set-btn"
            onClick={handleAddSet}
            disabled={!isEditable}
          >
            Add Set
          </button>
        </div>
      </div>

      <div className="exercise-creation__notes">
        <textarea
          className="exercise-creation__notes-input"
          placeholder="Add notes here..."
          value={notes}
          onChange={(e) => {
            if (isEditable) {
              handleNotesChange(e.target.value);
            }
          }}
          readOnly={!isEditable}
        />
      </div>
    </div>
  );
};

export default ExerciseCreation;

