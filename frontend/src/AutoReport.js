import React from 'react';
import { useNavigate } from 'react-router-dom';

const AutoReport = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Auto Reports</h2>
      <p>This is the Auto Reports page.</p>
      <button style={{marginTop: '2rem', padding: '0.7rem 2rem', borderRadius: '25px', background: 'linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%)', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem'}} onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
};

export default AutoReport; 