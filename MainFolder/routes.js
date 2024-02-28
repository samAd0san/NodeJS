// 5th file (defining the routes using express) - date: 23-02-24 - check git commit to recall
const express = require('express');
const mongoose = require('mongoose');

const homeRoutes = require('../routes/homeRoutes');
const bookRoutes = require('../routes/bookRoutes');

const productRoutes = require('../routes/productRoutes');

const app = express();
const port = 3000;

app.listen(port,()=>{
    console.log(`The port is running on ${port}`);
})

// when creating the new resources using post i was getting null so resolve that
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/cgc-db');
console.log('db Connected');

// READ Operation in CRUD
app.use(homeRoutes);
app.use(bookRoutes);

app.use(productRoutes);
