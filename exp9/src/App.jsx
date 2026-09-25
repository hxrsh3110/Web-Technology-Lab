import React, { useState, useEffect } from 'react';
import { fetchAthletes, createAthlete, deleteAthlete } from './api/athleteApi';
import AthleteForm from './components/AthleteForm';
import AthleteTable from './components/AthleteTable';

function App() {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  // Component Mount: Fetch athletes via Axios GET from Express
  const loadAthletes = async () => {
    try {
      setLoading(true);
      const res = await fetchAthletes();
      setAthletes(res.data.data);
    } catch (err) {
      showAlert('Failed to connect to backend server on port 5000.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAthletes();
  }, []);

  // Handle Create Athlete via Axios POST
  const handleAthleteAdded = async (formData) => {
    const res = await createAthlete(formData);
    setAthletes((prev) => [res.data.data, ...prev]);
    showAlert(`Athlete ${res.data.data.fullName} enrolled successfully via Express API.`);
  };

  // Handle Delete Athlete via Axios DELETE
  const handleDeleteAthlete = async (id) => {
    if (!window.confirm("Confirm deletion from MongoDB?")) return;
    try {
      await deleteAthlete(id);
      setAthletes((prev) => prev.filter((a) => a._id !== id));
      showAlert("Athlete record successfully deleted from database.");
    } catch (err) {
      showAlert("Deletion failed: " + (err.response?.data?.message || err.message), 'danger');
    }
  };

  return (
    <div className="min-vh-100 bg-black text-light py-4">
      <div className="container">
      
        <header className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom border-secondary">
          <div>
            <h3 className="fw-bold text-primary mb-0">⚡ ApexFit Studio OS</h3>
            <small className="text-secondary">Full-Stack Client-Server Integration (React + Express + Axios)</small>
          </div>
          <span className="badge bg-success py-2 px-3">Backend Connected: Port 5000</span>
        </header>

        {alert && (
          <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            {alert.message}
          </div>
        )}

        
        <AthleteForm onAthleteAdded={handleAthleteAdded} />
        <AthleteTable 
          athletes={athletes} 
          loading={loading} 
          onDeleteAthlete={handleDeleteAthlete} 
        />
      </div>
    </div>
  );
}

export default App;