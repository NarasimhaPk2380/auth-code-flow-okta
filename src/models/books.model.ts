import mongoose from "mongoose";
import { Book } from "../interfaces/IBook";
const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  author: {
    type: Array,
    required: [true, "Author is required"],
  },
  price: {
    type: String,
    required: [true, "Price is required"],
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  publisher: {
    publisher_id: {
      type: String,
      required: [true, "publisher_id is required"],
    },
    name: {
      type: String,
      required: [true, "publisher name is required"],
    },
    location: {
      type: String,
      required: [true, "publisher location is required"],
    },
  },
});

export default mongoose.model("Book", BookSchema);
