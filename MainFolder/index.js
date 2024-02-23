// 4th file
// This File is linked with the 'controllers' folder

const express = require('express');
const homeCtrl = require('../controllers/homeCtrl');
const bookCtrl = require('../controllers/booksCtrl');

const app = express();

const port = 3000;
app.listen(port,()=>{
    console.log(`The port is running on ${port}`);
})

// routing with express.js
app.get('/',homeCtrl.home);
app.get('/health',homeCtrl.health);
app.get('/books',bookCtrl.books);
app.get('/authors',bookCtrl.authors);