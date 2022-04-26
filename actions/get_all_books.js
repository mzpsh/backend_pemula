const { nanoid } = require('nanoid');
const books = require('../stores/books');

function handler(request, h) {
  let response;

  const { name, reading, finished } = request.query;

  if(books.length === 0) {

    response = h.response({
      status: "success",
      data: {
        books: []
      }
    });
    return response;

  } else if (books.length > 0) {

    if(Object.keys(request.query).length > 0) {
      console.log('query called');
      let filteredBooks = books;

      if(name != undefined) {
      console.log('book query called');
        filteredBooks = filteredBooks.filter((book) => {
          return book.name.toLowerCase().includes(name.toLowerCase())
        });
      }

      if(reading != undefined){
        console.log('reading query called');
        filteredBooks = filteredBooks.filter((book) => {
          return book.reading == reading;
        });
      }

      if(finished != undefined){
        console.log('finished query called');
        filteredBooks = filteredBooks.filter((book) => {
          return (book.readPage >= book.pageCount) == finished;
        });
      }

      response = h.response({
        status: "success",
        data: {
          books: filteredBooks.map((book) => {
            return {
              id: book.id,
              name: book.name,
              publisher: book.publisher
            }
          })
        }
      });

      return response;
    };

    response = h.response({
      status: "success",
      data: {
        books: books.map((book) => {
          return {
            id: book.id,
            name: book.name,
            publisher: book.publisher
          }
        })
      }
    });
    return response;

  }
}

const route = {
  method: 'GET',
  path: '/books',
  handler,
};

module.exports = route;
