const { fail } = require('assert');
const { nanoid } = require('nanoid');
const books = require('../stores/books');

function handler(request, h) {
  const { id } = request.params;
  let response;
  
  const selectedBook =  books.find((book) => book.id === id);

  if(selectedBook === undefined) {
    response = h.response({
      status: "fail",
      message: "Buku tidak ditemukan"
    });
    response.code(404);
  } else if(selectedBook) {
    response = h.response({
      status: "success",
      data: {
        book: selectedBook
      }
    });
  }

  return response;
}

const route = {
  method: 'GET',
  path: '/books/{id}',
  handler,
};

module.exports = route;
