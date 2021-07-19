import { Book as IBook, Review as IReview } from "../../interfaces/IBook";
export const bookData: IBook = {
  publisher: {
    publisher_id: "123",
    name: "raja",
    location: "singapore",
  },
  author: ["mark"],
  name: "kalyan",
  price: "$4.5",
  reviews: [],
};

export const reviewData: IReview = {
  reviewer: "durga",
  message: "Book is so nyc",
};

export const reviewsList: IReview[] = [
  reviewData,
  {
    reviewer: "srikanth",
    message: "Book is so good",
  },
];
export const booksList = [
  bookData,
  {
    publisher: {
      publisher_id: "321",
      name: "narasimha",
      location: "india",
    },
    author: ["zukerberg"],
    name: "durga",
    price: "$4",
    reviews: [],
  },
];
