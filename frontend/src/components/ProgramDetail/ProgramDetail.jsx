import React from 'react';
import ExerciseCreation from '../ExerciseCreation/ExerciseCreation';
import Rating from '../Rating/Rating';
import MuscleSelection from '../MuscleSelection/MuscleSelection';
import ExerciseSelection from '../ExerciseSelection/ExerciseSelection';
import { idGenerator } from '../../utils/idGenerator';
import './ProgramDetail.css';

const ProgramDetail = ({ programData, scheduleName, isEditable: initialIsEditable = false, onModify, onSave, programId, onRatingSubmit, isFromVault = false, onDelete }) => {
  const [days, setDays] = React.useState(programData?.days || []);
  const [activeDayId, setActiveDayId] = React.useState(days.length > 0 ? days[0].id : 1);
  const [name, setName] = React.useState(scheduleName || '');
  const [showRating, setShowRating] = React.useState(false);
  const [isEditable, setIsEditable] = React.useState(initialIsEditable);
  const [showMuscleSelection, setShowMuscleSelection] = React.useState(false);
  const [showExerciseSelection, setShowExerciseSelection] = React.useState(false);
  const [selectedMuscle, setSelectedMuscle] = React.useState(null);
  const [exerciseToEdit, setExerciseToEdit] = React.useState(null);

  // Keep local state in sync when programData changes (e.g., switching via sidebar quicklinks)
  React.useEffect(() => {
    const nextDays = programData?.days || [];
    setDays(nextDays);
    setActiveDayId(nextDays.length > 0 ? nextDays[0].id : 1);
    setName(scheduleName || '');
    // Reset rating visibility when switching programs
    setShowRating(false);
    // Reset editable state when program changes
    setIsEditable(initialIsEditable);
  }, [programData, scheduleName, initialIsEditable]);

  const activeDay = days.find(d => d.id === activeDayId);

  const handleDayClick = (dayId) => {
    setActiveDayId(dayId);
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        name: name || 'Untitled Schedule',
        days: days,
        isBuiltIn: !isEditable,
        programId: programId, // ✅ Always pass programId so save works even without modifying
        isModified: isEditable // ✅ Pass whether the program was modified
      });
    }
  };

  const handleModify = () => {
    // Enable editing mode locally - modify in place
    setIsEditable(true);
  };

  const handleRatingToggle = () => {
    setShowRating(!showRating);
  };

  const handleRatingSubmit = (ratingValue) => {
    if (onRatingSubmit && programId) {
      onRatingSubmit(programId, ratingValue);
      setShowRating(false);
    }
  };

  const handleShareProgram = () => {
    // Share program functionality - use the shareable link
    const programTitle = name || 'Untitled Schedule';
    const programUrl = programId 
      ? `${window.location.origin}/program/${programId}`
      : window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: programTitle,
        text: `Check out this workout program: ${programTitle}`,
        url: programUrl
      }).catch((err) => {
        console.log('Error sharing:', err);
        // Fallback to clipboard
        navigator.clipboard.writeText(programUrl).then(() => {
          alert('Program link copied to clipboard!');
        }).catch(() => {
          alert('Failed to copy link. Please copy manually: ' + programUrl);
        });
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(programUrl).then(() => {
        alert('Program link copied to clipboard!');
      }).catch(() => {
        alert('Failed to copy link. Please copy manually: ' + programUrl);
      });
    }
  };

  // Exercise management handlers (for modify mode)
  const handleAddExercise = () => {
    if (!isEditable) return;
    setShowMuscleSelection(true);
  };

  const handleMuscleSelect = (muscle) => {
    setSelectedMuscle(muscle);
    setShowMuscleSelection(false);
    setShowExerciseSelection(true);
  };

  const handleMuscleSelectionClose = () => {
    setShowMuscleSelection(false);
  };

  const handleExerciseSelect = (exercise) => {
    const exerciseId = idGenerator.getExerciseId();
    const newExercise = {
      id: exerciseId,
      name: exercise,
      muscle: selectedMuscle,
      unit: 'KG',
      sets: [
        { id: idGenerator.getSetId(), weight: '', reps: '' },
        { id: idGenerator.getSetId(), weight: '', reps: '' },
        { id: idGenerator.getSetId(), weight: '', reps: '' }
      ],
      notes: ''
    };

    const updatedDays = days.map(day => {
      if (day.id === activeDayId) {
        return {
          ...day,
          exercises: [...(day.exercises || []), newExercise]
        };
      }
      return day;
    });
    setDays(updatedDays);
    setShowExerciseSelection(false);
    setSelectedMuscle(null);
  };

  const handleExerciseSelectionBack = () => {
    setShowExerciseSelection(false);
    setShowMuscleSelection(true);
  };

  const handleExerciseSelectionClose = () => {
    setShowExerciseSelection(false);
    setSelectedMuscle(null);
  };

  const handleExerciseEdit = (exerciseId) => {
    if (!isEditable || !activeDay) return;
    const exercise = activeDay.exercises.find(ex => ex.id === exerciseId);
    if (exercise) {
      setExerciseToEdit(exercise);
      setSelectedMuscle(exercise.muscle);
      setShowExerciseSelection(true);
    }
  };

  const handleExerciseDelete = (exerciseId) => {
    if (!isEditable) return;
    const updatedDays = days.map(day => {
      if (day.id === activeDayId) {
        return {
          ...day,
          exercises: (day.exercises || []).filter(ex => ex.id !== exerciseId)
        };
      }
      return day;
    });
    setDays(updatedDays);
  };

  const handleExerciseUpdate = (exerciseId, updatedData) => {
    if (!isEditable) return;
    const updatedDays = days.map(day => {
      if (day.id === activeDayId) {
        return {
          ...day,
          exercises: (day.exercises || []).map(ex => {
            if (ex.id === exerciseId) {
              const updatedExercise = { ...ex, ...updatedData };
              // Ensure sets have valid unique IDs
              if (updatedData.sets && Array.isArray(updatedData.sets)) {
                const seenIds = new Set();
                updatedExercise.sets = updatedData.sets.map((set) => {
                  let setId = set.id;
                  if (!setId || typeof setId !== 'number' || setId <= 0) {
                    setId = idGenerator.getSetId();
                  }
                  while (seenIds.has(setId)) {
                    setId = idGenerator.getSetId();
                  }
                  seenIds.add(setId);
                  return {
                    id: setId,
                    weight: set.weight || '',
                    reps: set.reps || ''
                  };
                });
              }
              return updatedExercise;
            }
            return ex;
          })
        };
      }
      return day;
    });
    setDays(updatedDays);
  };

  const handleExerciseSelectForEdit = (exercise) => {
    if (exerciseToEdit) {
      const updatedDays = days.map(day => {
        if (day.id === activeDayId) {
          return {
            ...day,
            exercises: (day.exercises || []).map(ex =>
              ex.id === exerciseToEdit.id
                ? { ...ex, name: exercise, muscle: selectedMuscle }
                : ex
            )
          };
        }
        return day;
      });
      setDays(updatedDays);
      setExerciseToEdit(null);
    }
    setShowExerciseSelection(false);
    setSelectedMuscle(null);
  };

  // Show muscle/exercise selection screens when in modify mode
  if (isEditable && showMuscleSelection) {
    return (
      <MuscleSelection
        onSelect={handleMuscleSelect}
        onClose={handleMuscleSelectionClose}
      />
    );
  }

  if (isEditable && showExerciseSelection && selectedMuscle) {
    return (
      <ExerciseSelection
        muscle={selectedMuscle}
        onSelect={exerciseToEdit ? handleExerciseSelectForEdit : handleExerciseSelect}
        onBack={handleExerciseSelectionBack}
        onClose={handleExerciseSelectionClose}
      />
    );
  }

  return (
    <div className="program-detail">
      <div className="container">
        <div className="program-detail__header">
          <input
            type="text"
            className="program-detail__name-input"
            placeholder="Enter schedule name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly={!isEditable}
          />
        </div>

        <div className="program-detail__toolbar">
          <div className="program-detail__days">
            {days.map((day) => (
              <button
                key={day.id}
                type="button"
                className={`program-detail__day-btn ${activeDayId === day.id ? 'is-active' : ''}`}
                onClick={() => handleDayClick(day.id)}
              >
                Day {day.id}
              </button>
            ))}
          </div>
          <div className="program-detail__actions">
            {!isEditable ? (
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleModify}
              >
                Modify
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-outline-primary"
                disabled
                style={{ opacity: 0.6, cursor: 'not-allowed' }}
              >
                Modifying...
              </button>
            )}
            {programId && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleRatingToggle}
              >
                {showRating ? 'Hide Rating' : 'Rate Program'}
              </button>
            )}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleShareProgram}
            >
              Share Program
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save to Vault
            </button>
            {isFromVault && onDelete && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this program from your vault?')) {
                    onDelete(programId);
                  }
                }}
              >
                Delete Program
              </button>
            )}
          </div>
        </div>

        {showRating && programId && (
          <div className="program-detail__rating-section">
            <Rating
              defaultValue={0}
              onChange={(value) => console.log('Rating changed:', value)}
              onSubmit={handleRatingSubmit}
              size="md"
              label="What is your opinion on this workout?"
            />
          </div>
        )}

        <div className="program-detail__content">
          {activeDay && activeDay.exercises && activeDay.exercises.length > 0 ? (
            <div className="program-detail__exercises">
              {isEditable && (
                <div className="program-detail__exercises-header" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3>Exercises</h3>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handleAddExercise}
                  >
                    + Add Exercise
                  </button>
                </div>
              )}
              <div className="program-detail__exercise-list">
                {activeDay.exercises.map((exercise) => (
                  <ExerciseCreation
                    key={exercise.id}
                    exercise={exercise}
                    muscle={exercise.muscle}
                    onEdit={isEditable ? () => handleExerciseEdit(exercise.id) : undefined}
                    onDelete={isEditable ? () => handleExerciseDelete(exercise.id) : undefined}
                    onShare={undefined}
                    onUpdate={isEditable ? (updatedData) => handleExerciseUpdate(exercise.id, updatedData) : undefined}
                    isEditable={isEditable}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="program-detail__empty">
              <p>No exercises in this day.</p>
              {isEditable && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddExercise}
                  style={{ marginTop: '1rem' }}
                >
                  + Add Exercise
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;

