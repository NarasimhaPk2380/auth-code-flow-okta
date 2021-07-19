import { Router } from "express";
import books from "./routes/books.routes";
import users from "./routes/users.routes";

export default () => {
  const app = Router();
  books(app);
  users(app);
  return app;
};
