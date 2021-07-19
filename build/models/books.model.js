"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var BookSchema = new mongoose_1.default.Schema({
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
            type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.default = mongoose_1.default.model("Book", BookSchema);
