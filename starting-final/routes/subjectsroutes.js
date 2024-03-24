const path = require('path');
const express = require('express');
const router = express.Router();
const SubjectController = require('../controllers/subjects');


router.get('/frmAddSubject',SubjectController.getAddSubject);
router.post('/frmAddSubject',SubjectController.postAddSubject);

module.exports = router;