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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = exports.getNewRefToken = exports.verfiyRefToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const express_1 = require("express");
const verfiyRefToken = (refToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decode = jsonwebtoken_1.default.verify(refToken, config_1.REFRESH_TOKEN_SECRET);
        return decode;
    }
    catch (err) {
        return "wrong ref token";
    }
});
exports.verfiyRefToken = verfiyRefToken;
const getNewRefToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refresh_token } = req.cookies;
    if (!refresh_token) {
        res.json({});
    }
    else {
        let result = (yield (0, exports.verfiyRefToken)(refresh_token));
        if (result === null || result === void 0 ? void 0 : result.email) {
            const accessToken = jsonwebtoken_1.default.sign(result, config_1.ACCESS_TOKEN_SECRET);
            const refreshToken = jsonwebtoken_1.default.sign(result, config_1.REFRESH_TOKEN_SECRET);
            res.cookie("access_token", accessToken);
            res.cookie("refresh_token", refreshToken);
            res.json({ accessToken, id: result === null || result === void 0 ? void 0 : result.id });
            return true;
        }
        else {
            return false;
        }
    }
});
exports.getNewRefToken = getNewRefToken;
exports.AuthRouter = (0, express_1.Router)();
exports.AuthRouter.route("/auth/newRefToken").post(exports.getNewRefToken);
