import React, { useState } from 'react';

function AthleteForm({ onAthleteAdded }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    heightCm: '',
    weightKg: '',
    tier: 'Foundation Strength'
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    try {
      await onAthleteAdded({
        ...formData,
        age: Number(formData.age),
        heightCm: Number(formData.heightCm),
        weightKg: Number(formData.weightKg)
      });

      // Reset form on success
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        age: '',
        heightCm: '',
        weightKg: '',
        tier: 'Foundation Strength'
      });
    } catch (err) {
      setFormError(err.response?.data?.message || 'Error communicating with backend service.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card bg-dark text-light border-secondary p-3 shadow-sm mb-4">
      <h5 className="fw-bold text-primary mb-3">⚡ Enrol New Athlete (Axios POST)</h5>
      
      {formError && (
        <div className="alert alert-danger py-2 small mb-3">{formError}</div>
      )}

      <form onSubmit={handleSubmit} className="row g-2">
        <div className="col-md-4">
          <label className="form-label small text-secondary">Full Name</label>
          <input type="text" name="fullName" className="form-control form-control-sm bg-black text-light border-secondary" required value={formData.fullName} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label small text-secondary">Email</label>
          <input type="email" name="email" className="form-control form-control-sm bg-black text-light border-secondary" required value={formData.email} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label small text-secondary">Phone</label>
          <input type="tel" name="phone" className="form-control form-control-sm bg-black text-light border-secondary" required value={formData.phone} onChange={handleChange} />
        </div>

        <div className="col-md-3">
          <label className="form-label small text-secondary">Age</label>
          <input type="number" name="age" className="form-control form-control-sm bg-black text-light border-secondary" required min="16" max="90" value={formData.age} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <label className="form-label small text-secondary">Height (cm)</label>
          <input type="number" name="heightCm" className="form-control form-control-sm bg-black text-light border-secondary" required value={formData.heightCm} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <label className="form-label small text-secondary">Weight (kg)</label>
          <input type="number" name="weightKg" className="form-control form-control-sm bg-black text-light border-secondary" required value={formData.weightKg} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <label className="form-label small text-secondary">Track</label>
          <select name="tier" className="form-select form-select-sm bg-black text-light border-secondary" value={formData.tier} onChange={handleChange}>
            <option value="Foundation Strength">Foundation Strength</option>
            <option value="Hypertrophy Elite">Hypertrophy Elite</option>
            <option value="Metabolic Conditioning">Metabolic Conditioning</option>
            <option value="Powerlifting Peaking">Powerlifting Peaking</option>
          </select>
        </div>

        <div className="col-12 mt-3 text-end">
          <button type="submit" className="btn btn-primary btn-sm fw-semibold px-4" disabled={submitting}>
            {submitting ? 'Transmitting...' : '+ Register Athlete via API'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AthleteForm;