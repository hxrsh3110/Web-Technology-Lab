import React, { useState } from 'react';
import ExerciseCard from './components/ExerciseCard';
import VolumeMetrics from './components/VolumeMetrics';

function App() {
  // Master State for overall session volume & total completed sets
  const [totalVolume, setTotalVolume] = useState(0);
  const [totalSetsCompleted, setTotalSetsCompleted] = useState(0);

  // Exercise inventory passed down via Props
  const exercises = [
    { id: 1, name: "Barbell Back Squat", targetMuscle: "Quadriceps", defaultWeight: 100, targetReps: 5 },
    { id: 2, name: "Incline Dumbbell Press", targetMuscle: "Upper Chest", defaultWeight: 32, targetReps: 8 },
    { id: 3, name: "Romanian Deadlift", targetMuscle: "Hamstrings", defaultWeight: 90, targetReps: 8 }
  ];

  const handleLogSet = (volumeAdded) => {
    setTotalVolume(prev => prev + volumeAdded);
    setTotalSetsCompleted(prev => prev + 1);
  };

  const handleResetSession = () => {
    setTotalVolume(0);
    setTotalSetsCompleted(0);
  };

  return (
    <div className="min-vh-100 bg-black text-light py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom border-secondary">
          <div>
            <span className="badge bg-primary mb-1">ApexFit Studio OS • React Core</span>
            <h2 className="fw-bold mb-0">Active Workout Session Tracker</h2>
          </div>
          <button className="btn btn-outline-warning btn-sm" onClick={handleResetSession}>
            Clear Session State
          </button>
        </div>

        <VolumeMetrics 
          totalVolume={totalVolume} 
          totalSetsCompleted={totalSetsCompleted} 
          activeExercisesCount={exercises.length} 
        />

        <h5 className="fw-bold text-secondary mb-3">Target Prescription Movements</h5>
        <div className="row">
          {exercises.map((item) => (
            <ExerciseCard 
              key={item.id}
              id={item.id}
              name={item.name}
              targetMuscle={item.targetMuscle}
              defaultWeight={item.defaultWeight}
              targetReps={item.targetReps}
              onLogSet={handleLogSet}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;