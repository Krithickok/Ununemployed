const express = require('express');
const router = express.Router();
const JobSeeker = require('../models/JobSeeker');

const authenticateJobSeeker = (req, res, next) => {
  next();
};

router.get('/me', authenticateJobSeeker, async (req, res) => {
  try {
    const jobSeeker = await JobSeeker.findById(req.user._id);
    if (!jobSeeker) return res.status(404).json({ error: 'Job seeker not found' });
    res.json(jobSeeker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newJobSeeker = new JobSeeker(req.body);
    await newJobSeeker.save();
    res.status(201).json(newJobSeeker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const jobSeeker = await JobSeeker.findById(req.params.id);
    if (!jobSeeker) return res.status(404).json({ error: 'Job seeker not found' });
    res.json(jobSeeker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const seekers = await JobSeeker.find();
    res.json(seekers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authenticateJobSeeker, async (req, res) => {
  try {
    const updated = await JobSeeker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Job seeker not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticateJobSeeker, async (req, res) => {
  try {
    const removed = await JobSeeker.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Job seeker not found' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
