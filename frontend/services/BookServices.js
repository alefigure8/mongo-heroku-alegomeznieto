class BookService {
    constructor() {
        this.uri = '/api/books';
    }

    async getBooks() { //Get Fetch
        const response = await fetch(this.uri);
        const books = await response.json();
        return books;
    };

    async postBooks(book) { //Post Fetch
        const response = await fetch(this.uri, {
            method: 'POST',
            body: book
        });
        const data = await response.json();
        console.log(data);
    };

    async deleteBooks(bookId) { //Delete fetch
        const response = await fetch(`${this.uri}/${bookId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
        });
        const data = await response.json();
        console.log(data);
    };
};

export default BookService;