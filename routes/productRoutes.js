const express = require('express');
const productCtrl = require('../controllers/productCtrl');
const router = express.Router();

router.get('/products',productCtrl.get);

module.exports = router;