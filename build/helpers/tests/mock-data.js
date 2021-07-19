"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksList = exports.reviewsList = exports.reviewData = exports.bookData = void 0;
exports.bookData = {
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
exports.reviewData = {
    reviewer: "durga",
    message: "Book is so nyc",
};
exports.reviewsList = [
    exports.reviewData,
    {
        reviewer: "srikanth",
        message: "Book is so good",
    },
];
exports.booksList = [
    exports.bookData,
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
