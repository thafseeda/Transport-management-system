import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BusReport.css';

const API_URL = 'http://localhost:5000/api/bus-reports';

const BusReportAdd = () => {
  const navigate = useNavigate();
  const [regNo, setRegNo] = useState('');
  const [busName, setBusName] = useState('');
  const [hours, setHours] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!regNo || !busName || !hours || isNaN(hours)) return;
    const newReport = { regNo, busName, hours: parseInt(hours) };
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReport)
    });
    if (res.ok) {
      setRegNo('');
      setBusName('');
      setHours('');
      navigate('/bus/list');
    }
  };

  return (
    <div className="busreport-container">
      <h2 className="busreport-title">Add Bus Report</h2>
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
          placeholder="Bus Name"
          value={busName}
          onChange={e => setBusName(e.target.value)}
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
      <button className="busreport-back-btn" onClick={() => navigate('/bus/list')}>View Reports</button>
      <button className="busreport-back-btn" onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
};

export default BusReportAdd; 