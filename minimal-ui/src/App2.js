// minimal-ui/src/App.js

import React, { useState } from 'react';

function App() {
  const [data, setData] = useState(''); // State to store API response

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5259/api/WeatherForecast/Get'); // Replace with any GET API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(JSON.stringify(result, null, 2)); // Format JSON for display
    } catch (error) {
      setData(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Minimal-ui</h1>
      <button onClick={fetchData} style={{ marginBottom: '10px', padding: '8px 16px' }}>GET</button>
      <textarea
        style={{
          width: '80%',
          height: '300px',
          padding: '10px',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}
        readOnly
        value={data}
      />
    </div>
  );
}

export default App;