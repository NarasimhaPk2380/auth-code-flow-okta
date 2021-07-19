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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var books_service_1 = require("./books.service");
var mock_data_1 = require("../helpers/tests/mock-data");
var books_model_1 = __importDefault(require("../models/books.model"));
var review_model_1 = __importDefault(require("../models/review.model"));
describe("BooksService Success cases", function () {
    var booksService;
    beforeEach(function () {
        booksService = new books_service_1.BooksService();
    });
    it("Should create", function () {
        expect(booksService).toBeTruthy();
    });
    describe("Books CRUD Operations", function () {
        it("Should retreieve all books", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        books_model_1.default.find = jest.fn().mockImplementationOnce(function () { return ({
                            populate: jest.fn().mockResolvedValueOnce([mock_data_1.bookData]),
                        }); });
                        return [4 /*yield*/, booksService.getBooks()];
                    case 1:
                        response = _a.sent();
                        expect(response).toEqual([mock_data_1.bookData]);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should create a book", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        books_model_1.default.prototype.save = jest
                            .fn()
                            .mockResolvedValueOnce(__assign(__assign({}, mock_data_1.bookData), { _id: "123" }));
                        return [4 /*yield*/, booksService.createBook(mock_data_1.bookData)];
                    case 1:
                        response = _a.sent();
                        expect(response._id).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should get a book details", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        books_model_1.default.findById = jest.fn().mockResolvedValueOnce(__assign({}, mock_data_1.bookData));
                        return [4 /*yield*/, booksService.getBookDetails("123")];
                    case 1:
                        response = _a.sent();
                        expect(response).toEqual(mock_data_1.bookData);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should update a book", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        books_model_1.default.findByIdAndUpdate = jest
                            .fn()
                            .mockResolvedValueOnce(__assign(__assign({}, mock_data_1.bookData), { name: "durga" }));
                        return [4 /*yield*/, booksService.updateBook("123", mock_data_1.bookData)];
                    case 1:
                        response = _a.sent();
                        expect(response.name).toBe("durga");
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should delete a book", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        books_model_1.default.findByIdAndDelete = jest.fn().mockResolvedValueOnce(__assign({}, mock_data_1.bookData));
                        return [4 /*yield*/, booksService.deleteBook("123")];
                    case 1:
                        response = _a.sent();
                        expect(response).toEqual(mock_data_1.bookData);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Revies CRUD Operations", function () {
        it("Should retreieve all reviews", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        books_model_1.default.findById = jest.fn().mockImplementationOnce(function () { return ({
                            populate: jest.fn().mockResolvedValueOnce([mock_data_1.reviewData]),
                        }); });
                        return [4 /*yield*/, booksService.getBookReviews("123")];
                    case 1:
                        response = _a.sent();
                        expect(response).toEqual([mock_data_1.reviewData]);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should create a review", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, e_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        books_model_1.default.findById = jest.fn().mockResolvedValueOnce(__assign(__assign({}, mock_data_1.bookData), { save: jest.fn().mockResolvedValueOnce(__assign({}, mock_data_1.bookData)) }));
                        review_model_1.default.prototype.save = jest
                            .fn()
                            .mockResolvedValueOnce(__assign(__assign({}, mock_data_1.reviewData), { _id: "123" }));
                        return [4 /*yield*/, booksService.createBookReview("123", mock_data_1.reviewData)];
                    case 1:
                        response = _b.sent();
                        expect((_a = response === null || response === void 0 ? void 0 : response.reviews) === null || _a === void 0 ? void 0 : _a.length).toBe(1);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        console.log(e_1.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it("Should get a book review", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        review_model_1.default.findById = jest.fn().mockResolvedValueOnce(mock_data_1.reviewData);
                        return [4 /*yield*/, booksService.getBookReview("1")];
                    case 1:
                        response = _a.sent();
                        expect(response).toEqual(mock_data_1.reviewData);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should update a book review", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        review_model_1.default.findByIdAndUpdate = jest
                            .fn()
                            .mockResolvedValueOnce(__assign(__assign({}, mock_data_1.reviewData), { reviewer: "durga" }));
                        return [4 /*yield*/, booksService.updateBookReview("123", "231", mock_data_1.reviewData)];
                    case 1:
                        response = _a.sent();
                        expect(response.reviewer).toBe("durga");
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should delete a book review", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        review_model_1.default.findByIdAndDelete = jest
                            .fn()
                            .mockResolvedValueOnce(__assign({}, mock_data_1.reviewData));
                        return [4 /*yield*/, booksService.deleteBookReview("123", "231")];
                    case 1:
                        response = _a.sent();
                        expect(response).toEqual(mock_data_1.reviewData);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
describe("BooksService Failure cases", function () {
    var booksService;
    beforeEach(function () {
        booksService = new books_service_1.BooksService();
    });
    it("Should create", function () {
        expect(booksService).toBeTruthy();
    });
    describe("Books CRUD Operations", function () {
        it("Should fail to retreieve all books", function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        books_model_1.default.find = jest.fn().mockImplementationOnce(function () {
                            throw new Error("Failed to retrieve all books");
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, booksService.getBooks()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        expect(e_2.message).toBe("Failed to retrieve all books");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("Should fail to create a book", function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        books_model_1.default.prototype.save = jest.fn().mockImplementationOnce(function () {
                            throw new Error("Failed to create a book");
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, booksService.createBook(mock_data_1.bookData)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        expect(e_3.message).toBe("Failed to create a book");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("Should fail to get a book details", function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        books_model_1.default.findById = jest.fn().mockImplementationOnce(function () {
                            throw new Error("Failed to retrieve book details");
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, booksService.getBookDetails("123")];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        expect(e_4.message).toBe("Failed to retrieve book details");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("Should fail to update a book", function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        books_model_1.default.findByIdAndUpdate = jest.fn().mockImplementationOnce(function () {
                            throw new Error("Failed to update a book");
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, booksService.updateBook("123", mock_data_1.bookData)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        expect(e_5.message).toBe("Failed to update a book");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("Should fail to delete a book", function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        books_model_1.default.findByIdAndDelete = jest.fn().mockImplementationOnce(function () {
                            throw new Error("Failed to delete a book");
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, booksService.deleteBook("123")];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        expect(e_6.message).toEqual("Failed to delete a book");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Revies CRUD Operations", function () {
        it("Should fail to retreieve all reviews", function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        books_model_1.default.findById = jest.fn().mockImplementationOnce(function () { return ({
                            populate: jest.fn().mockImplementationOnce(function () {
                                throw new Error("Failed to retrieve all reviews");
                            }),
                        }); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, booksService.getBookReviews("123")];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_7 = _a.sent();
                        expect(e_7.message).toEqual("Failed to retrieve all reviews");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("Should fail to create a review", function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        books_model_1.default.findById = jest.fn().mockRejectedValueOnce(__assign(__assign({}, mock_data_1.bookData), { save: jest.fn().mockImplementationOnce(function () {
                                throw new Error("Failed to create a book review");
                            }) }));
                        return [4 /*yield*/, booksService.createBookReview("123", mock_data_1.reviewData)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_8 = _a.sent();
                        expect(e_8.message).toBeDefined();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it("Should fail to get a book review", function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        review_model_1.default.findById = jest.fn().mockImplementationOnce(function () {
                            throw new Error("Failed to get a book review");
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, booksService.getBookReview("1")];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_9 = _a.sent();
                        expect(e_9.message).toEqual("Failed to get a book review");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("Should fail to update a book review", function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        review_model_1.default.findByIdAndUpdate = jest.fn().mockImplementationOnce(function () {
                            throw new Error("Failed to update a book review");
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, booksService.updateBookReview("123", "231", mock_data_1.reviewData)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_10 = _a.sent();
                        expect(e_10.message).toBe("Failed to update a book review");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("Should fail to delete a book review", function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        review_model_1.default.findByIdAndDelete = jest.fn().mockImplementationOnce(function () {
                            throw new Error("Failed to delete a book review");
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, booksService.deleteBookReview("123", "231")];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_11 = _a.sent();
                        expect(e_11.message).toEqual("Failed to delete a book review");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
});
