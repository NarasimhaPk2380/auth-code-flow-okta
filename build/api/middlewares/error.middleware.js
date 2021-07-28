"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerInstance = exports.ErrorHandlerMiddleware = void 0;
var logger_1 = __importDefault(require("../../loaders/logger"));
var ErrorHandlerMiddleware = /** @class */ (function () {
    function ErrorHandlerMiddleware() {
        this.isProduction = process.env.NODE_ENV || "development"; // default as development;
    }
    ErrorHandlerMiddleware.prototype.error = function (error, req, res, next) {
        res.status(error.statusCode || 500);
        res.json({
            name: error.name,
            message: error.message,
            errors: error["errors"] || [],
        });
        if (this.isProduction) {
            logger_1.default.error(error.name, error.message);
        }
        else {
            logger_1.default.error(error.name, error.stack);
        }
    };
    return ErrorHandlerMiddleware;
}());
exports.ErrorHandlerMiddleware = ErrorHandlerMiddleware;
exports.ErrorHandlerInstance = new ErrorHandlerMiddleware();
