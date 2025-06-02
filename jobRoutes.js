const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

function recruiterAuth(req, res, next) {
  next();
}

router.get('/:id', async (req, res) => {
  try {
    const foundJob = await Job.findById(req.params.id).populate('recruiter');
    if (!foundJob) return res.status(404).json({ error: 'Job not found' });
    res.json(foundJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', recruiterAuth, async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ error: 'Job not found' });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const allJobs = await Job.find().populate('recruiter');
    res.json(allJobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', recruiterAuth, async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedJob) return res.status(404).json({ error: 'Job not found' });
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', recruiterAuth, async (req, res) => {
  try {
    const newJob = new Job(req.body);
    newJob.recruiter = req.user._id;
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
