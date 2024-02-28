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