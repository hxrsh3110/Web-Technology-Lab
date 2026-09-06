import React, { useState, useEffect } from 'react';
import ExerciseCard from '../components/ExerciseCard';

function ActiveSession({ onAddLog }) {
  const [seconds, setSeconds] = useState(0);
  const [sessionVolume, setSessionVolume] = useState(0);
  const [completedSetsCount, setCompletedSetsCount] = useState(0);

  // Lifecycle Demonstration: Timer Mounting, Updating & Cleanup on Unmount
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval); // Unmount cleanup prevents memory leaks
    };
  }, []);

  const formatTimer = (totalSeconds) => {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleLogSet = (name, weight, reps) => {
    const volume = weight * reps;
    setSessionVolume(v => v + volume);
    setCompletedSetsCount(s => s + 1);

    const logEntry = {
      id: Date.now(),
      exercise: name,
      weight,
      reps,
      volume,
      time: new Date().toLocaleTimeString()
    };
    onAddLog(logEntry);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary">
        <div>
          <h3 className="fw-bold text-white mb-0">Active Training Floor</h3>
          <p className="text-secondary small mb-0">Athlete: Harsh Bankar • Powerlifting Track</p>
        </div>
        <div className="text-end">
          <small className="text-secondary d-block">Session Elapsed</small>
          <span className="badge bg-dark border border-secondary text-warning fs-5">
            ⏱ {formatTimer(seconds)}
          </span>
        </div>
      </div>

      <div className="row g-3 mb-4 text-center">
        <div className="col-md-6">
          <div className="card bg-dark border-secondary p-3">
            <small className="text-secondary text-uppercase">Cumulative Volume</small>
            <h2 className="text-info fw-bold mb-0">{sessionVolume.toLocaleString()} kg</h2>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card bg-dark border-secondary p-3">
            <small className="text-secondary text-uppercase">Total Sets Completed</small>
            <h2 className="text-success fw-bold mb-0">{completedSetsCount}</h2>
          </div>
        </div>
      </div>

      <div className="row">
        <ExerciseCard name="Competition Squat" muscle="Legs" targetWeight={120} reps={5} onLogSet={handleLogSet} />
        <ExerciseCard name="Bench Press (Pause)" muscle="Chest" targetWeight={85} reps={5} onLogSet={handleLogSet} />
        <ExerciseCard name="Deadlift (Conventional)" muscle="Back" targetWeight={150} reps={3} onLogSet={handleLogSet} />
      </div>
    </div>
  );
}

export default ActiveSession;