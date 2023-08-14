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
exports.orderResolver = void 0;
const getAmount_1 = require("../../middlewares/getAmount");
const order_1 = require("../../mongoose/schema/order");
const user_1 = require("../../mongoose/schema/user");
exports.orderResolver = {
    Query: {
        order(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield order_1.OrderCollection.findById(args.id);
            });
        },
        orders() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield order_1.OrderCollection.find({});
            });
        },
    },
    Mutation: {
        updateOrder(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(args);
                const res = yield order_1.OrderCollection.findByIdAndUpdate(args.input._id, {
                    state: args.input.state,
                    deliveredAt: args.input.deliveredAt,
                });
                return { msg: `order is at  ${args.input.state} mode` };
            });
        },
        deleteOrder(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const length = args._id.length;
                yield order_1.OrderCollection.deleteMany({ _id: { $in: args._id } });
                return {
                    msg: `${length} ${length >= 2 ? "orders" : "order"} ${length >= 2 ? "are" : "is"} successfully deleted`,
                };
            });
        },
        createOrder(_, { input }) {
            return __awaiter(this, void 0, void 0, function* () {
                const date = () => new Date();
                try {
                    //order
                    const order = yield order_1.OrderCollection.create({
                        createdAt: date(),
                        cost: (0, getAmount_1.getAmount)(input.products) / 100,
                        userId: input.userId,
                        productId: input.products.map((e) => ({
                            id: e._id,
                            count: e.count,
                            title: e.title,
                            price: e.price,
                            image: e.path,
                        })),
                        state: "pending",
                        count: input.length,
                    });
                    const notificationObj = {
                        isRead: false,
                        content: `${input.email} created a new order`,
                        createdAt: new Date().toISOString(),
                    };
                    yield user_1.userCollection.updateMany({ role: { $in: ["admin", "moderator", "owner", "user"] } }, {
                        $push: {
                            notifications: notificationObj,
                        },
                        $inc: {
                            notificationsCount: +1,
                        },
                    });
                    console.log({ orderId: order._id });
                    return { status: 200, orderId: order._id };
                }
                catch (err) {
                    console.log(err);
                }
            });
        },
    },
};
