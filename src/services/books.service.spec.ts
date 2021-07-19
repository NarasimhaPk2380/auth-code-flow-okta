import { BooksService } from "./books.service";
import { bookData, reviewData } from "../helpers/tests/mock-data";
import Book from "../models/books.model";
import Review from "../models/review.model";

describe("BooksService Success cases", () => {
  let booksService: BooksService;

  beforeEach(() => {
    booksService = new BooksService();
  });

  it("Should create", () => {
    expect(booksService).toBeTruthy();
  });

  describe("Books CRUD Operations", () => {
    it("Should retreieve all books", async () => {
      Book.find = jest.fn().mockImplementationOnce(() => ({
        populate: jest.fn().mockResolvedValueOnce([bookData]),
      }));
      const response = await booksService.getBooks();
      expect(response).toEqual([bookData]);
    });
    it("Should create a book", async () => {
      Book.prototype.save = jest
        .fn()
        .mockResolvedValueOnce({ ...bookData, _id: "123" });
      const response = await booksService.createBook(bookData);
      expect(response._id).toBeDefined();
    });

    it("Should get a book details", async () => {
      Book.findById = jest.fn().mockResolvedValueOnce({ ...bookData });
      const response = await booksService.getBookDetails("123");
      expect(response).toEqual(bookData);
    });

    it("Should update a book", async () => {
      Book.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValueOnce({ ...bookData, name: "durga" });
      const response = await booksService.updateBook("123", bookData);
      expect(response.name).toBe("durga");
    });

    it("Should delete a book", async () => {
      Book.findByIdAndDelete = jest.fn().mockResolvedValueOnce({ ...bookData });
      const response = await booksService.deleteBook("123");
      expect(response).toEqual(bookData);
    });
  });

  describe("Revies CRUD Operations", () => {
    it("Should retreieve all reviews", async () => {
      Book.findById = jest.fn().mockImplementationOnce(() => ({
        populate: jest.fn().mockResolvedValueOnce([reviewData]),
      }));
      const response = await booksService.getBookReviews("123");
      expect(response).toEqual([reviewData]);
    });
    it("Should create a review", async () => {
      try {
        Book.findById = jest.fn().mockResolvedValueOnce({
          ...bookData,
          save: jest.fn().mockResolvedValueOnce({ ...bookData }),
        });
        Review.prototype.save = jest
          .fn()
          .mockResolvedValueOnce({ ...reviewData, _id: "123" });
        const response = await booksService.createBookReview("123", reviewData);
        expect(response?.reviews?.length).toBe(1);
      } catch (e) {
        console.log(e.message);
      }
    });

    it("Should get a book review", async () => {
      Review.findById = jest.fn().mockResolvedValueOnce(reviewData);
      const response = await booksService.getBookReview("1");
      expect(response).toEqual(reviewData);
    });

    it("Should update a book review", async () => {
      Review.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValueOnce({ ...reviewData, reviewer: "durga" });
      const response = await booksService.updateBookReview(
        "123",
        "231",
        reviewData
      );
      expect(response.reviewer).toBe("durga");
    });

    it("Should delete a book review", async () => {
      Review.findByIdAndDelete = jest
        .fn()
        .mockResolvedValueOnce({ ...reviewData });
      const response = await booksService.deleteBookReview("123", "231");
      expect(response).toEqual(reviewData);
    });
  });
});

describe("BooksService Failure cases", () => {
  let booksService: BooksService;

  beforeEach(() => {
    booksService = new BooksService();
  });

  it("Should create", () => {
    expect(booksService).toBeTruthy();
  });

  describe("Books CRUD Operations", () => {
    it("Should fail to retreieve all books", async () => {
      Book.find = jest.fn().mockImplementationOnce(() => {
        throw new Error("Failed to retrieve all books");
      });
      try {
        await booksService.getBooks();
      } catch (e) {
        expect(e.message).toBe("Failed to retrieve all books");
      }
    });
    it("Should fail to create a book", async () => {
      Book.prototype.save = jest.fn().mockImplementationOnce(() => {
        throw new Error("Failed to create a book");
      });
      try {
        await booksService.createBook(bookData);
      } catch (e) {
        expect(e.message).toBe("Failed to create a book");
      }
    });

    it("Should fail to get a book details", async () => {
      Book.findById = jest.fn().mockImplementationOnce(() => {
        throw new Error("Failed to retrieve book details");
      });
      try {
        await booksService.getBookDetails("123");
      } catch (e) {
        expect(e.message).toBe("Failed to retrieve book details");
      }
    });

    it("Should fail to update a book", async () => {
      Book.findByIdAndUpdate = jest.fn().mockImplementationOnce(() => {
        throw new Error("Failed to update a book");
      });
      try {
        await booksService.updateBook("123", bookData);
      } catch (e) {
        expect(e.message).toBe("Failed to update a book");
      }
    });

    it("Should fail to delete a book", async () => {
      Book.findByIdAndDelete = jest.fn().mockImplementationOnce(() => {
        throw new Error("Failed to delete a book");
      });
      try {
        await booksService.deleteBook("123");
      } catch (e) {
        expect(e.message).toEqual("Failed to delete a book");
      }
    });
  });

  describe("Revies CRUD Operations", () => {
    it("Should fail to retreieve all reviews", async () => {
      Book.findById = jest.fn().mockImplementationOnce(() => ({
        populate: jest.fn().mockImplementationOnce(() => {
          throw new Error("Failed to retrieve all reviews");
        }),
      }));
      try {
        await booksService.getBookReviews("123");
      } catch (e) {
        expect(e.message).toEqual("Failed to retrieve all reviews");
      }
    });
    it("Should fail to create a review", async () => {
      try {
        Book.findById = jest.fn().mockRejectedValueOnce({
          ...bookData,
          save: jest.fn().mockImplementationOnce(() => {
            throw new Error("Failed to create a book review");
          }),
        });
        await booksService.createBookReview("123", reviewData);
      } catch (e) {
        expect(e.message).toBeDefined();
      }
    });

    it("Should fail to get a book review", async () => {
      Review.findById = jest.fn().mockImplementationOnce(() => {
        throw new Error("Failed to get a book review");
      });
      try {
        await booksService.getBookReview("1");
      } catch (e) {
        expect(e.message).toEqual("Failed to get a book review");
      }
    });

    it("Should fail to update a book review", async () => {
      Review.findByIdAndUpdate = jest.fn().mockImplementationOnce(() => {
        throw new Error("Failed to update a book review");
      });
      try {
        await booksService.updateBookReview("123", "231", reviewData);
      } catch (e) {
        expect(e.message).toBe("Failed to update a book review");
      }
    });

    it("Should fail to delete a book review", async () => {
      Review.findByIdAndDelete = jest.fn().mockImplementationOnce(() => {
        throw new Error("Failed to delete a book review");
      });
      try {
        await booksService.deleteBookReview("123", "231");
      } catch (e) {
        expect(e.message).toEqual("Failed to delete a book review");
      }
    });
  });
});
