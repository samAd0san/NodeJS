const http = require('http');
const fs = require('fs');

const server = http.createServer(handler);

function handler(req,res) {
    switch(req.url) {

        // In case no url has been entered
        case '/':
        //     // readFileSync() is a synchronous method provided by the fs module in Node.js, 
        //     // used to read the contents of a file synchronously.
            const contents = fs.readFileSync('index.html');

        //     // toString() is used because readFileSync() returns file contents as a buffer or string
            res.write(contents.toString());
            res.end();
            break;

        case '/books':
            // we are passing objects in an array
            const books = [{id:1,name:'Atomic Habits',price:499},{id:2,name:'xDman',price:349}];

            // JSON.stringify() is specifically for converting JavaScript objects to JSON strings, not file contents.
            res.write(JSON.stringify(books));
            res.end();
            break;
        
        case '/authors':
            const authors = ['James Bond','Karl rock'];

            res.write(JSON.stringify(authors));
            res.end();
            break;

        // In case if the url is not found
        default:
            res.write('Not Found');
            res.end();
            break;

    }
}

const port = 3000;
server.listen(port,()=>{console.log(`Server is running on port ${port}`);});