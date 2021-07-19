import "reflect-metadata";
import { BooksService } from "../../services/books.service";
import { bookData, reviewData } from "../../helpers/tests/mock-data";
import { BooksController } from "./books.controller";
import {
  createMocks,
  mockResponse,
  mockNext,
} from "../../helpers/tests/mocking-funtions";
import { Request } from "express";
import { NotFound } from "http-errors";

const availableMethodsInBookSrvc: any = {
  getBooks: [bookData],
  createBook: { ...bookData, _id: "123" },
  getBookDetails: bookData,
  updateBook: bookData,
  deleteBook: bookData,
  getBookReviews: { reviews: [reviewData] },
  createBookReview: reviewData,
  getBookReview: reviewData,
  updateBookReview: reviewData,
  deleteBookReview: reviewData,
};

const availableFailureMethodsInBookSrvc: any = {
  getBooks: () => {
    throw new Error("Failed to get the books");
  },
  createBook: () => {
    throw new Error("Failed to create the books");
  },
};

describe("BooksController", () => {
  let booksController: BooksController;
  const BooksServiceMock = <jest.Mock<BooksService>>BooksService;
  const instanceOfBookServiceMock = new BooksServiceMock();
  createMocks(instanceOfBookServiceMock, availableMethodsInBookSrvc, false);

  beforeEach(() => {
    booksController = new BooksController();
    booksController.booksService = instanceOfBookServiceMock;
  });

  it("Should create", () => {
    expect(booksController).toBeTruthy();
  });
  describe("Books CRUD success", () => {
    it("Should get books response", async () => {
      const res = mockResponse();
      await booksController.getBooks({} as Request, res, mockNext);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([bookData]);
    });
    it("Should create a book", async () => {
      const res = mockResponse();
      await booksController.createBook({} as Request, res, mockNext);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        statusCode: 200,
        message: "Successfully created the book",
      });
    });
    it("Should get books details", async () => {
      const res = mockResponse();
      await booksController.getBookDetails(
        { params: { book_id: "123" } } as any,
        res,
        mockNext
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(bookData);
    });
    it("Should update book details", async () => {
      const res = mockResponse();
      await booksController.updateBook(
        { params: { book_id: "123" } } as any,
        res,
        mockNext
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        statusCode: 200,
        message: "Successfully updated the book",
      });
    });
    it("Should delete a book", async () => {
      const res = mockResponse();
      await booksController.deleteBook(
        { params: { book_id: "123" } } as any,
        res,
        mockNext
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        statusCode: 200,
        message: "Successfully deleted the book",
      });
    });

    // Review
    it("Should get book reviews response", async () => {
      const res = mockResponse();
      await booksController.getBookReviews(
        { params: { book_id: "123" } } as any,
        res,
        mockNext
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([reviewData]);
    });
    it("Should create a book review", async () => {
      const res = mockResponse();
      await booksController.createBookReview(
        { params: { book_id: "123" } } as any,
        res,
        mockNext
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        statusCode: 200,
        message: "Successfully created the book review",
      });
    });
    it("Should get book review details", async () => {
      const res = mockResponse();
      await booksController.getBookReview(
        { params: { book_id: "123", review_id: "1" } } as any,
        res,
        mockNext
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(reviewData);
    });

    it("Should update book details", async () => {
      const res = mockResponse();
      await booksController.updateBookReview(
        { params: { book_id: "123", review_id: "1" } } as any,
        res,
        mockNext
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        statusCode: 200,
        message: "Successfully updated the book review",
      });
    });
    it("Should delete a book review", async () => {
      const res = mockResponse();
      await booksController.deleteBookReview(
        { params: { book_id: "123", review_id: "1" } } as any,
        res,
        mockNext
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        statusCode: 200,
        message: "Successfully deleted the book review",
      });
    });
  });
});

describe("BooksController Failures", () => {
  let booksController: BooksController;
  beforeEach(() => {
    booksController = new BooksController();
    booksController.booksService = availableFailureMethodsInBookSrvc;
  });

  it("Should create", () => {
    expect(booksController).toBeTruthy();
  });

  it("Should get the books", async () => {
    const res = mockResponse();
    await booksController.getBooks({} as Request, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith("Failed to get the books");
  });
  it("Should create the books", async () => {
    const res = mockResponse();
    await booksController.createBook({} as Request, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith("Failed to create the books");
  });
});
