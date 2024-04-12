const express = require('express');
const multer = require('multer');

const productCtrl = require('../controllers/productCtrl');
const auth = require('../middleware/auth');
const router = express.Router();

const memory = multer.diskStorage({
    filename: function(req,file,cb){
        const prefix = Math.round(Math.random()* 1e9);
        const timestamp = Date.now();
        const filename = `${prefix}-${timestamp}-${file.originalname}`;
        req.body.image = filename;
        cb(null,filename);
    },
    destination: function(req,file,cb){
        cb(null,'uploads/')
    }
});

const upload = multer({ storage:memory });

router.get('/products',productCtrl.get);
router.get('/products/page/:page/size/:size',productCtrl.get);
router.get('/products/:id',productCtrl.getById);

// router.post('/products',productCtrl.post);
router.post('/products',upload.single('image'),productCtrl.post);

router.delete('/products/:id',auth.authorizeAdmin,productCtrl.remove);
router.put('/products/:id',productCtrl.put);
router.patch('/products/:id',productCtrl.patch);

router.post('/products/:id/reviews',productCtrl.addReview);

module.exports = router;