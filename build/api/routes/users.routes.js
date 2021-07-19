"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var validation_schema_1 = require("../../helpers/validation_schema");
var controllers_1 = require("../controllers");
var joi_validation_middleware_1 = require("../middlewares/joi-validation.middleware");
var router = express_1.Router();
exports.default = (function (app) {
    app.use("/oktauser", router);
    router.post("/register", joi_validation_middleware_1.joiValidation(validation_schema_1.regiserUserSchema), controllers_1.usersController.registerOktaUser.bind(controllers_1.usersController));
});
