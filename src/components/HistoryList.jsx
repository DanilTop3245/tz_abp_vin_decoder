import React from 'react';

export default function HistoryList({ history, onSelect, activeVin }) {
  return (
    <section className="card history-card">
      <h2>Recent Searches</h2>
      {history && history.length > 0 ? (
        <ul className="history-list">
          {history.map((vin) => (
            <li key={vin} className="history-item">
              <button
                type="button"
                className={`history-button ${vin === activeVin ? 'active-history' : ''}`}
                onClick={() => onSelect(vin)}
                title={`Repeat search for ${vin}`}
                style={
                  vin === activeVin
                    ? {
                        borderColor: 'var(--accent-color)',
                        backgroundColor: 'var(--accent-light)',
                        fontWeight: '600',
                        color: 'var(--accent-color)',
                      }
                    : {}
                }
              >
                {vin}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-history">No search history.</p>
      )}
    </section>
  );
}
