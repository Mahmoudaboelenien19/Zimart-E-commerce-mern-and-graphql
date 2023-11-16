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
exports.reduceProductsByOrderCount = void 0;
const product_1 = __importDefault(require("../mongoose/schema/product"));
const context_1 = require("../new Grapgql/context");
const AddNotification_1 = require("./AddNotification");
const reduceProductsByOrderCount = (products) => __awaiter(void 0, void 0, void 0, function* () {
    products.forEach((e) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield product_1.default.findByIdAndUpdate(e.productId, {
            $inc: {
                stock: -e.count,
            },
        }, { new: true });
        context_1.pubsub.publish("Product_Updated", {
            productUpdated: product,
        });
        context_1.pubsub.publish("Single_Product_Updated", {
            singleProductUpdate: product,
        });
        if ((product === null || product === void 0 ? void 0 : product._id) && (product === null || product === void 0 ? void 0 : product.stock) <= 5) {
            const notificationObj = {
                content: `${product === null || product === void 0 ? void 0 : product.title.split(" ").slice(0, 5).join(" ")} is running out`,
                link: `/${product === null || product === void 0 ? void 0 : product._id}`,
            };
            (0, AddNotification_1.AddNotification)(notificationObj);
        }
    }));
});
exports.reduceProductsByOrderCount = reduceProductsByOrderCount;
