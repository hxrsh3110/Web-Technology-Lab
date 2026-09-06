import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Component Mounting Lifecycle: Simulate API fetch / localStorage load
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedClients = JSON.parse(localStorage.getItem("apex_clients")) || [
        { id: 1, name: "Harsh Bankar", track: "Powerlifting Peaking", bmi: 24.1, status: "Active" },
        { id: 2, name: "Rohan Annam", track: "Hypertrophy Elite", bmi: 22.8, status: "Active" },
        { id: 3, name: "Vedant Garje", track: "Metabolic Conditioning", bmi: 25.4, status: "Scheduled" }
      ];
      setClients(savedClients);
      localStorage.setItem("apex_clients", JSON.stringify(savedClients));
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary">
        <div>
          <h3 className="fw-bold text-white mb-0">Coach Control Dashboard</h3>
          <p className="text-secondary small mb-0">Manage athlete intake rosters and active microcycles</p>
        </div>
        <Link to="/session" className="btn btn-primary fw-semibold">
          ⚡ Launch Live Session
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-5 text-secondary">Loading athlete roster...</div>
      ) : (
        <div className="card bg-dark border-secondary p-3 shadow-sm">
          <h5 className="fw-bold text-light mb-3">Enrolled Athletes (Local Store Hydration)</h5>
          <div className="table-responsive">
            <table className="table table-dark table-hover mb-0">
              <thead>
                <tr className="text-secondary border-secondary">
                  <th>#</th>
                  <th>Athlete Name</th>
                  <th>Training Track</th>
                  <th>Baseline BMI</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.id} className="border-secondary">
                    <td>{c.id}</td>
                    <td className="fw-semibold text-white">{c.name}</td>
                    <td><span className="badge bg-secondary">{c.track}</span></td>
                    <td className="text-info">{c.bmi}</td>
                    <td><span className="badge bg-success">{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;