"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCollection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    userId: mongoose_1.default.Types.ObjectId,
    state: { type: String, default: "pending" },
    productId: [
        {
            id: mongoose_1.default.Types.ObjectId,
            count: Number,
            image: String,
            price: Number,
            title: String,
        },
    ],
    count: Number,
    cost: Number,
    createdAt: { type: Date, default: () => Date.now() },
    deliveredAt: Date,
});
exports.OrderCollection = mongoose_1.default.model("orders", orderSchema);
