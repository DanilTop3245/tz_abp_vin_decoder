import React, { useState } from 'react';

export default function VinForm({ onSubmit, isLoading }) {
  const [vin, setVin] = useState('');
  const [error, setError] = useState('');

  const validateVin = (value) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return 'VIN cannot be empty.';
    }

    if (trimmed.length > 17) {
      return `VIN cannot exceed 17 characters (current length: ${trimmed.length}).`;
    }

    if (!/^[a-zA-Z0-9]*$/.test(trimmed)) {
      return 'Only letters and numbers are allowed.';
    }

    if (/[ioqIOQ]/.test(trimmed)) {
      return 'Letters I, O, and Q are invalid in VIN codes.';
    }

    return '';
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setVin(value);
    if (error) {
      setError(validateVin(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateVin(vin);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    onSubmit(vin.trim().toUpperCase());
  };

  return (
    <section className="card">
      <h2>Decode VIN</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="vinInput" className="form-label">
            Enter 17-character VIN
          </label>
          <div className="form-control-wrapper">
            <input
              id="vinInput"
              type="text"
              className={`form-control ${error ? 'is-invalid' : ''}`}
              placeholder="e.g. 1FTFW1CT5DFC10312"
              value={vin}
              onChange={handleChange}
              disabled={isLoading}
              autoComplete="off"
            />
          </div>
          <div id="vinError" className="invalid-feedback" role="alert">
            {error}
          </div>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={isLoading || !vin.trim()}
          style={{ width: '100%' }}
        >
          {isLoading ? 'Decoding...' : 'Decode'}
        </button>
      </form>
    </section>
  );
}
