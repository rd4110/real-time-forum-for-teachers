const express = require('express');
const Classroom = require('../models/Classroom');

const router = express.Router();

router.get('/', async (req, res) => {
    const classrooms = await Classroom.find();
    res.render('classrooms', { classrooms });
});

router.post('/', async (req, res) => {
    const { name, description } = req.body;
    const classroom = new Classroom({ name, description });
    await classroom.save();
    res.redirect('/classrooms');
});

module.exports = router;
