"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.regiserUserSchema = exports.reviewSchema = exports.bookSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.bookSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    author: joi_1.default.array().items(joi_1.default.string()).required(),
    price: joi_1.default.string().required(),
    reviews: joi_1.default.array().optional(),
    publisher: joi_1.default
        .object({
        publisher_id: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        location: joi_1.default.string().required(),
    })
        .required(),
});
exports.reviewSchema = joi_1.default.object({
    reviewer: joi_1.default.string().required(),
    message: joi_1.default.string().required(),
});
exports.regiserUserSchema = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.loginUserSchema = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required(),
});
