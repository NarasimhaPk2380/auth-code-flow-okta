import { BooksController } from "./books.controller";
import { UsersController } from "./users.controller";

const booksController = new BooksController();
const usersController = new UsersController();

export { booksController, usersController };
