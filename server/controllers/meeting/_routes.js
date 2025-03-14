const express = require('express');
const { add, index, view, deleteData, deleteMany } = require('./meeting');

const router = express.Router();

// Get all meetings
router.get('/', index);

// Get a specific meeting by ID
router.get('/view/:id', view);

// Create a new meeting
router.post('/add', add);

// Delete a meeting
router.delete('/delete/:id', deleteData);

// Delete multiple meetings
router.post('/deleteMany', deleteMany);

module.exports = router