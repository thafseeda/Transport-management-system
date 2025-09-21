import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import BusReportAdd from './BusReportAdd';
import BusReportList from './BusReportList';
import CarReportAdd from './CarReportAdd';
import CarReportList from './CarReportList';
import TruckReportAdd from './TruckReportAdd';
import TruckReportList from './TruckReportList';
import AutoReportAdd from './AutoReportAdd';
import AutoReportList from './AutoReportList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bus" element={<BusReportAdd />} />
          <Route path="/bus/list" element={<BusReportList />} />
          <Route path="/car" element={<CarReportAdd />} />
          <Route path="/car/list" element={<CarReportList />} />
          <Route path="/truck" element={<TruckReportAdd />} />
          <Route path="/truck/list" element={<TruckReportList />} />
          <Route path="/auto" element={<AutoReportAdd />} />
          <Route path="/auto/list" element={<AutoReportList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
