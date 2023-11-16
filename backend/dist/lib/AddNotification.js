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
exports.AddNotification = void 0;
const user_1 = require("../mongoose/schema/user");
const context_1 = require("../new Grapgql/context");
const AddNotification = (notificationObj) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.userCollection.updateMany({ role: { $in: ["admin", "moderator", "owner", "user"] } }, {
        $push: {
            notifications: notificationObj,
        },
        $inc: {
            notificationsCount: +1,
        },
    });
    context_1.pubsub.publish("Notification_Created", {});
});
exports.AddNotification = AddNotification;
