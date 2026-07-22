import React, { useState, useEffect } from 'react';
import VariablesList from '../components/VariablesList';
import { getVariablesList } from '../services/api';

export default function Variables() {
  const [variables, setVariables] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVariables = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await getVariablesList();
        setVariables(data.Results || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load variables list. Please try reloading the page.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVariables();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Vehicle Variables Directory</h1>
        <p style={{ margin: 0 }}>
          This directory lists all technical features and parameters defined in the NHTSA database. Use the search box below to filter.
        </p>
      </div>

      {isLoading ? (
        <div className="loading-container card">
          <div className="loading-spinner"></div>
          <p style={{ margin: 0 }}>Loading variables database...</p>
        </div>
      ) : error ? (
        <div className="api-message error-message card">
          <strong>Error:</strong> {error}
        </div>
      ) : (
        <VariablesList variables={variables} />
      )}
    </div>
  );
}
