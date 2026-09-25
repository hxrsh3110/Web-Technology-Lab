import React from 'react';

function AthleteTable({ athletes, loading, onDeleteAthlete }) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="text-secondary small mt-2">Fetching live database roster via Express...</p>
      </div>
    );
  }

  if (athletes.length === 0) {
    return (
      <div className="alert alert-dark text-center text-secondary border-secondary">
        No athletes enrolled yet in database. Use the form above to register athletes.
      </div>
    );
  }

  return (
    <div className="card bg-dark text-light border-secondary p-3 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Active Athlete Directory</h5>
        <span className="badge bg-primary">Connected to apexfit_db ({athletes.length} Records)</span>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle mb-0">
          <thead>
            <tr className="text-secondary border-secondary small">
              <th>Full Name</th>
              <th>Email</th>
              <th>Track</th>
              <th>Biometrics</th>
              <th>Server-Calculated BMI</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {athletes.map((athlete) => (
              <tr key={athlete._id} className="border-secondary">
                <td className="fw-semibold text-white">{athlete.fullName}</td>
                <td className="text-secondary small">{athlete.email}</td>
                <td><span className="badge bg-secondary">{athlete.tier}</span></td>
                <td className="small">{athlete.biometrics?.heightCm} cm / {athlete.biometrics?.weightKg} kg</td>
                <td>
                  <span className="badge bg-info text-dark fw-bold">
                    {athlete.biometrics?.bmi}
                  </span>
                </td>
                <td className="text-end">
                  <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => onDeleteAthlete(athlete._id)}
                  >
                    Delete (Axios)
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AthleteTable;