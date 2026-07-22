import React from 'react';
import { Link } from 'react-router-dom';

export default function DecodeResults({ data, vin }) {
  if (!data) return null;

  const { Message, Results } = data;

  const filledResults = (Results || []).filter(
    (item) => item.Value && item.Value.toString().trim() !== ''
  );

  const isErrorMessage = Message && (
    Message.toLowerCase().includes('error') || 
    Message.toLowerCase().includes('invalid') ||
    Message.toLowerCase().includes('not found')
  );

  return (
    <section className="card">
      <div className="results-header-container">
        <h2 className="results-title">Decoding Results</h2>
        <span className="badge-info results-vin-badge">
          {vin}
        </span>
      </div>

      {Message && (
        <div className={`api-message ${isErrorMessage ? 'error-message' : ''}`}>
          <strong>API Status:</strong> {Message}
        </div>
      )}

      {filledResults.length > 0 ? (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Variable</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {filledResults.map((item, index) => (
                <tr key={`${item.VariableId}-${index}`}>
                  <td>
                    {item.VariableId ? (
                      <Link 
                        to={`/variables/${item.VariableId}`}
                        className="variable-link"
                      >
                        {item.Variable}
                      </Link>
                    ) : (
                      item.Variable
                    )}
                    <span className="badge-id variable-id-badge">
                      ID: {item.VariableId}
                    </span>
                  </td>
                  <td className="table-value-cell">
                    {item.Value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-results">
          No populated variables found for this VIN.
        </div>
      )}
    </section>
  );
}
