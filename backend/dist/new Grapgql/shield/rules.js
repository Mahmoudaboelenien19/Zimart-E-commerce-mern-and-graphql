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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isUser = void 0;
const graphql_shield_1 = require("graphql-shield");
const auth_1 = require("../../middlewares/auth");
const user_1 = require("../../mongoose/schema/user");
exports.isUser = (0, graphql_shield_1.rule)()((par, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const accessToken = (_b = (_a = ctx.req) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization;
    const decode = (0, auth_1.auth)(accessToken);
    if (decode === null || decode === void 0 ? void 0 : decode.email) {
        return true;
    }
    else {
        return false;
    }
}));
exports.isAdmin = (0, graphql_shield_1.rule)()((_, __, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const accessToken = (_d = (_c = ctx.req) === null || _c === void 0 ? void 0 : _c.headers) === null || _d === void 0 ? void 0 : _d.authorization;
    const decode = (0, auth_1.auth)(accessToken);
    if (decode === null || decode === void 0 ? void 0 : decode.email) {
        const user = (yield user_1.userCollection.findOne({ email: decode.email }));
        const isAdminCheck = (user === null || user === void 0 ? void 0 : user.role) === "admin" ||
            user.role === "owner" ||
            user.role === "moderator";
        if (isAdminCheck) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}));
