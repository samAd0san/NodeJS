// 5th file (defining the routes using express) - date: 23-02-24 - check git commit to recall
// model -> repo -> ctrl -> routes -> index.js

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const homeRoutes = require('./routes/homeRoutes');
const bookRoutes = require('./routes/bookRoutes');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const auth = require('./middleware/auth');

const app = express();
const port = 3000;

/* If the directory does not already exist, it first checks for its existence using fs.existsSync(). If the directory doesn't
exist, it creates the directory using fs.mkdirSync(). This is typically done to ensure that a logs directory exists before
logging any data to files within it. */

const logsDir = path.join(__dirname,'logs');

if(!fs.existsSync(logsDir)){
    fs.mkdirSync(logsDir);
}

app.listen(port,()=>{
    console.log(`The port is running on ${port}`);
})

const fsStream = fs.createWriteStream(path.join(__dirname,'logs','app.log'),{flags : 'a'});
// const fsStream = fs.createWriteStream(__dirname + "/logs/request.log", {flags : 'a'}); // flag : a -> appends all the logs to requset.log file

// app.use(morgan('dev')); // This will display the logs on the shell
app.use(morgan('combined', {stream : fsStream})); // This will add all the logs to the request.log file 

// when creating the new resources using post i was getting null so resolve that
app.use(express.json());

// To connect mongoDb with nodeJSx
// mongoose.connect('mongodb://localhost:27017/cgc-db');
const conStr = 'mongodb+srv://admin:admin@samadscluster.a4s9jvf.mongodb.net';
mongoose.connect(conStr);
console.log('db Connected');


// READ Operation in CRUD
app.use(homeRoutes);
app.use('/users',userRoutes);

// app.use(auth.basicAuth);
app.use(auth.tokenAuth);

app.use(bookRoutes);
app.use(productRoutes);

app.use((req,res) => {
    res.status(404).send('Not Found');
});
