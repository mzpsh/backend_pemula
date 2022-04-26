const { fail } = require('assert');
const { nanoid } = require('nanoid');
const books = require('../stores/books');

function handler(request, h) {
  const { id } = request.params;
  let response;
  const selectedBookIndex = books.findIndex((book) => book.id === id);

  if(selectedBookIndex === -1) {
    response = h.response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan"
    });
    response.code(404);
  } else {
    books.splice(selectedBookIndex, 1);
    response = h.response({
      status: "success",
      message: "Buku berhasil dihapus"
    });
    response.code(200);
  }

  return response;
}

const route = {
  method: 'DELETE',
  path: '/books/{id}',
  handler,
};

module.exports = route;
