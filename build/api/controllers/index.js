"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = exports.booksController = void 0;
var books_controller_1 = require("./books.controller");
var users_controller_1 = require("./users.controller");
var booksController = new books_controller_1.BooksController();
exports.booksController = booksController;
var usersController = new users_controller_1.UsersController();
exports.usersController = usersController;
