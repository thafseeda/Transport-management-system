const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB (adjust the URI as needed for your local MongoDB Compass)
mongoose.connect('mongodb://127.0.0.1:27017/transport', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const busReportSchema = new mongoose.Schema({
  regNo: String,
  busName: String,
  hours: Number,
  totalAmount: Number,
});

const BusReport = mongoose.model('BusReport', busReportSchema);

// Get all bus reports
app.get('/api/bus-reports', async (req, res) => {
  const reports = await BusReport.find();
  res.json(reports);
});

// Add a new bus report
app.post('/api/bus-reports', async (req, res) => {
  const { regNo, busName, hours } = req.body;
  if (!regNo || !busName || !hours || isNaN(hours)) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const totalAmount = parseInt(hours) * 5000;
  const report = new BusReport({ regNo, busName, hours: parseInt(hours), totalAmount });
  await report.save();
  res.status(201).json(report);
});

// Update a bus report
app.patch('/api/bus-reports/:id', async (req, res) => {
  const { id } = req.params;
  const { regNo, busName, hours } = req.body;
  if (!regNo || !busName || !hours || isNaN(hours)) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const totalAmount = parseInt(hours) * 5000;
  const updated = await BusReport.findByIdAndUpdate(
    id,
    { regNo, busName, hours: parseInt(hours), totalAmount },
    { new: true }
  );
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

// Delete a bus report
app.delete('/api/bus-reports/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await BusReport.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

// Car Report Schema & Model
const carReportSchema = new mongoose.Schema({
  regNo: String,
  carName: String,
  hours: Number,
  totalAmount: Number,
});
const CarReport = mongoose.model('CarReport', carReportSchema);

// Get all car reports
app.get('/api/car-reports', async (req, res) => {
  const reports = await CarReport.find();
  res.json(reports);
});

// Add a new car report
app.post('/api/car-reports', async (req, res) => {
  const { regNo, carName, hours } = req.body;
  if (!regNo || !carName || !hours || isNaN(hours)) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const totalAmount = parseInt(hours) * 2000;
  const report = new CarReport({ regNo, carName, hours: parseInt(hours), totalAmount });
  await report.save();
  res.status(201).json(report);
});

// Update a car report
app.patch('/api/car-reports/:id', async (req, res) => {
  const { id } = req.params;
  const { regNo, carName, hours } = req.body;
  if (!regNo || !carName || !hours || isNaN(hours)) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const totalAmount = parseInt(hours) * 2000;
  const updated = await CarReport.findByIdAndUpdate(
    id,
    { regNo, carName, hours: parseInt(hours), totalAmount },
    { new: true }
  );
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

// Delete a car report
app.delete('/api/car-reports/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await CarReport.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

// Truck Report Schema & Model
const truckReportSchema = new mongoose.Schema({
  regNo: String,
  truckName: String,
  hours: Number,
  totalAmount: Number,
});
const TruckReport = mongoose.model('TruckReport', truckReportSchema);

// Get all truck reports
app.get('/api/truck-reports', async (req, res) => {
  const reports = await TruckReport.find();
  res.json(reports);
});

// Add a new truck report
app.post('/api/truck-reports', async (req, res) => {
  const { regNo, truckName, hours } = req.body;
  if (!regNo || !truckName || !hours || isNaN(hours)) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const totalAmount = parseInt(hours) * 4000;
  const report = new TruckReport({ regNo, truckName, hours: parseInt(hours), totalAmount });
  await report.save();
  res.status(201).json(report);
});

// Update a truck report
app.patch('/api/truck-reports/:id', async (req, res) => {
  const { id } = req.params;
  const { regNo, truckName, hours } = req.body;
  if (!regNo || !truckName || !hours || isNaN(hours)) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const totalAmount = parseInt(hours) * 4000;
  const updated = await TruckReport.findByIdAndUpdate(
    id,
    { regNo, truckName, hours: parseInt(hours), totalAmount },
    { new: true }
  );
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

// Delete a truck report
app.delete('/api/truck-reports/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await TruckReport.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

// Auto Report Schema & Model
const autoReportSchema = new mongoose.Schema({
  regNo: String,
  autoName: String,
  hours: Number,
  totalAmount: Number,
});
const AutoReport = mongoose.model('AutoReport', autoReportSchema);

// Get all auto reports
app.get('/api/auto-reports', async (req, res) => {
  const reports = await AutoReport.find();
  res.json(reports);
});

// Add a new auto report
app.post('/api/auto-reports', async (req, res) => {
  const { regNo, autoName, hours } = req.body;
  if (!regNo || !autoName || !hours || isNaN(hours)) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const totalAmount = parseInt(hours) * 1000;
  const report = new AutoReport({ regNo, autoName, hours: parseInt(hours), totalAmount });
  await report.save();
  res.status(201).json(report);
});

// Update an auto report
app.patch('/api/auto-reports/:id', async (req, res) => {
  const { id } = req.params;
  const { regNo, autoName, hours } = req.body;
  if (!regNo || !autoName || !hours || isNaN(hours)) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const totalAmount = parseInt(hours) * 1000;
  const updated = await AutoReport.findByIdAndUpdate(
    id,
    { regNo, autoName, hours: parseInt(hours), totalAmount },
    { new: true }
  );
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

// Delete an auto report
app.delete('/api/auto-reports/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await AutoReport.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 