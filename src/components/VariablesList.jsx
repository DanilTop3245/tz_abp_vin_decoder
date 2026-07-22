import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function VariablesList({ variables }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!variables || variables.length === 0) {
    return <div className="no-results">No variables available.</div>;
  }

  const filteredVariables = variables.filter((item) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = (item.Name || '').toLowerCase().includes(term);
    const groupMatch = (item.GroupName || '').toLowerCase().includes(term);
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = item.Description || '';
    const descText = tempDiv.textContent || tempDiv.innerText || '';
    const descMatch = descText.toLowerCase().includes(term);

    return nameMatch || groupMatch || descMatch;
  });

  const stripHtml = (html) => {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <div>
      <div className="search-box-wrapper">
        <div className="form-group">
          <label htmlFor="variableSearch" className="form-label">
            Search by name, group, or description:
          </label>
          <input
            id="variableSearch"
            type="text"
            className="form-control"
            placeholder="Enter keyword... (e.g. Cruise, Air Bag, Make)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="search-count" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Showing {filteredVariables.length} of {variables.length} variables
        </div>
      </div>

      {filteredVariables.length > 0 ? (
        <div className="variables-grid">
          {filteredVariables.map((item) => {
            const descriptionText = stripHtml(item.Description);

            return (
              <article key={item.ID} className="card variable-card">
                <div>
                  <div className="variable-title-row">
                    <h3 style={{ margin: 0 }}>
                      <Link to={`/variables/${item.ID}`} className="variable-link">
                        {item.Name}
                      </Link>
                    </h3>
                    <span className="badge-id">ID: {item.ID}</span>
                  </div>

                  {item.GroupName && (
                    <div style={{ marginBottom: '0.5rem' }}>
                      <span className="badge-info">{item.GroupName}</span>
                    </div>
                  )}

                  <p className="variable-description-excerpt">
                    {descriptionText || 'No description provided.'}
                  </p>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                  <Link to={`/variables/${item.ID}`} className="variable-link" style={{ fontSize: '0.85rem' }}>
                    Details &rarr;
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="no-results" style={{ marginTop: '1.5rem' }}>
          No matches found. Try modifying your search filter.
        </div>
      )}
    </div>
  );
}
