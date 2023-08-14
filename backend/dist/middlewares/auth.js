"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestfullAuth = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("../config.js");
const auth = (accessToken) => {
    try {
        if (accessToken) {
            const token = accessToken.split(" ")[1];
            const decode = jsonwebtoken_1.default.verify(token, config_js_1.ACCESS_TOKEN_SECRET);
            if (decode) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
};
exports.auth = auth;
const RestfullAuth = (req, res, next) => {
    try {
        const authHearders = req.headers.authorization;
        if (authHearders) {
            const token = authHearders.split(" ")[1];
            const decode = jsonwebtoken_1.default.verify(token, config_js_1.ACCESS_TOKEN_SECRET);
            if (decode) {
                next();
            }
            else {
                res.status(401).send("Invalid token");
            }
        }
        else {
            res.status(401).json("expired token");
        }
    }
    catch (err) {
        res.status(401).json({ msg: "autherization failed" });
    }
};
exports.RestfullAuth = RestfullAuth;
