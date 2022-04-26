const { fail } = require('assert');
const { nanoid } = require('nanoid');
const books = require('../stores/books');

function handler(request, h) {
  const { id } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload;
  let response;
  const selectedBookIndex = books.findIndex((book) => book.id === id);

  if(selectedBookIndex === -1) {
    response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404); 
  }

  if(name === undefined) {
    response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku"
    });
    response.code(400);
  }

  if(readPage > pageCount) {
    response = h.response({
      status: "fail",
      message:  "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
    });
    response.code(400);
  }

  if(name != undefined && pageCount >= readPage && selectedBookIndex != -1){
    const currentDate = new Date().toISOString();
    const editedBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished: (readPage === pageCount),
      reading,
      insertedAt: books[selectedBookIndex].insertedAt,
      updatedAt: currentDate,
    }

    books[selectedBookIndex] = editedBook;

    response = h.response({
      status: "success",
      message: 'Buku berhasil diperbarui'
    });
  }

  return response;
}

const route = {
  method: 'PUT',
  path: '/books/{id}',
  handler,
};

module.exports = route;
