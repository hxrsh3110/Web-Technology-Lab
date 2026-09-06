import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ActiveSession from './pages/ActiveSession';
import Analytics from './pages/Analytics';

function App() {
  // Global persistent logs state managed via localStorage
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem("apex_workout_logs");
    return saved ? JSON.parse(saved) : [];
  });

  // Lifecycle side-effect: Sync logs state with localStorage on every log change
  useEffect(() => {
    localStorage.setItem("apex_workout_logs", JSON.stringify(logs));
  }, [logs]);

  const handleAddLog = (newEntry) => {
    setLogs(prev => [newEntry, ...prev]);
  };

  const handleClearLogs = () => {
    setLogs([]);
    localStorage.removeItem("apex_workout_logs");
  };

  return (
    <BrowserRouter>
      <div className="min-vh-100 bg-black text-light">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/session" element={<ActiveSession onAddLog={handleAddLog} />} />
          <Route path="/analytics" element={<Analytics logs={logs} onClearLogs={handleClearLogs} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;