const express = require('express');
const { v4: uuid } = require('uuid');
const bodyParser = require('body-parser');

class Book {
    constructor(
                title = "",
                description = "",
                authors = "",
                favorite = "",
                fileCover = "",
                fileName = "",
                id = uuid()) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
    }
}

const library = {
    books: [],
};

const app = express();
app.use(express.json());

app.post('/api/user/login', (req, res) => {
    res.status(201);
    res.json({ id: 1, mail: "test@mail.ru" });
});

app.get('/api/books', (req, res) => {
    const {books} = library;
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
    const {books} = library;
    const {id} = req.params;
    const index = books.findIndex( elem => elem.id === id );
    if ( index !== -1 ) {
        res.json(books[index]);
    } else {
        res.status(404);
        res.json('404 | Книга не найдена');
    }
});

app.post('/api/books', (req, res) => {
    const {books} = library;
    const {title, description, authors, favorite, fileCover, fileName, id} = req.body;

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, id);
    books.push(newBook);
    res.status(201);
    res.json(newBook);
});

app.put('/api/books/:id', (req, res) => {
    const {books} = library;
    const {id} = req.params;
    const index = books.findIndex( elem => elem.id === id );
    if (index !== -1) {
        books[index] = {
            ...books[index], 
            ...req.body
        }
        res.json(books[index])
    } else {
        res.status(404);
        res.json('404 | Книга не найдена');
    }
});

app.delete('/api/books/:id', (req, res) => {
    const {books} = library;
    const {id} = req.params;

    const index = books.findIndex( elem => elem.id === id )
    if ( index !== -1 ) {
        books.splice(index, 1);
        res.json('Ok');     
    } else {
        res.status(404);
        res.json('Книга не найдена');
    }
    // books.filter( elem => elem.id !== id );
    // res.json('Ok');
});
  
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));