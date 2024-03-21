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

module.exports = {
    basicAuth,
}