import BookService from "./services/BookServices";
import { format } from 'timeago.js';
const bookServices = new BookService();

class UI { //Maneja elementos del DOM

    async renderBook() { //Mostrar datos en pantalla
        const books = await bookServices.getBooks();
        const bookCardsContainer = document.querySelector('#book-cards');
        bookCardsContainer.innerHTML = '';
        books.reverse().forEach(book => { //Book cards 
            const { title, author, isbn, imagePath, _id, createdAt } = book;
            const div = document.createElement('div')
            div.className = '';
            div.innerHTML = `
                <div class="card m-2">
                    <div class="row my-4">
                        <div class="col-md-4">
                        <img src="${imagePath}" class="img-fluid"/>
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2">
                                <h4 class="card-title">${title}</h4>
                                <p class="card-text">Author: ${author}</p>
                                <p>ISBN: ${isbn}</p>
                                <a href="#" class="btn btn-danger delete" _id="${_id}">X</a>
                            </div>
                        </div> 
                    </div>
                    <div class="card-footer">
                        Created: ${format(createdAt)}
                    </div>
                </div>
            `
            bookCardsContainer.appendChild(div);
        });
    }

    async addNayBook(book) {
        await bookServices.postBooks(book); //Pasa el objeto del formulario al serviceBook
        this.clearBookForm();
        this.renderBook();
    }

    clearBookForm() { //Resetea formulario
        document.querySelector('#book-form').reset();
    }

    renderMessage(message, colorMessage, secondsToRemove) {
        const div = document.createElement('div');
        div.classList.add('alert', `alert-${colorMessage}`, 'text-center');
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.col-md-4')
        const bookForm = document.querySelector('#book-form');

        container.insertBefore(div, bookForm)

        setTimeout(() => {
            div.remove()
        }, secondsToRemove);
    }


    async deleteBook(bookId) {
        await bookServices.deleteBooks(bookId)
        this.renderBook();
    }

}

export default UI;