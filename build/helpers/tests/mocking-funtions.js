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
Object.defineProperty(exports, "__esModule", { value: true });
exports.oktaAuthClient = exports.oktaClient = exports.mockNext = exports.mockResponse = exports.createMocks = exports.createJestRejectedSpy = exports.createJestSpy = void 0;
var okta_sdk_nodejs_1 = require("@okta/okta-sdk-nodejs");
var okta_auth_js_1 = require("@okta/okta-auth-js");
var createJestSpy = function (instance, method, value) {
    jest
        .spyOn(instance, method)
        .mockImplementationOnce(function () { return Promise.resolve(value); });
};
exports.createJestSpy = createJestSpy;
var createJestRejectedSpy = function (instance, method, value) {
    jest.spyOn(instance, method).mockImplementationOnce(function () {
        throw new Error("Failed");
    });
};
exports.createJestRejectedSpy = createJestRejectedSpy;
var createMocks = function (instance, methodsJson, failureCase) {
    for (var key in methodsJson) {
        if (!failureCase && key) {
            exports.createJestSpy(instance, key, methodsJson[key]);
        }
        else {
            exports.createJestRejectedSpy(instance, key, methodsJson[key]);
        }
    }
};
exports.createMocks = createMocks;
var mockResponse = function () {
    var res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};
exports.mockResponse = mockResponse;
exports.mockNext = jest.fn();
exports.oktaClient = new okta_sdk_nodejs_1.Client({
    orgUrl: "asda",
    token: "asdad",
});
exports.oktaClient.createUser = function (data) {
    return Promise.resolve(__assign(__assign({}, data), { id: "123" }));
};
exports.oktaClient.getSession = function (data) {
    return Promise.resolve(__assign(__assign({}, data), { login: "hello@gmail.com", id: "123" }));
};
exports.oktaClient.createSession = function (data) {
    return Promise.resolve(__assign({ login: "hello@gmail.com", id: "123", userId: "1234" }, data));
};
exports.oktaAuthClient = new okta_auth_js_1.OktaAuth({
    issuer: "https://yourOktaDomain.com/oauth2/default",
    tokenManager: {
        storage: {
            getItem: function (key) { },
            setItem: function (key, val) { },
        },
    },
});
exports.oktaAuthClient.signIn = function (data) {
    return Promise.resolve(__assign({ sessionToken: "123" }, data));
};
