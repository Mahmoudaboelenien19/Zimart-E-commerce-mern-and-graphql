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
exports.checkOldPass = exports.authenticateMiddleware = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../mongoose/schema/user");
const config_1 = require("../config");
const authenticateMiddleware = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.userCollection.find({ email });
    if (user.length > 0) {
        const isPasswordCorrect = yield bcrypt_1.default.compare(password + config_1.BCRYPT_SECRET, user[0].password);
        if (isPasswordCorrect) {
            return user;
        }
        else {
            return isPasswordCorrect;
        }
    }
    else {
        return "this email isn't registered";
    }
});
exports.authenticateMiddleware = authenticateMiddleware;
const checkOldPass = (_id, password) => __awaiter(void 0, void 0, void 0, function* () {
    const check = yield user_1.userCollection.find({ _id });
    if (check.length > 0) {
        const isPasswordCorrect = yield bcrypt_1.default.compare(password + config_1.BCRYPT_SECRET, check[0].password);
        if (isPasswordCorrect) {
            return "your password is correct";
        }
        else {
            return isPasswordCorrect;
        }
    }
    else {
        return "this email isn't registered";
    }
});
exports.checkOldPass = checkOldPass;
