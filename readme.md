#NodeJS
### Creating a NodeJS Server using 'init npm'
### Defining routes using NodeJS
### Defining routes using expressJS

#### controller folder include all the handler (callback) function
#### routes folder contains all the route specific files

#### Using Update(patch) logic:
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
