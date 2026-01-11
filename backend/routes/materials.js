const express = require('express');
const Material = require('../models/Material');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all materials
router.get('/', async (req, res) => {
    try {
        const materials = await Material.find({ isActive: true });
        res.json(materials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single material
router.get('/:id', async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
        res.json(material);
    } catch (error) {
        res.status(404).json({ message: 'Material not found' });
    }
});

// Create material (admin)
router.post('/', auth, async (req, res) => {
    try {
        const material = new Material(req.body);
        await material.save();
        res.status(201).json(material);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update material
router.put('/:id', auth, async (req, res) => {
    try {
        const material = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(material);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete material
router.delete('/:id', auth, async (req, res) => {
    try {
        await Material.findByIdAndDelete(req.params.id);
        res.json({ message: 'Material deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
