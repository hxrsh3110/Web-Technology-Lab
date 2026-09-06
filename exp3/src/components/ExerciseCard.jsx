import React, { useState } from 'react';

function ExerciseCard({ id, name, targetMuscle, defaultWeight, targetReps, onLogSet }) {
  const [setsCompleted, setSetsCompleted] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(defaultWeight);

  const handleAddSet = () => {
    const nextSet = setsCompleted + 1;
    setSetsCompleted(nextSet);
    // Notify parent state of newly moved volume: Weight * Reps
    onLogSet(currentWeight * targetReps);
  };

  const handleResetSets = () => {
    setSetsCompleted(0);
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card h-100 bg-dark text-light border border-secondary shadow-sm">
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h5 className="card-title fw-bold text-white mb-0">{name}</h5>
              <span className="badge bg-secondary">{targetMuscle}</span>
            </div>
            <p className="text-secondary small mb-3">Target: {targetReps} reps per set</p>

            <div className="mb-3">
              <label className="form-label small text-secondary">Working Load (kg):</label>
              <div className="input-group input-group-sm">
                <button 
                  className="btn btn-outline-secondary text-light" 
                  onClick={() => setCurrentWeight(prev => Math.max(0, prev - 2.5))}
                >
                  -2.5
                </button>
                <input 
                  type="number" 
                  className="form-control text-center bg-black text-info border-secondary" 
                  value={currentWeight} 
                  onChange={(e) => setCurrentWeight(parseFloat(e.target.value) || 0)} 
                />
                <button 
                  className="btn btn-outline-secondary text-light" 
                  onClick={() => setCurrentWeight(prev => prev + 2.5)}
                >
                  +2.5
                </button>
              </div>
            </div>

            <div className="p-2 mb-3 rounded bg-black border border-secondary text-center">
              <span className="small text-secondary d-block">Sets Completed</span>
              <span className="fs-4 fw-bold text-success">{setsCompleted}</span>
            </div>
          </div>

          <div className="d-grid gap-2">
            <button className="btn btn-primary btn-sm fw-semibold" onClick={handleAddSet}>
              + Log Completed Set
            </button>
            {setsCompleted > 0 && (
              <button className="btn btn-outline-danger btn-sm" onClick={handleResetSets}>
                Reset Sets
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseCard;