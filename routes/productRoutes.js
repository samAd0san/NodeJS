const express = require('express');
const productCtrl = require('../controllers/productCtrl');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/products',productCtrl.get);
router.get('/products/page/:page/size/:size',productCtrl.get);
router.get('/products/:id',productCtrl.getById);

router.post('/products',productCtrl.post);
router.delete('/products/:id',auth.authorizeAdmin,productCtrl.remove);
router.put('/products/:id',productCtrl.put);
router.patch('/products/:id',productCtrl.patch);

module.exports = router;