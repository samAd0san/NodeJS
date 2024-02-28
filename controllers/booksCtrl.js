// index.js -> routes -> controllers -> service -> repository

const bookDb = [{id:1,name:'Atomic Habits',price:499},{id:2,name:'OniiSan',price:349}];
const authorDb = ['James Bond','Karl bond'];

// Creating a handler function for callback (fn for bookDb)
const books = (req,res)=> {
    res.json(bookDb);
};

// Creating a handler function for callback (fn for authorsDb)
const authors = (req,res)=> {
    res.json(authorDb);
}

// This logic is to get the specific id of bookDb when passed in the request url i.e 'http://localhost:3000/books/1'
const getById = (req,res) => {
    // This is for checking the path in which, what id is given
    const id = parseInt(req.params.id);

    const filterFn = (elem) =>{
        // left side id - request id
        // right side id - bookDb id (It travese through book object to check wheter it matches the req or not)
        return elem.id === id;
    };
    const filteredBooks = bookDb.filter(filterFn);

    // add '[0]' after filteredBooks 
    if(filteredBooks[0]){
        res.status(200).json(filteredBooks[0]);
    }else{
        res.status(404).send('Not found');
    }
};

// Using the create operation in 'CRUD' i.e creating a resource and adding to the bookDb
const post = (req,res) => {
    const body = req.body; // body - allows to extract values from objects and arrays and assign them to variables.

    // or we can also use shorthand property (refer notes)
    // const {body} = req; 

    console.log('body',body);
    bookDb.push(body);

    res.status(201);
    res.send('Created');
}

// exporting the modules so that other files can access it
module.exports = {
    books,
    authors,
    getById,
    post,
}