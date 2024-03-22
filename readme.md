### Using Update(patch) logic:
for(let i=0; i < bookDb.length; i++){
        if(bookDb[i].id === id){
            for(let key in playload){
                bookDb[i][key] = playload[key]; // check readme.md to understand this code 
            }
        }
    }

This code iterates through the booksDb array to find the book with the specified id. Once it finds the book, it iterates through each property in the payload object (which contains the updates sent in the PATCH request). For each property in the payload, it updates the corresponding property in the book object with the new value.

### Implementing pagination
Total Rows: 101
page size: 10
total pages : 11 (because each page consists of max 10 rows, the 11th page will have only one row)
total pages:  Math.ceil(total rows)/page size (if 10.1 - ceil -> 11) and floor will be 10
1 2 3 ... 10
1: 1 -10   skip: 0   (1-1)*10 = 0
2: 11 - 20 skip: 10  (2-1)*10 = 10
3: 21 - 30  skip: 20 (3-1)* 10 = 20
4: 31 - 40 skip: 30  (4-1)*10 = 30
( current page - 1 ) * pageSize

### encrypting the password
npm install bcrypt

### basic authentication
1. create middleware/auth.js -> basicAuth
2. In routes.js specify the middle ware
3. Now, in postman (GET)
Authorization -> basic auth -> username = admin , password = password
URL: //localhost:3000/books or products
- we can access '/' and 'signin' 'signup' endpoint without authentication
4. Base64 - It is used to convert binary data into ASCII characters (text characters).

### token authentication
1. install jwt 
   npm i jsonwebtoken
2. create config/index.js -> for env variable i.e secret key
3. To generate Temparory tokens 
   jwt.sign(payload,jwtSecretKey,expiry date)
4. To verify The token (which is passed in Bearer token)
   jwt.verify(generatedToken,jwtSecretKey,callback(err,decoded))
5. To send Request in postman
   5.1 - (POST) /signin, enter credentials, the token will be generated, copy the generated token.
   5.2 - (GET) goto Authorization -> type (Bearer Token) -> paste token
   5.3 - (GET) access endpoint /books or /products

### authorization
authorizing (giving permission) to the user to delete the product, setting the role - 'Admin'
1. add role in userModel
2. jwt.sign
3. jwt.verify
4. productRoutes.js

- Steps to execute
1. create the user 
2. first signin (if tokenAuth) via post
3. then cp the token and paste in Authorization -> bearer token
4. access /products endpoint
5. try to perform (DELETE) operation if the user role is admin