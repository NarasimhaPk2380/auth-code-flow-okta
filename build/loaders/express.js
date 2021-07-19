"use strict";
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
exports.oidc = void 0;
var express_1 = __importDefault(require("express"));
var request_promise_1 = __importDefault(require("request-promise"));
var express_session_1 = __importDefault(require("express-session"));
var oidc_middleware_1 = require("@okta/oidc-middleware");
var cors_1 = __importDefault(require("cors"));
var api_1 = __importDefault(require("../api"));
var config_1 = __importDefault(require("../config"));
var http_errors_1 = require("http-errors");
var node_uuid_1 = __importDefault(require("node-uuid"));
var continuation_local_storage_1 = __importDefault(require("continuation-local-storage"));
var myRequest = continuation_local_storage_1.default.createNamespace("my request");
exports.oidc = new oidc_middleware_1.ExpressOIDC(Object.assign({
    issuer: config_1.default.oktaConfig.issuer,
    client_id: config_1.default.oktaConfig.clientId,
    client_secret: config_1.default.oktaConfig.clientSecret,
    appBaseUrl: config_1.default.oktaConfig.baseUrl,
    scope: "openid profile email offline_access",
}));
exports.default = (function (_a) {
    var app = _a.app;
    app.use(express_session_1.default({
        secret: "somethingisfishy",
        resave: true,
        saveUninitialized: false,
    }));
    app.use(exports.oidc.router);
    app.use(cors_1.default());
    app.set("view engine", "ejs");
    app.use(express_1.default.json({}));
    app.use(function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userContext, tokens, token;
            return __generator(this, function (_a) {
                userContext = req["userContext"];
                if (!userContext) {
                    next();
                    return [2 /*return*/];
                }
                tokens = userContext["tokens"];
                if (!tokens) {
                    next();
                    return [2 /*return*/];
                }
                if (req["userContext"]["tokens"]["expires_at"] > Date.now() / 1000) {
                    next();
                    return [2 /*return*/];
                }
                token = btoa(config_1.default.oktaConfig.clientId + ":" + config_1.default.oktaConfig.clientSecret);
                return [2 /*return*/, request_promise_1.default({
                        uri: config_1.default.oktaConfig.issuer + "/v1/token",
                        json: true,
                        method: "POST",
                        headers: {
                            authorization: "Basic " + token,
                        },
                        form: {
                            redirect_uri: "http://localhost:8888",
                            scope: "offline_access openid",
                            refresh_token: tokens["refresh_token"],
                            grant_type: "refresh_token",
                        },
                    })
                        .then(function (data) {
                        var newTokens = data;
                        req["userContext"]["tokens"]["access_token"] =
                            newTokens["access_token"];
                        req["userContext"]["tokens"]["refresh_token"] =
                            newTokens["refresh_token"];
                        req["userContext"]["tokens"]["id_token"] = newTokens["id_token"];
                        req["userContext"]["tokens"]["scope"] = newTokens["scope"];
                        req["userContext"]["tokens"]["expires_at"] =
                            Math.floor(Date.now() / 1000) + newTokens["expires_in"];
                        next();
                    })
                        .catch(function (e) {
                        console.error("Exception while attempting to get refresh access token: " + e.message + " ");
                        next();
                    })];
            });
        });
    });
    // Assigning UUID for each request
    app.use(function (req, res, next) {
        myRequest.run(function () {
            myRequest.set("transactionId", node_uuid_1.default.v1());
            next();
        });
    });
    app.get("/", function (req, res) {
        var _a, _b;
        if (req.userContext) {
            res.render("login", {
                accessToken: (_b = (_a = req === null || req === void 0 ? void 0 : req.userContext) === null || _a === void 0 ? void 0 : _a.tokens) === null || _b === void 0 ? void 0 : _b.access_token,
            });
        }
        else {
            res.send('Please <a href="/login">login</a>');
        }
    });
    // Load API routes
    app.use(config_1.default.api.prefix, api_1.default());
    app.use(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            next(new http_errors_1.NotFound());
            return [2 /*return*/];
        });
    }); });
    app.use((function (err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            statusCode: err.status || 500,
            message: err.message,
        });
    }));
});
