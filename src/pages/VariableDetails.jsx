import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVariablesList } from '../services/api';

export default function VariableDetails() {
  const { variableId } = useParams();
  const [variable, setVariable] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVariableDetail = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await getVariablesList();
        const list = data.Results || [];
        const found = list.find((item) => item.ID.toString() === variableId);
        
        if (found) {
          setVariable(found);
        } else {
          setError(`Variable with ID ${variableId} was not found.`);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load variable details. Please check your connection.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVariableDetail();
  }, [variableId]);

  return (
    <div>
      <Link to="/variables" className="back-link">
        &larr; Back to list
      </Link>

      {isLoading ? (
        <div className="loading-container card">
          <div className="loading-spinner"></div>
          <p style={{ margin: 0 }}>Loading details...</p>
        </div>
      ) : error ? (
        <div className="api-message error-message card">
          <strong>Error:</strong> {error}
        </div>
      ) : variable ? (
        <article className="detail-view">
          <header className="detail-header">
            <h1 style={{ margin: 0, fontSize: '1.75rem', width: '100%' }}>{variable.Name}</h1>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <span className="badge-id">
                ID: {variable.ID}
              </span>
              {variable.GroupName && (
                <span className="badge-info">
                  Group: {variable.GroupName}
                </span>
              )}
            </div>
          </header>

          <section className="detail-body">
            <h3>Description</h3>
            {variable.Description ? (
              <div 
                dangerouslySetInnerHTML={{ __html: variable.Description }} 
                className="html-description-content"
              />
            ) : (
              <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                No description provided by the API source.
              </p>
            )}
          </section>
        </article>
      ) : null}
    </div>
  );
}
