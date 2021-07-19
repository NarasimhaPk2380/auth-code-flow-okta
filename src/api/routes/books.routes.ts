import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { joiValidation } from "../middlewares/joi-validation.middleware";
import { booksController } from "../controllers";
import { bookSchema, reviewSchema } from "../../helpers/validation_schema";
import { oidc } from "../../loaders/express";
const router = Router();
export default (app: Router) => {
  //app.use("/books", oidc.ensureAuthenticated(), router);
  app.use("/books", authMiddleware, router);
  router.get("/", booksController.getBooks.bind(booksController));
  router.get("/:book_id", booksController.getBookDetails.bind(booksController));
  router.get(
    "/:book_id/reviews",
    booksController.getBookReviews.bind(booksController)
  );
  router.get(
    "/:book_id/reviews/:review_id",
    booksController.getBookReview.bind(booksController)
  );

  router.post(
    "/",
    joiValidation(bookSchema),
    booksController.createBook.bind(booksController)
  );
  router.post(
    "/:book_id/reviews",
    joiValidation(reviewSchema),
    booksController.createBookReview.bind(booksController)
  );

  router.put(
    "/:book_id",
    joiValidation(bookSchema),
    booksController.updateBook.bind(booksController)
  );
  router.put(
    "/:book_id/reviews/:review_id",
    joiValidation(reviewSchema),
    booksController.updateBookReview.bind(booksController)
  );

  router.delete("/:book_id", booksController.deleteBook);
  router.delete(
    "/:book_id/reviews/:review_id",
    booksController.deleteBookReview.bind(booksController)
  );
};
