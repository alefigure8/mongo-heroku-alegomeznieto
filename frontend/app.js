import './styles/app.css';
import UI from './UI.js'

//Variables
const bookForm = document.querySelector('#book-form')

//DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.renderBook();
})

//Listener
bookForm.addEventListener('submit', e => {
    e.preventDefault()

    const title = bookForm['title'].value;
    const author = bookForm['author'].value;
    const isbn = bookForm['isbn'].value;
    const image = bookForm['image'].files;

    //Validation
    if (title === '' || author === '' || isbn === '' || image.length === 0) {
        console.log('falta informacion');
        return;
    }

    const formData = new FormData();
    formData.append('image', image[0]); //Pasa una sola imagen
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn);

    const ui = new UI();
    ui.addNayBook(formData);

    ui.renderMessage('Book added', 'success', 3000)
})

//Delete
document.querySelector('#book-cards')
    .addEventListener('click', e => {
        e.preventDefault()
        if (e.target.classList.contains('delete')) {
            const ui = new UI();
            ui.deleteBook(e.target.getAttribute('_id'))
            ui.renderMessage('Book removed', 'danger', 2000)
        }
    })