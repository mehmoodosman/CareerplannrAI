"use client";
import { useState } from 'react';

export default function CareerPage() {
  const [resume, setResume] = useState('');
  const [careerPath, setCareerPath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: resume,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('API response:', data); 
      setCareerPath(data.careerpath[0]); 

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <h1>Career Recommendation</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <textarea
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          placeholder="Paste resume text here"
          rows="10"
          cols="50"
          style={{ marginBottom: '10px' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
          {loading ? 'Processing...' : 'Get Recommendation'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {careerPath && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2>Recommended Career Path</h2>
          <h3>Title: {careerPath.title}</h3>
          <p>Description: {careerPath.description}</p>
        </div>
      )}
    </div>
  );
}


