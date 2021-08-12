const { Router } = require('express');
const router = Router();
const { unlink } = require('fs-extra');
const path = require('path');

// Model Book
const Book = require('../models/Book')

//GET JSON
router.get('/', async(req, res) => {
    const books = await Book.find();
    res.json(books);
})

//POST JSON
router.post('/', async(req, res) => {
    const { title, author, isbn } = req.body;
    const imagePath = '/uploads/' + req.file.filename; //Guarda noombre del archivo de la imagen
    const newBook = new Book({ title, author, isbn, imagePath }); //Crear modelo
    await newBook.save();
    res.json({ messsage: 'Book Saved' });
})

//DELETE JSON
router.delete('/:id', async(req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    unlink(path.resolve('./backend/public' + book.imagePath));
    res.json({ messsage: 'Book Deleted' });
})

module.exports = router;