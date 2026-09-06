import React from 'react';

function Analytics({ logs, onClearLogs }) {
  const totalVolume = logs.reduce((acc, curr) => acc + curr.volume, 0);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary">
        <div>
          <h3 className="fw-bold text-white mb-0">Session Audit & Analytics</h3>
          <p className="text-secondary small mb-0">Persistent session logs saved via localStorage</p>
        </div>
        {logs.length > 0 && (
          <button className="btn btn-outline-danger btn-sm" onClick={onClearLogs}>
            Clear Stored Logs
          </button>
        )}
      </div>

      <div className="card bg-dark border-secondary p-3 mb-4">
        <div className="d-flex justify-content-between">
          <span>Logged Set Entries: <strong className="text-white">{logs.length}</strong></span>
          <span>Aggregated Workload: <strong className="text-info">{totalVolume.toLocaleString()} kg</strong></span>
        </div>
      </div>

      <div className="card bg-dark border-secondary p-3">
        <h6 className="fw-bold text-light mb-3">Live Log Registry</h6>
        {logs.length === 0 ? (
          <p className="text-secondary mb-0">No sets logged yet. Navigate to 'Active Session' to log work.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-dark table-sm table-striped mb-0">
              <thead>
                <tr className="text-secondary border-secondary">
                  <th>Timestamp</th>
                  <th>Movement</th>
                  <th>Load (kg)</th>
                  <th>Reps</th>
                  <th>Volume (kg)</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-secondary">
                    <td>{log.time}</td>
                    <td className="text-white">{log.exercise}</td>
                    <td>{log.weight}</td>
                    <td>{log.reps}</td>
                    <td className="text-info fw-semibold">{log.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Analytics;