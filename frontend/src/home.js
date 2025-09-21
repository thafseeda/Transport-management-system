import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <h1 className="home-title">CBSI Transport Management System</h1>
      <div className="button-group">
        <button className="report-btn" onClick={() => navigate('/bus')}>Bus Reports</button>
        <button className="report-btn" onClick={() => navigate('/car')}>Car Reports</button>
        <button className="report-btn" onClick={() => navigate('/truck')}>Truck Reports</button>
        <button className="report-btn" onClick={() => navigate('/auto')}>Auto Reports</button>
      </div>
    </div>
  );
};

export default Home; 