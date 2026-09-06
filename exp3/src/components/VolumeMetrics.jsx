import React from 'react';

function VolumeMetrics({ totalVolume, totalSetsCompleted, activeExercisesCount }) {
  return (
    <div className="card bg-dark border-secondary p-3 mb-4 shadow-sm">
      <div className="row text-center g-3">
        <div className="col-md-4">
          <small className="text-secondary text-uppercase fw-semibold">Total Session Volume</small>
          <h3 className="text-info fw-bold mb-0 mt-1">{totalVolume.toLocaleString()} kg</h3>
        </div>
        <div className="col-md-4 border-start border-end border-secondary">
          <small className="text-secondary text-uppercase fw-semibold">Completed Sets</small>
          <h3 className="text-success fw-bold mb-0 mt-1">{totalSetsCompleted}</h3>
        </div>
        <div className="col-md-4">
          <small className="text-secondary text-uppercase fw-semibold">Active Movements</small>
          <h3 className="text-warning fw-bold mb-0 mt-1">{activeExercisesCount}</h3>
        </div>
      </div>
    </div>
  );
}

export default VolumeMetrics;