function handler() {
  return 'Welcome.';
}

const route = {
  method: 'GET',
  path: '/',
  handler,
};

module.exports = route;
