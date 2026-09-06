import React, { useState } from 'react';

function ExerciseCard({ name, muscle, targetWeight, reps, onLogSet }) {
  const [sets, setSets] = useState(0);
  const [weight, setWeight] = useState(targetWeight);

  const handleAddSet = () => {
    setSets(prev => prev + 1);
    onLogSet(name, weight, reps);
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card h-100 bg-dark text-light border border-secondary p-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="fw-bold mb-0 text-white">{name}</h6>
          <span className="badge bg-secondary">{muscle}</span>
        </div>
        <p className="text-secondary small mb-3">Target: {reps} reps / set</p>
        
        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="small text-secondary">Load:</span>
          <button className="btn btn-sm btn-outline-secondary text-light" onClick={() => setWeight(w => Math.max(0, w - 2.5))}>-2.5</button>
          <span className="fw-bold text-info px-2">{weight} kg</span>
          <button className="btn btn-sm btn-outline-secondary text-light" onClick={() => setWeight(w => w + 2.5)}>+2.5</button>
        </div>

        <div className="p-2 mb-3 bg-black rounded border border-secondary text-center">
          <small className="text-secondary d-block">Sets Completed</small>
          <span className="fs-5 fw-bold text-success">{sets}</span>
        </div>

        <button className="btn btn-primary btn-sm fw-semibold" onClick={handleAddSet}>
          + Log Set ({weight * reps} kg)
        </button>
      </div>
    </div>
  );
}

export default ExerciseCard;