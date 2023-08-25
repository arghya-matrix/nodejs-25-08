const express = require('express');
const router = express.Router();
const con= require("./config"); // Example: Database connection

// Define your routes
router.get('/', (req, res) => {
  res.send('Welcome to the main route!');
});

router.use('/students', require('./Students'));
router.use('/courses', require('./courses'));
router.use('/subjects',require('./subjects'));
router.use('/department',require('./department'));
router.use('/course-subject',require('./course-subject'));
router.use('/table-join',require('./tablejoin'));


module.exports = router;  