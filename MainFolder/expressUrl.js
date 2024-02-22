// We are implementing routing using express
const express = require('express');
const app = express();

const port = 3000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});

// Creating handlers
const hander1 = (req,res)=> {
    res.send('Hello Express!');
};
    
const hander2 = (req,res)=> {
    const books = [{id:1,name:'Atomic Habits',price:499},{id:2,name:'xDman',price:349}];

    // Serialiazation
    res.json(books);
    // no need of break statement here
};

const hander3 = (req,res)=> {
    const authors = ['James Bond','Karl rock'];
    res.json(authors);
};


// syntax - get(path,handler_function)
app.get('/',hander1);
app.get('/books',hander2);
app.get('/authors',hander3);

// console.log(typeof hander1);