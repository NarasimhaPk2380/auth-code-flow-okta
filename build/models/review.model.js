"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ReviewSchema = new mongoose_1.default.Schema({
    reviewer: {
        type: String,
        required: [true, "Reviewer is required"],
    },
    message: {
        type: String,
        required: [true, "Message is required"],
    },
});
exports.default = mongoose_1.default.model("Review", ReviewSchema);
