import React, { useState } from 'react';
import { FiPlay } from 'react-icons/fi'; // Importing play icon
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // Importing loading spinner icon

const WebsiteSpeedTest = () => {
  const [url, setUrl] = useState('');
  const [loadingTime, setLoadingTime] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const isValidUrl = (inputUrl) => {
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zAZ]{2,}(\/.*)?$/;
    return urlPattern.test(inputUrl);
  };

  const testSpeed = async () => {
    setLoadingTime(null);
    setError(null);
    setStatus('');
    setIsLoading(true); // Set loading to true when the test starts

    if (!url) {
      setError('Please enter a valid URL.');
      setIsLoading(false); // Reset loading state
      return;
    }

    if (!isValidUrl(url)) {
      setError('Invalid URL format. Please enter a proper URL.');
      setIsLoading(false); // Reset loading state
      return;
    }

    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;

    try {
      const startTime = performance.now();

      await fetch(formattedUrl, { mode: 'no-cors' });

      const endTime = performance.now();
      const timeTaken = (endTime - startTime).toFixed(2);

      setLoadingTime(timeTaken);

      if (timeTaken < 500) {
        setStatus('Fast');
      } else if (timeTaken < 1500) {
        setStatus('Average');
      } else {
        setStatus('Poor');
      }
    } catch (err) {
      setError('Failed to fetch the URL. Please ensure it is correct.');
    } finally {
      setIsLoading(false); // Reset loading state after test is complete
    }
  };

  const handleKeyDown = (e) => {
    // Trigger the testSpeed function when Enter key is pressed
    if (e.key === 'Enter') {
      testSpeed();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Website Speed Tester</h2>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown} // Listen for Enter key press
          placeholder="Enter website URL"
          style={styles.input}
        />
        <button onClick={testSpeed} style={styles.button} disabled={isLoading}>
          {isLoading ? (
            <AiOutlineLoading3Quarters style={styles.icon} className="loading" />
          ) : (
            <FiPlay style={styles.icon} />
          )}
          {isLoading ? 'Testing...' : 'Test Speed'}
        </button>

        {loadingTime && (
          <div style={styles.result}>
            <p>
              Website loaded in <span>{loadingTime} ms</span>.
            </p>
            <div
              style={{
                ...styles.status,
                backgroundColor:
                  status === 'Fast'
                    ? '#28a745'
                    : status === 'Average'
                    ? '#ffc107'
                    : '#dc3545',
              }}
            >
              {status} Loading Time
            </div>
          </div>
        )}

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7',
    padding: '10px',
  },
  card: {
    background: 'white',
    borderRadius: '10px',
    padding: '40px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.3s ease',
    position: 'relative',
  },
  icon: {
    marginRight: '10px',
    fontSize: '20px',
    animation: 'spin 1s linear infinite', // Add a spin animation for the loading icon
  },
  result: {
    marginTop: '20px',
  },
  status: {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '14px',
    borderRadius: '20px',
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: '10px',
  },
  error: {
    color: '#dc3545',
    marginTop: '15px',
  },
};

// Keyframe for spinner rotation animation
const spinKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject spin animation in style tag
const styleTag = document.createElement('style');
styleTag.innerHTML = spinKeyframes;
document.head.appendChild(styleTag);

export default WebsiteSpeedTest;
