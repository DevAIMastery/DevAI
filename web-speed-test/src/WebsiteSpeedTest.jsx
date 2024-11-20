import React, { useState } from 'react';

const WebsiteSpeedTest = () => {
  const [url, setUrl] = useState('');
  const [loadingTime, setLoadingTime] = useState(null);
  const [error, setError] = useState(null);

  const testSpeed = async () => {
    setLoadingTime(null);
    setError(null);

    if (!url) {
      setError('Please enter a valid URL.');
      return;
    }

    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;

    try {
      const startTime = performance.now();

      await fetch(formattedUrl, { mode: 'no-cors' });

      const endTime = performance.now();
      setLoadingTime((endTime - startTime).toFixed(2));
    } catch (err) {
      setError('Failed to fetch the URL. Please ensure it is correct.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Website Speed Tester</h2>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter website URL"
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button
        onClick={testSpeed}
        style={{
          width: '100%',
          padding: '10px',
          background: '#007bff',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Test Speed
      </button>

      {loadingTime && (
        <p style={{ marginTop: '20px', color: 'green' }}>
          Website loaded in {loadingTime} ms.
        </p>
      )}

      {error && (
        <p style={{ marginTop: '20px', color: 'red' }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default WebsiteSpeedTest;
