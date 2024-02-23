const express = require('express');
// calling the custom module from the hoemCtrl file
const homeCtrl = require('../controllers/homeCtrl');

// Router() - It created isolated router instance in Express.js for defining routes
const router = express.Router();

router.get('/',homeCtrl.home);
router.get('/health',homeCtrl.health);

module.exports = router;