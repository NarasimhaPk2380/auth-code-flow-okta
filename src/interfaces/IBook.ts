export interface Book {
  _id?: string;
  name: string;
  author: string[];
  price: string;
  reviews: Review[];
  publisher: {
    publisher_id: string;
    name: string;
    location: string;
  };
}
export interface Review {
  reviewer: string;
  message: string;
}
