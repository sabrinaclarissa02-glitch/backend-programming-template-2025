const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const undian = require('./components/undian/undian-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  undian(app);

  return app;
};
