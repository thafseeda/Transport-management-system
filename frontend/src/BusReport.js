import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BusReport.css';

const DEFAULT_AMOUNT = 5000;
const API_URL = 'http://localhost:5000/api/bus-reports';

const BusReport = () => {
  const navigate = useNavigate();
  const [regNo, setRegNo] = useState('');
  const [busName, setBusName] = useState('');
  const [hours, setHours] = useState('');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ regNo: '', busName: '', hours: '' });

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setReports(data);
        setLoading(false);
      });
  }, []);

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
      const saved = await res.json();
      setReports([...reports, saved]);
      setRegNo('');
      setBusName('');
      setHours('');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setReports(reports.filter(r => r._id !== id));
    }
  };

  const handleEdit = (report) => {
    setEditId(report._id);
    setEditData({ regNo: report.regNo, busName: report.busName, hours: report.hours });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (id) => {
    if (!editData.regNo || !editData.busName || !editData.hours || isNaN(editData.hours)) return;
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        regNo: editData.regNo,
        busName: editData.busName,
        hours: parseInt(editData.hours)
      })
    });
    if (res.ok) {
      const updated = await res.json();
      setReports(reports.map(r => r._id === id ? updated : r));
      setEditId(null);
      setEditData({ regNo: '', busName: '', hours: '' });
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditData({ regNo: '', busName: '', hours: '' });
  };

  return (
    <div className="busreport-container">
      <h2 className="busreport-title">Bus Reports</h2>
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
      {loading ? <p>Loading...</p> : (
        <table className="busreport-table">
          <thead>
            <tr>
              <th>Reg No</th>
              <th>Bus Name</th>
              <th>Hours</th>
              <th>Total Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, idx) => (
              <tr key={report._id || idx}>
                {editId === report._id ? (
                  <>
                    <td><input name="regNo" className="busreport-input" value={editData.regNo} onChange={handleEditChange} /></td>
                    <td><input name="busName" className="busreport-input" value={editData.busName} onChange={handleEditChange} /></td>
                    <td><input name="hours" className="busreport-input" type="number" min="1" value={editData.hours} onChange={handleEditChange} /></td>
                    <td>{parseInt(editData.hours) * DEFAULT_AMOUNT || ''}</td>
                    <td>
                      <button className="busreport-action-btn update" onClick={() => handleEditSave(report._id)}>Save</button>
                      <button className="busreport-action-btn cancel" onClick={handleEditCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{report.regNo}</td>
                    <td>{report.busName}</td>
                    <td>{report.hours}</td>
                    <td>{report.totalAmount}</td>
                    <td>
                      <button className="busreport-action-btn update" onClick={() => handleEdit(report)}>Update</button>
                      <button className="busreport-action-btn delete" onClick={() => handleDelete(report._id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="busreport-back-btn" onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
};

export default BusReport; 