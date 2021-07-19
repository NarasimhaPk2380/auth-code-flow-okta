"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var books_service_1 = require("../../services/books.service");
var mock_data_1 = require("../../helpers/tests/mock-data");
var books_controller_1 = require("./books.controller");
var mocking_funtions_1 = require("../../helpers/tests/mocking-funtions");
var availableMethodsInBookSrvc = {
    getBooks: [mock_data_1.bookData],
    createBook: __assign(__assign({}, mock_data_1.bookData), { _id: "123" }),
    getBookDetails: mock_data_1.bookData,
    updateBook: mock_data_1.bookData,
    deleteBook: mock_data_1.bookData,
    getBookReviews: { reviews: [mock_data_1.reviewData] },
    createBookReview: mock_data_1.reviewData,
    getBookReview: mock_data_1.reviewData,
    updateBookReview: mock_data_1.reviewData,
    deleteBookReview: mock_data_1.reviewData,
};
var availableFailureMethodsInBookSrvc = {
    getBooks: function () {
        throw new Error("Failed to get the books");
    },
    createBook: function () {
        throw new Error("Failed to create the books");
    },
};
describe("BooksController", function () {
    var booksController;
    var BooksServiceMock = books_service_1.BooksService;
    var instanceOfBookServiceMock = new BooksServiceMock();
    mocking_funtions_1.createMocks(instanceOfBookServiceMock, availableMethodsInBookSrvc, false);
    beforeEach(function () {
        booksController = new books_controller_1.BooksController();
        booksController.booksService = instanceOfBookServiceMock;
    });
    it("Should create", function () {
        expect(booksController).toBeTruthy();
    });
    describe("Books CRUD success", function () {
        it("Should get books response", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res = mocking_funtions_1.mockResponse();
                        return [4 /*yield*/, booksController.getBooks({}, res, mocking_funtions_1.mockNext)];
                    case 1:
                        _a.sent();
                        expect(res.status).toHaveBeenCalledWith(200);
                        expect(res.json).toHaveBeenCalledWith([mock_data_1.bookData]);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should create a book", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res = mocking_funtions_1.mockResponse();
                        return [4 /*yield*/, booksController.createBook({}, res, mocking_funtions_1.mockNext)];
                    case 1:
                        _a.sent();
                        expect(res.status).toHaveBeenCalledWith(200);
                        expect(res.json).toHaveBeenCalledWith({
                            statusCode: 200,
                            message: "Successfully created the book",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should get books details", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res = mocking_funtions_1.mockResponse();
                        return [4 /*yield*/, booksController.getBookDetails({ params: { book_id: "123" } }, res, mocking_funtions_1.mockNext)];
                    case 1:
                        _a.sent();
                        expect(res.status).toHaveBeenCalledWith(200);
                        expect(res.json).toHaveBeenCalledWith(mock_data_1.bookData);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should update book details", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res = mocking_funtions_1.mockResponse();
                        return [4 /*yield*/, booksController.updateBook({ params: { book_id: "123" } }, res, mocking_funtions_1.mockNext)];
                    case 1:
                        _a.sent();
                        expect(res.status).toHaveBeenCalledWith(200);
                        expect(res.json).toHaveBeenCalledWith({
                            statusCode: 200,
                            message: "Successfully updated the book",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should delete a book", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res = mocking_funtions_1.mockResponse();
                        return [4 /*yield*/, booksController.deleteBook({ params: { book_id: "123" } }, res, mocking_funtions_1.mockNext)];
                    case 1:
                        _a.sent();
                        expect(res.status).toHaveBeenCalledWith(200);
                        expect(res.json).toHaveBeenCalledWith({
                            statusCode: 200,
                            message: "Successfully deleted the book",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        // Review
        it("Should get book reviews response", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res = mocking_funtions_1.mockResponse();
                        return [4 /*yield*/, booksController.getBookReviews({ params: { book_id: "123" } }, res, mocking_funtions_1.mockNext)];
                    case 1:
                        _a.sent();
                        expect(res.status).toHaveBeenCalledWith(200);
                        expect(res.json).toHaveBeenCalledWith([mock_data_1.reviewData]);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should create a book review", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res = mocking_funtions_1.mockResponse();
                        return [4 /*yield*/, booksController.createBookReview({ params: { book_id: "123" } }, res, mocking_funtions_1.mockNext)];
                    case 1:
                        _a.sent();
                        expect(res.status).toHaveBeenCalledWith(200);
                        expect(res.json).toHaveBeenCalledWith({
                            statusCode: 200,
                            message: "Successfully created the book review",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should get book review details", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res = mocking_funtions_1.mockResponse();
                        return [4 /*yield*/, booksController.getBookReview({ params: { book_id: "123", review_id: "1" } }, res, mocking_funtions_1.mockNext)];
                    case 1:
                        _a.sent();
                        expect(res.status).toHaveBeenCalledWith(200);
                        expect(res.json).toHaveBeenCalledWith(mock_data_1.reviewData);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should update book details", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res = mocking_funtions_1.mockResponse();
                        return [4 /*yield*/, booksController.updateBookReview({ params: { book_id: "123", review_id: "1" } }, res, mocking_funtions_1.mockNext)];
                    case 1:
                        _a.sent();
                        expect(res.status).toHaveBeenCalledWith(200);
                        expect(res.json).toHaveBeenCalledWith({
                            statusCode: 200,
                            message: "Successfully updated the book review",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should delete a book review", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res = mocking_funtions_1.mockResponse();
                        return [4 /*yield*/, booksController.deleteBookReview({ params: { book_id: "123", review_id: "1" } }, res, mocking_funtions_1.mockNext)];
                    case 1:
                        _a.sent();
                        expect(res.status).toHaveBeenCalledWith(200);
                        expect(res.json).toHaveBeenCalledWith({
                            statusCode: 200,
                            message: "Successfully deleted the book review",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
describe("BooksController Failures", function () {
    var booksController;
    beforeEach(function () {
        booksController = new books_controller_1.BooksController();
        booksController.booksService = availableFailureMethodsInBookSrvc;
    });
    it("Should create", function () {
        expect(booksController).toBeTruthy();
    });
    it("Should get the books", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res = mocking_funtions_1.mockResponse();
                    return [4 /*yield*/, booksController.getBooks({}, res, mocking_funtions_1.mockNext)];
                case 1:
                    _a.sent();
                    expect(mocking_funtions_1.mockNext).toHaveBeenCalledWith("Failed to get the books");
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should create the books", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res = mocking_funtions_1.mockResponse();
                    return [4 /*yield*/, booksController.createBook({}, res, mocking_funtions_1.mockNext)];
                case 1:
                    _a.sent();
                    expect(mocking_funtions_1.mockNext).toHaveBeenCalledWith("Failed to create the books");
                    return [2 /*return*/];
            }
        });
    }); });
});
