const path = require('path');
const express = require('express');
const router = express.Router();
const SubjectController = require('../controllers/subjects');


router.get('/',SubjectController.getSubjects);

module.exports = router;