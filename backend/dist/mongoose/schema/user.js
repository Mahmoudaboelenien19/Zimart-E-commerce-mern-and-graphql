"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCollection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const collectionSchema = new mongoose_1.default.Schema({
    id: { type: mongoose_1.default.SchemaTypes.ObjectId, ref: "products" },
    count: {
        type: Number,
        default: 1,
    },
});
const userSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    password: String,
    country: String,
    phone: String,
    role: { type: String, default: "user" },
    image: String,
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
    lastLogIn: Date,
    notificationsCount: Number,
    fav: [collectionSchema],
    cart: [collectionSchema],
    compare: [collectionSchema],
    notifications: [
        {
            isRead: { type: Boolean, default: false },
            content: String,
            link: { type: String },
            createdAt: { type: Date, default: () => Date.now() },
            // immutable: true,
            // required: true,
        },
    ],
});
exports.userCollection = mongoose_1.default.models.users || mongoose_1.default.model("users", userSchema);
