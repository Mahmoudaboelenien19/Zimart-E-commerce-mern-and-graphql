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
exports.reduceProductsByOrderCount = void 0;
const reduceProductsByOrderCount = (products) => __awaiter(void 0, void 0, void 0, function* () {
    yield products.forEach((e) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield productCollection.findByIdAndUpdate(e.parentId, {
            $inc: {
                stock: -e.count,
            },
        }, { new: true });
        pubsub.publish("Product_Updated", {
            productUpdated: product,
        });
        pubsub.publish("Single_Product_Updated", {
            singleProductUpdate: product,
        });
        if ((product === null || product === void 0 ? void 0 : product._id) && (product === null || product === void 0 ? void 0 : product.stock) <= 5) {
            const notificationObj = {
                content: `${product === null || product === void 0 ? void 0 : product.title.split(" ").slice(0, 5).join(" ")} is running out`,
                link: `/${product === null || product === void 0 ? void 0 : product._id}`,
            };
            yield userCollection.updateMany({ role: { $in: ["admin", "moderator", "owner", "user"] } }, {
                $push: {
                    notifications: notificationObj,
                },
                $inc: {
                    notificationsCount: +1,
                },
            });
            const newNotification = yield userCollection.findOne({ role: { $in: ["admin", "moderator", "owner", "user"] } }, {
                notifications: { $slice: [-1, 1] },
            });
            pubsub.publish("Notification_Created", {
                NotificationAdded: newNotification === null || newNotification === void 0 ? void 0 : newNotification.notifications[0],
            });
        }
    }));
});
exports.reduceProductsByOrderCount = reduceProductsByOrderCount;
