// Import the 'http' module 
const http = require('http');

// Create an HTTP server instance using the 'createServer' method and passing a request handler 
// function named 'handler'
const server = http.createServer(handler);

// Define the request handler function, which responds with the text 'NodeJs' to any incoming 
// request
function handler(req,res) {
    res.write('NodeJs');
    res.end();
}

// Specify the port number on which the server will listen for incoming requests
const port = 3000;

// Start the server to listen for incoming requests on the specified port
server.listen(port,()=> {
    console.log(`The server is running on ${port}`);
});