const express = require('express');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const router = express.Router();

// Upload single image
router.post('/', auth, (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) return res.status(400).json({ message: err.message });
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
        res.json({ url: '/uploads/' + req.file.filename, filename: req.file.filename });
    });
});

// Upload multiple images
router.post('/multiple', auth, (req, res) => {
    upload.array('images', 5)(req, res, (err) => {
        if (err) return res.status(400).json({ message: err.message });
        if (!req.files?.length) return res.status(400).json({ message: 'No files uploaded' });
        res.json({ urls: req.files.map(f => '/uploads/' + f.filename) });
    });
});

module.exports = router;
