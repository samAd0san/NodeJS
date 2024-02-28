const express = require('express');
// calling the custom module from the bookCtrl file
const booksCtrl = require('../controllers/booksCtrl');

// Router() - It created isolated router instance in Express.js for defining routes
const router = express.Router();

// giving the route/path by using router which is the predefined object of express module
router.get('/books',booksCtrl.books);
router.get('/authors',booksCtrl.authors);
// added logic
router.get('/books/:id',booksCtrl.getById);
// creating a resource in bookDb
router.post('/books',booksCtrl.post); // here in booksCtrl.post, 'post' is a custom method created in booksCtrl file

module.exports = router;