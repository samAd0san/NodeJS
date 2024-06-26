const jwt = require('jsonwebtoken');
const config = require('../config/index.js');

function basicAuth(req,res,next) {
    const authHeader = req.headers.authorization // Enter from postman (Authorization)
    // Postman automatically encodes the credentials in Base64 format.
    console.log(authHeader); // Basic YWRtaW46cGFzc3dvcmQ=

    if(!authHeader){
        res.status(401).send('Unauthorized');
        return;
    }

    const authToken = authHeader.split(' '); // [ 'Basic', 'YWRtaW46cGFzc3dvcmQ=' ]
    // TRY https://www.base64decode.org/ -> DECODE -> YWRtaW46cGFzc3dvcmQ= 
    const buf = Buffer.from(authToken[1], 'base64'); // 'YWRtaW46cGFzc3dvcmQ=' ---> <Buffer 61 64 6d 69 6e 3a 70 61 73 73 77 6f 72 64>
    const decoded = buf.toString(); // admin:password
    const tokens = decoded.split(':'); // [ 'admin', 'password' ]
    const [username,password] = tokens; // admin password 
    if(username === 'admin' && password === 'password'){
        next();
    }else{
        res.status(401).send('Unauthorized');
    }
}

function tokenAuth(req,res,next) {
    const authHeader = req.headers.authorization;
    // console.log(authHeader); 
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI.....
    if (!authHeader) {
        res.status(401).send('Unauthorized');
    }

    const tokens = authHeader.split(' ');
    const authToken = tokens[1];

    // Token Verify
    jwt.verify(authToken,config.jwtSecret,function(err,decoded){
        if(err){
            res.status(401).send('Unauthorized');
        }else{
            req.role = decoded.role; // We are assigning decoded.role to req.role
            // console.log(req.role); // Admin / User depends 
            // console.log(decoded); // {email: 'admin0@gmail.com',role: 'Admin',iat: 1711851706,exp: 171193810}
            next();
        }
    });
}

function authorizeAdmin(req,res,next) {
    // console.log('Role: ',req.role) // Admin / User depends
    if(req.role === 'Admin') next();
    else res.status(403).send('Forbidden');
}

module.exports = {
    basicAuth,
    tokenAuth,
    authorizeAdmin
}