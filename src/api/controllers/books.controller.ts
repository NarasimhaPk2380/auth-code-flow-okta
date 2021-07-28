import { NextFunction, Request, Response } from "express";
import { BooksService } from "../../services/books.service";
import logger from "../../loaders/logger";
import { NotFound } from "http-errors";
import { ErrorHandlerInstance } from "../middlewares/error.middleware";
import Container from "typedi";

export class BooksController {
  booksService: BooksService;
  constructor() {
    this.booksService = Container.get(BooksService);
  }
  async getBooks(req: Request, res: Response, next: NextFunction) {
    try {
      logger.debug("Get books Api invoked");
      const booksList = await this.booksService.getBooks();
      logger.debug("Get books Api response given");
      return res.json(booksList).status(200);
    } catch (e) {
      // logger.error(e.message);
      // next(e.message);
      ErrorHandlerInstance.error(e, req, res, next);
    }
  }
  async createBook(req: Request, res: Response, next: NextFunction) {
    try {
      logger.debug("Create book Api invoked");
      await this.booksService.createBook(req.body);
      logger.debug("Successfully created the book");
      return res
        .json({
          statusCode: 200,
          message: "Successfully created the book",
        })
        .status(200);
    } catch (e) {
      // logger.error(e.message);
      // next(e.message);
      ErrorHandlerInstance.error(e, req, res, next);
    }
  }
  async getBookDetails(req: Request, res: Response, next: NextFunction) {
    try {
      logger.debug("get book details Api invoked");
      const bookDetails = await this.booksService.getBookDetails(
        req.params.book_id
      );
      if (!bookDetails) {
        throw new Error();
      }
      logger.debug("get book details response given");
      return res.json(bookDetails).status(200);
    } catch (e) {
      // e.message = "BookId is not found";
      // logger.error(e.message);
      // next(new NotFound(e.message));
      ErrorHandlerInstance.error(
        new NotFound("BookId is not found"),
        req,
        res,
        next
      );
    }
  }
  async updateBook(req: Request, res: Response, next: NextFunction) {
    try {
      logger.debug("Update book details Api invoked");
      const book = await this.booksService.updateBook(
        req.params.book_id,
        req.body
      );
      if (!book) {
        throw new Error();
      }
      logger.debug("Updated the book details");
      return res
        .json({ statusCode: 200, message: "Successfully updated the book" })
        .status(200);
    } catch (e) {
      // e.message = "BookId is not found";
      // logger.error(e.message);
      // next(new NotFound(e.message));
      ErrorHandlerInstance.error(
        new NotFound("BookId is not found"),
        req,
        res,
        next
      );
    }
  }
  async deleteBook(req: Request, res: Response, next: NextFunction) {
    try {
      logger.debug("Delete book Api invoked");
      const deletedBook = await this.booksService.deleteBook(
        req.params.book_id
      );
      if (!deletedBook) {
        throw new Error();
      }
      logger.debug("Book is deleted");
      return res
        .json({ statusCode: 200, message: "Successfully deleted the book" })
        .status(200);
    } catch (e) {
      // e.message = "BookId is not found";
      // logger.error(e.message);
      // next(new NotFound(e.message));
      ErrorHandlerInstance.error(
        new NotFound("BookId is not found"),
        req,
        res,
        next
      );
    }
  }
  async getBookReviews(req: Request, res: Response, next: NextFunction) {
    try {
      logger.debug("Get book reviews Api invoked");
      const reviewsList = await this.booksService.getBookReviews(
        req.params.book_id
      );
      if (!reviewsList) {
        throw new Error();
      }
      logger.info("Book reviews response is given");
      return res.json(reviewsList?.reviews).status(200);
    } catch (e) {
      // e.message = "BookId is not found";
      // logger.error(e.message);
      // next(new NotFound(e.message));
      ErrorHandlerInstance.error(
        new NotFound("BookId is not found"),
        req,
        res,
        next
      );
    }
  }
  async createBookReview(req: Request, res: Response, next: NextFunction) {
    try {
      logger.debug("Create book review Api invoked");
      const bookReview = await this.booksService.createBookReview(
        req.params.book_id,
        req.body
      );
      if (!bookReview) {
        throw new Error();
      }
      logger.debug("Book review is created");
      return res
        .json({
          statusCode: 200,
          message: "Successfully created the book review",
        })
        .status(200);
    } catch (e) {
      // e.message = "BookId is not found";
      // logger.error(e.message);
      // next(new NotFound(e.message));
      ErrorHandlerInstance.error(
        new NotFound("BookId is not found"),
        req,
        res,
        next
      );
    }
  }
  async updateBookReview(req: Request, res: Response, next: NextFunction) {
    try {
      logger.debug("Update book review Api invoked");
      const bookReview = await this.booksService.updateBookReview(
        req.params.book_id,
        req.params.review_id,
        req.body
      );
      if (!bookReview) {
        throw new Error();
      }
      logger.debug("Updated the book review");
      return res
        .json({
          statusCode: 200,
          message: "Successfully updated the book review",
        })
        .status(200);
    } catch (e) {
      // e.message = "Either BookId or Review Id is not found";
      // logger.error(e.message);
      // next(new NotFound(e.message));
      ErrorHandlerInstance.error(
        new NotFound("Either BookId or Review Id is not found"),
        req,
        res,
        next
      );
    }
  }
  async getBookReview(req: Request, res: Response, next: NextFunction) {
    try {
      logger.debug("Get book review Api invoked");
      const bookReview = await this.booksService.getBookReview(
        req.params.review_id
      );
      if (!bookReview) {
        throw new Error();
      }
      logger.debug("Get book review response is given");
      return res.json(bookReview).status(200);
    } catch (e) {
      // e.message = "Either BookId or Review Id is not found";
      // logger.error(e.message);
      // next(new NotFound(e.message));
      ErrorHandlerInstance.error(
        new NotFound("Either BookId or Review Id is not found"),
        req,
        res,
        next
      );
    }
  }
  async deleteBookReview(req: Request, res: Response, next: NextFunction) {
    logger.debug("Delete book review Api invoked");
    try {
      const deleteBookReview = await this.booksService.deleteBookReview(
        req.params.book_id,
        req.params.review_id
      );
      if (!deleteBookReview) {
        throw new Error();
      }
      logger.debug("Delete book review response is given");
      return res
        .json({
          statusCode: 200,
          message: "Successfully deleted the book review",
        })
        .status(200);
    } catch (e) {
      // e.message = "Either BookId or Review Id is not found";
      // logger.error(e.message);
      // next(new NotFound(e.message));
      ErrorHandlerInstance.error(
        new NotFound("Either BookId or Review Id is not found"),
        req,
        res,
        next
      );
    }
  }
}
