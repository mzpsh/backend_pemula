const Hapi = require('@hapi/hapi');

async function main() {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  const routes = [
    require('./actions/home'),
    require('./actions/add_book'),
    require('./actions/get_all_books'),
    require('./actions/get_book_by_id'),
    require('./actions/edit_book_by_id'),
    require('./actions/delete_book_by_id')
  ];
  server.route(routes);

  await server.start();
  console.log(`Server started at ${server.info.uri}`);
}

main();
