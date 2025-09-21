import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BusReport.css';

const API_URL = 'http://localhost:5000/api/car-reports';

const CarReportAdd = () => {
  const navigate = useNavigate();
  const [regNo, setRegNo] = useState('');
  const [carName, setCarName] = useState('');
  const [hours, setHours] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!regNo || !carName || !hours || isNaN(hours)) return;
    const newReport = { regNo, carName, hours: parseInt(hours) };
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReport)
    });
    if (res.ok) {
      setRegNo('');
      setCarName('');
      setHours('');
      navigate('/car/list');
    }
  };

  return (
    <div className="busreport-container">
      <h2 className="busreport-title">Add Car Report</h2>
      <form onSubmit={handleAdd} className="busreport-form">
        <input
          type="text"
          placeholder="Reg No"
          value={regNo}
          onChange={e => setRegNo(e.target.value)}
          required
          className="busreport-input"
        />
        <input
          type="text"
          placeholder="Car Name"
          value={carName}
          onChange={e => setCarName(e.target.value)}
          required
          className="busreport-input"
        />
        <input
          type="number"
          placeholder="Hours"
          value={hours}
          onChange={e => setHours(e.target.value)}
          required
          min="1"
          className="busreport-input"
        />
        <button type="submit" className="busreport-add-btn">
          Add
        </button>
      </form>
      <button className="busreport-back-btn" onClick={() => navigate('/car/list')}>View Reports</button>
      <button className="busreport-back-btn" onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
};

export default CarReportAdd;