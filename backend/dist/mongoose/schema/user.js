"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCollection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    password: String,
    country: String,
    phone: String,
    role: String,
    image: String,
    createdAt: Date,
    lastLogIn: Date,
    notificationsCount: Number,
    fav: [
        {
            productId: mongoose_1.default.SchemaTypes.ObjectId,
            parentId: mongoose_1.default.SchemaTypes.ObjectId,
            title: String,
            path: String,
            price: Number,
        },
    ],
    cart: [
        {
            productId: mongoose_1.default.SchemaTypes.ObjectId,
            parentId: mongoose_1.default.SchemaTypes.ObjectId,
            count: Number,
            title: String,
            path: String,
            price: Number,
        },
    ],
    compare: [
        {
            productId: mongoose_1.default.SchemaTypes.ObjectId,
            title: String,
        },
    ],
    notifications: [
        {
            isRead: Boolean,
            content: String,
            link: String,
            createdAt: Date,
        },
    ],
});
exports.userCollection = mongoose_1.default.model("users", userSchema);
