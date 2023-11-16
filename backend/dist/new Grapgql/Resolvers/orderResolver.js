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
exports.orderResolver = void 0;
const getAmount_1 = require("../../middlewares/getAmount");
const order_1 = require("../../mongoose/schema/order");
const user_1 = require("../../mongoose/schema/user");
const context_1 = require("../context");
const reduceProductsByOrderCount_js_1 = require("../../lib/reduceProductsByOrderCount.js");
const product_1 = __importDefault(require("../../mongoose/schema/product"));
const AddNotification_1 = require("../../lib/AddNotification");
exports.orderResolver = {
    Query: {
        order(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield order_1.OrderCollection.findById(args.id);
            });
        },
        orders(_, { limit, skip = 0 }) {
            return __awaiter(this, void 0, void 0, function* () {
                const data = yield order_1.OrderCollection.aggregate([
                    {
                        $sort: {
                            createdAt: -1,
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            count: { $sum: 1 },
                            orders: { $push: "$$ROOT" },
                        },
                    },
                    {
                        $project: {
                            orders: { $slice: ["$orders", skip, limit] },
                            count: 1,
                            _id: 0,
                        },
                    },
                ]);
                console.log(data);
                const { orders, count } = data[0];
                return { totalOrders: count, orders };
            });
        },
    },
    OrderProduct: {
        product(par) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield product_1.default.findById(par.id);
            });
        },
    },
    Order: {
        user(par) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield user_1.userCollection.findById(par.userId);
            });
        },
    },
    Subscription: {
        OrderCreated: {
            subscribe() {
                return __awaiter(this, void 0, void 0, function* () {
                    return context_1.pubsub.asyncIterator("Order_Created");
                });
            },
        },
        NotificationAdded: {
            subscribe() {
                return __awaiter(this, void 0, void 0, function* () {
                    return context_1.pubsub.asyncIterator("Notification_Created");
                });
            },
        },
    },
    Mutation: {
        updateOrder(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                yield order_1.OrderCollection.findByIdAndUpdate(args.input._id, {
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
                try {
                    const { products, userId, name } = input;
                    const order = yield order_1.OrderCollection.create({
                        cost: (0, getAmount_1.getAmount)(products) / 100,
                        userId,
                        productId: products.map((e) => ({
                            id: e._id,
                            count: e.count,
                            title: e.title,
                            price: e.price,
                            image: e.path,
                        })),
                        count: products.length,
                    });
                    context_1.pubsub.publish("Order_Created", {
                        OrderCreated: order,
                    });
                    (0, reduceProductsByOrderCount_js_1.reduceProductsByOrderCount)(products);
                    const notificationObj = {
                        content: `${name} created a new order`,
                        link: `/dashboard/orders/${order._id}`,
                    };
                    (0, AddNotification_1.AddNotification)(notificationObj);
                    return { status: 200, orderId: order._id };
                }
                catch (err) {
                    console.log(err);
                }
            });
        },
    },
};
