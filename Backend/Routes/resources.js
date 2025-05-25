const express = require('express');
const router = express.Router();
const Resource = require('../models/Response');

// GET all resources (with search + filter)
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.category = category;
    }

    const resources = await Resource.find(query).sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET unique categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Resource.distinct('category');
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST create new resource
router.post('/', async (req, res) => {
  try {
    const { name, category, description, link } = req.body;

    const newResource = new Resource({ name, category, description, link });
    const resource = await newResource.save();
    res.json(resource);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT update resource
router.put('/:id', async (req, res) => {
  try {
    const { name, category, description, link } = req.body;
    const updateFields = { name, category, description, link };

    let resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ msg: 'Resource not found' });

    resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    res.json(resource);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE resource
router.delete('/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ msg: 'Resource not found' });

    await Resource.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Resource removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
