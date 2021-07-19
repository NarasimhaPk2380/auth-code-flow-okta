"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var config_1 = __importDefault(require("../config"));
var continuation_local_storage_1 = __importDefault(require("continuation-local-storage"));
var getNamespace = continuation_local_storage_1.default.getNamespace;
var transports = [];
if (process.env.NODE_ENV === "development") {
    transports.push(new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.cli(), winston_1.default.format.splat()),
    }));
}
else {
    transports.push(new winston_1.default.transports.Console());
}
// Wrap Winston logger to print reqId in each log
var formatMessage = winston_1.default.format(function (info, opts) {
    var myRequest = getNamespace("my request");
    info.message =
        myRequest && myRequest.get("transactionId")
            ? info.message + " transactionId: " + myRequest.get("transactionId")
            : info.message;
    return info;
});
var LoggerInstance = winston_1.default.createLogger({
    level: config_1.default.logs.level,
    levels: winston_1.default.config.npm.levels,
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat(), winston_1.default.format.json(), formatMessage()),
    transports: transports,
});
exports.default = LoggerInstance;
