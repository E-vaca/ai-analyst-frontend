import React, { useState } from 'react';
import { AxiosError } from 'axios';
import apiClient from '../api/apiClient';

interface FinalResult {
    ticker: string;
    final_result: string;
  }
  

const AnalystRecommendation: React.FC = () => {
  const [ticker, setTicker] = useState<string>(''); // Input for the stock ticker
  const [result, setResult] = useState<string | null>(null); // Final hedge fund result
  const [error, setError] = useState<string | null>(null); // Error message
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // Function to fetch the result from the backend
  const fetchHedgeFundResult = async () => {
    if (!ticker) {
      setError('Please enter a valid ticker.');
      return;
    }

    setError(null); // Reset error
    setLoading(true); // Show loading state
    setResult(null); // Reset previous result

    try {
        // Call the backend API to fetch the hedge fund result
        const response = await apiClient.get<FinalResult>(`/run-hedge-fund/${ticker}`);
        setResult(response.data.final_result); // Store the result in state
      } catch (err: AxiosError | unknown) {
        console.error('Error fetching hedge fund result:', err); // Debugging
        if (err instanceof AxiosError && err.response) {
          setError(err.response.data?.detail || 'An error occurred while fetching the hedge fund result.');
        } else if (err instanceof Error) {
          setError(err.message || 'An unexpected error occurred.');
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false); // Stop loading
      }
    };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Final Recommendation</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter stock ticker (e.g., AAPL)"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '100%',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <button
          onClick={fetchHedgeFundResult}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Get Recommendation
        </button>
      </div>

      {/* Show loading state */}
      {loading && <p>Loading...</p>}

      {/* Show error if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Show final result if available */}
      {result && (
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <h3>Final Recommendation for {ticker}:</h3>
          <p style={{ background: 'black', padding: '10px', borderRadius: '5px' }}>
            {result}
          </p>
        </div>
      )}
    </div>
  );
};

export default AnalystRecommendation;