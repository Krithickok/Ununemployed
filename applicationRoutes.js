const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

const recruiterAuth = (req, res, next) => {
  next();
};

const jobSeekerAuth = (req, res, next) => {
  next();
};

router.get('/', recruiterAuth, async (req, res) => {
  try {
    const apps = await Application.find().populate('jobSeeker').populate('job');
    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', jobSeekerAuth, async (req, res) => {
  try {
    const app = new Application(req.body);
    app.jobSeeker = req.user._id;
    await app.save();
    res.status(201).json(app);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const app = await Application.findById(req.params.id).populate('jobSeeker').populate('job');
    if (!app) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(app);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const app = await Application.findByIdAndDelete(req.params.id);
    if (!app) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
