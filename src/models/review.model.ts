import mongoose from "mongoose";
import { Review } from "../interfaces/IBook";
const ReviewSchema = new mongoose.Schema({
  reviewer: {
    type: String,
    required: [true, "Reviewer is required"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
});

export default mongoose.model("Review", ReviewSchema);
