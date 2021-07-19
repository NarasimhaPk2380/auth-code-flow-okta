import { Service } from "typedi";
import { Book as BookI, Review as ReviewI } from "../interfaces/IBook";
import Book from "../models/books.model";
import Review from "../models/review.model";

@Service()
export class BooksService {
  getBooks(): Promise<any> {
    try {
      return Book.find({}).populate("reviews");
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async createBook(bookData: BookI) {
    try {
      const book = new Book(bookData);
      return book.save();
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async getBookDetails(bookId: string) {
    try {
      return Book.findById(bookId);
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async updateBook(bookId: string, bookData: BookI) {
    try {
      return Book.findByIdAndUpdate(bookId, {
        ...bookData,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async deleteBook(bookId: string) {
    try {
      return Book.findByIdAndDelete(bookId);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getBookReviews(bookId: string) {
    try {
      return Book.findById(bookId, "reviews").populate("reviews");
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async createBookReview(bookId: string, reviewData: ReviewI) {
    try {
      const book = await Book.findById(bookId);
      const review = new Review(reviewData);
      await review.save();
      book?.reviews.push(review);
      return book?.save();
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async getBookReview(reviewId: string) {
    try {
      return Review.findById(reviewId);
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async updateBookReview(
    bookId: string,
    reviewId: string,
    reviewData: ReviewI
  ) {
    try {
      return Review.findByIdAndUpdate(reviewId, {
        ...reviewData,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async deleteBookReview(bookId: string, reviewId: string) {
    try {
      return Review.findByIdAndDelete(reviewId);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
