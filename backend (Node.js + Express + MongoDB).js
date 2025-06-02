const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/jobportal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const recruiterSchema = new mongoose.Schema({
  name: String,
  company: String,
  email: String,
  mobile: String,
});

const jobSeekerSchema = new mongoose.Schema({
  name: String,
  skills: [String],
  experience: Number,
  location: String,
  ctc: Number,
  noticePeriod: String,
});

const jobSchema = new mongoose.Schema({
  jobTitle: String,
  skills: [String],
  experience: Number,
  location: String,
  maxCtc: Number,
  noticePeriod: String,
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter' },
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);
const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);
const Job = mongoose.model('Job', jobSchema);

app.get('/api/job-seekers', async (req, res) => {
  try {
    const seekers = await JobSeeker.find();
    res.json(seekers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/job-seekers', async (req, res) => {
  try {
    const seeker = new JobSeeker(req.body);
    await seeker.save();
    res.status(201).json(seeker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/job-seekers/:id', async (req, res) => {
  try {
    const updated = await JobSeeker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Job seeker not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/job-seekers/:id', async (req, res) => {
  try {
    const removed = await JobSeeker.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Job seeker not found' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/jobs', async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().populate('recruiter');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/jobs/:id', async (req, res) => { /* ... */ });
app.delete('/api/jobs/:id', async (req, res) => { /* ... */ });

app.post('/api/job-providers', async (req, res) => { /* ... */ });
app.get('/api/job-providers', async (req, res) => { /* ... */ });
app.put('/api/job-providers/:id', async (req, res) => { /* ... */ });
app.delete('/api/job-providers/:id', async (req, res) => { /* ... */ });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
