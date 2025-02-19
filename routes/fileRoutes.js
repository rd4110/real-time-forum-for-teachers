const express = require('express');
const path = require('path');
const File = require('../models/File');

const router = express.Router();

router.get('/', async (req, res) => {
    const files = await File.find();
    res.render('upload', { files });
});

router.post('/upload', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) return res.status(400).send('No files uploaded.');

    let uploadedFile = req.files.file;
    let uploadPath = path.join(__dirname, '../uploads/', uploadedFile.name);
    
    uploadedFile.mv(uploadPath, async () => {
        const file = new File({ filename: uploadedFile.name, path: uploadPath });
        await file.save();
        res.redirect('/files');
    });
});

module.exports = router;
