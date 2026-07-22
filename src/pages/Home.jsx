import React, { useState, useEffect } from 'react';
import VinForm from '../components/VinForm';
import HistoryList from '../components/HistoryList';
import DecodeResults from '../components/DecodeResults';
import { decodeVin } from '../services/api';

export default function Home() {
  const [activeVin, setActiveVin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [decodeData, setDecodeData] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('vin_decode_history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const saveHistory = (newHistory) => {
    setHistory(newHistory);
    try {
      localStorage.setItem('vin_decode_history', JSON.stringify(newHistory));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecode = async (vinToDecode) => {
    setIsLoading(true);
    setError('');
    
    try {
      const data = await decodeVin(vinToDecode);
      setDecodeData(data);
      setActiveVin(vinToDecode);

      const filteredHistory = history.filter((item) => item !== vinToDecode);
      const updatedHistory = [vinToDecode, ...filteredHistory].slice(0, 3);
      saveHistory(updatedHistory);
    } catch (err) {
      console.error(err);
      setError(
        err.message || 'An error occurred while loading data from NHTSA API. Please check your connection.'
      );
      setDecodeData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>
          Vehicle VIN Decoder
        </h1>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          Enter a 17-character Vehicle Identification Number (VIN) to retrieve official manufacturing details and specifications.
        </p>
      </div>

      <div className="home-grid">
        <aside className="sidebar-section">
          <HistoryList 
            history={history} 
            onSelect={handleDecode} 
            activeVin={activeVin} 
          />
        </aside>

        <div className="main-section">
          <VinForm onSubmit={handleDecode} isLoading={isLoading} />

          {isLoading && (
            <div className="loading-container card">
              <div className="loading-spinner"></div>
              <p style={{ margin: 0 }}>Fetching data from NHTSA API...</p>
            </div>
          )}

          {error && !isLoading && (
            <div className="api-message error-message card">
              <strong>Error:</strong> {error}
            </div>
          )}

          {!isLoading && decodeData && (
            <DecodeResults data={decodeData} vin={activeVin} />
          )}
        </div>
      </div>
    </div>
  );
}
