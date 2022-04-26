const { nanoid } = require('nanoid');
const books = require('../stores/books');

function handler(request, h) {
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

  if(readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    });
    response.code(400);
    return response;
  } 

  if(name === undefined){
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku"
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const currentDate =  new Date().toISOString();

  const newBook = {
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
    insertedAt: currentDate,
    updatedAt: currentDate,
  }

  books.push(newBook);

  const response = h.response({
    status: "success",
    message: "Buku berhasil ditambahkan",
    data: {
      bookId: id
    }
  });
  response.code(201)
  return response;
}

const route = {
  method: 'POST',
  path: '/books',
  handler,
};

module.exports = route;
