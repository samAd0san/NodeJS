const bookDb = [{id:1,name:'Atomic Habits',price:499},{id:2,name:'OniiSan',price:349}];
const authorDb = ['James Bond','Karl bond'];

// Creating a handler function for callback (fn for bookDb)
const books = (req,res)=> {
    res.json(bookDb);
};

// This logic is to get the specific id of bookDb when passed in the request url
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
    if(filteredBooks){
        res.status(200).json(filteredBooks);
    }else{
        res.status(404).send('Not found');
    }
};

// Creating a handler function for callback (fn for authorsDb)
const authors = (req,res)=> {
    res.json(authorDb);
}

// exporting the modules so that other files can access it
module.exports = {
    books,
    authors,
    getById,
}