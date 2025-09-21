import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BusReport.css';

const DEFAULT_AMOUNT = 1000;
const API_URL = 'http://localhost:5000/api/auto-reports';

const AutoReportList = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ regNo: '', autoName: '', hours: '' });

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setReports(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setReports(reports.filter(r => r._id !== id));
    }
  };

  const handleEdit = (report) => {
    setEditId(report._id);
    setEditData({ regNo: report.regNo, autoName: report.autoName, hours: report.hours });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (id) => {
    if (!editData.regNo || !editData.autoName || !editData.hours || isNaN(editData.hours)) return;
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        regNo: editData.regNo,
        autoName: editData.autoName,
        hours: parseInt(editData.hours)
      })
    });
    if (res.ok) {
      const updated = await res.json();
      setReports(reports.map(r => r._id === id ? updated : r));
      setEditId(null);
      setEditData({ regNo: '', autoName: '', hours: '' });
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditData({ regNo: '', autoName: '', hours: '' });
  };

  return (
    <div className="busreport-container">
      <h2 className="busreport-title">Auto Reports List</h2>
      <button className="busreport-add-btn" style={{marginBottom: '1.5rem'}} onClick={() => navigate('/auto')}>Add Reports</button>
      {loading ? <p>Loading...</p> : (
        <table className="busreport-table">
          <thead>
            <tr>
              <th>Reg No</th>
              <th>Auto Name</th>
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
                    <td><input name="autoName" className="busreport-input" value={editData.autoName} onChange={handleEditChange} /></td>
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
                    <td>{report.autoName}</td>
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

export default AutoReportList; 