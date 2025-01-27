import React, { useState } from 'react';
import { AxiosError } from 'axios';
import apiClient from '../api/apiClient';

interface CompanyFactsData {
  company_facts: {
    [key: string]: string | number | null | undefined; // Dynamic key-value pairs
  };
  report_period: string | null; // Report period (e.g., "2023-Q4")
}

const CompanyFacts: React.FC = () => {
  const [ticker, setTicker] = useState<string>(''); // State for the input ticker
  const [companyFacts, setCompanyFacts] = useState<CompanyFactsData | null>(null);
  const [error, setError] = useState<string | null>(null); // State for errors
  const [loading, setLoading] = useState<boolean>(false); // State for loading indicator

  const fetchCompanyFacts = async () => {
    if (!ticker) {
      setError('Please enter a valid ticker.');
      return;
    }
  
    setError(null);
    setLoading(true);
    setCompanyFacts(null);
  
    try {
      const response = await apiClient.get<CompanyFactsData>(`/company-facts/${ticker}`);
      console.log('API Response:', response.data); // Debugging
      setCompanyFacts(response.data);
    } catch (err: AxiosError | unknown) {
      console.error('Error fetching company facts:', err); // Debugging
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data?.detail || 'An error occurred while fetching company facts.');
      } else if (err instanceof Error) {
        setError(err.message || 'An unexpected error occurred.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Company Facts</h1>
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
          onClick={fetchCompanyFacts}
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
          Fetch Company Facts
        </button>
      </div>

      {/* Show loading state */}
      {loading && <p>Loading...</p>}

      {/* Show error if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Show company facts if available */}
      {companyFacts && (
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <h3>Company Facts for {ticker}</h3>
          <p><strong>Report Period:</strong> {companyFacts.report_period || 'N/A'}</p>
          <ul>
            {Object.entries(companyFacts.company_facts).map(([key, value]) => (
              <li key={key}>
                <strong>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}:</strong> {value ?? 'N/A'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CompanyFacts;