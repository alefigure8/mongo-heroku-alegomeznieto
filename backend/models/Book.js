const { Schema, model } = require('mongoose');

const BookShema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true },
    imagePath: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

module.exports = model('Book', BookShema)