// 5th file (defining the routes using express) - date: 23-02-24 - check git commit to recall
const express = require('express');
const homeRoutes = require('../routes/homeRoutes');
const bookRoutes = require('../routes/bookRoutes');

const app = express();
const port = 3000;

app.listen(port,()=>{
    console.log(`The port is running on ${port}`);
})

// when creating the new resources using post i was getting null so resolve that
app.use(express.json());

// READ Operation in CRUD
app.use(homeRoutes);
app.use(bookRoutes);
