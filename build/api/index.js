"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var books_routes_1 = __importDefault(require("./routes/books.routes"));
var users_routes_1 = __importDefault(require("./routes/users.routes"));
exports.default = (function () {
    var app = express_1.Router();
    books_routes_1.default(app);
    users_routes_1.default(app);
    return app;
});
