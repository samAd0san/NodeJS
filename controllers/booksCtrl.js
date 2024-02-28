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

// Creating a function isInvalid 
const isInvalid = (body) => {
    return ( !body.id || !body.name || !body.price )
}
// Using the create operation in 'CRUD' i.e creating a resource and adding to the bookDb
// 1. CREATE (POST)
const post = (req,res) => {
    const body = req.body; // body - allows to extract values from objects and arrays and assign them to variables.
    // or we can also use shorthand property (refer notes)
    // const {body} = req; 

    // If the user i/p invalid parameters 
    if(isInvalid(body)){
        res.status(400);
        res.send('Bad Request');
    }else{ // If the user i/p valid parameters
        bookDb.push(body);
        res.status(201);
        res.send('Created');
    }
}

// Using the Delete operation in 'CRUD' i.e removing a resource from the bookDb
// 2. DELETE (remove)
const remove = (req,res) => {
    const id = parseInt(req.params.id);

    for(let i=0; i < bookDb.length; i++){
        if(bookDb[i].id === id){
            bookDb.splice(i,1);
            break;
        }
    }

    res.status(204);
    res.send();
}

// Using the Update operation in 'CRUD' i.e full update the existing element
const put = (req,res) => {
    const id = parseInt(req.params.id);
    const playload = req.body; // is extracting the request body from the req object and assigning it to the variable payload.

    if(isInvalid(playload)) {
        res.status(400);
        res.send('Bad request');
        return;
    }

    // we are assigning the new values given in playload through the request to the existing data 
    for(let i=0; i < bookDb.length; i++) {
        if(bookDb[i].id === id) {
            bookDb[i].name = playload.name;
            bookDb[i].price = playload.price;
        }
    }
    res.status(204);
    res.send();
}

// Using the Update operation in 'CRUD' i.e partial update the existing element
const patch = (req,res) => {
    const id = parseInt(req.params.id);
    const playload = req.body;

    for(let i=0; i < bookDb.length; i++){
        if(bookDb[i].id === id){
            for(let key in playload){
                bookDb[i][key] = playload[key]; // check readme.md to understand this code 
            }
        }
    }
    res.status(204);
    res.send();
}

// exporting the modules so that other files can access it
module.exports = {
    books,
    authors,
    getById,
    post,
    remove,
    put,
    patch,
}