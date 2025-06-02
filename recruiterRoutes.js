const express = require('express');
const router = express.Router();
const Recruiter = require('../models/Recruiter');

const authenticateRecruiter = (req, res, next) => {
  next();
};

router.get('/me', authenticateRecruiter, async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.user._id);
    if (!recruiter) return res.status(404).json({ error: 'Recruiter not found' });
    res.json(recruiter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newRecruiter = new Recruiter(req.body);
    await newRecruiter.save();
    res.status(201).json(newRecruiter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const allRecruiters = await Recruiter.find();
    res.json(allRecruiters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authenticateRecruiter, async (req, res) => {
  try {
    const updatedRecruiter = await Recruiter.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRecruiter) return res.status(404).json({ error: 'Recruiter not found' });
    res.json(updatedRecruiter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.id);
    if (!recruiter) return res.status(404).json({ error: 'Recruiter not found' });
    res.json(recruiter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticateRecruiter, async (req, res) => {
  try {
    const deletedRecruiter = await Recruiter.findByIdAndDelete(req.params.id);
    if (!deletedRecruiter) return res.status(404).json({ error: 'Recruiter not found' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
