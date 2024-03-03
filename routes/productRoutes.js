const express = require('express');
const productCtrl = require('../controllers/productCtrl');
const router = express.Router();

router.get('/products',productCtrl.get);
router.get('/products/:id',productCtrl.getById);

router.post('/products',productCtrl.post);
router.delete('/products/:id',productCtrl.remove);
router.put('/products/:id',productCtrl.put);
router.patch('/products/:id',productCtrl.patch);

module.exports = router;