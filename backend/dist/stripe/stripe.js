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
const config_js_1 = require("../config.js");
const express_1 = require("express");
const order_js_1 = require("../mongoose/schema/order.js");
const auth_js_1 = require("../middlewares/auth.js");
const user_js_1 = require("../mongoose/schema/user.js");
const stripeData = require("stripe")(config_js_1.Stripe_key);
let orderData;
let session;
let email;
const stripeFn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userid;
        const { products, email } = req.body;
        orderData = products;
        const lineItems = yield Promise.all(products.map((item) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.title,
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.count,
            };
        }));
        session = yield stripeData.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            success_url: `${config_js_1.Client_Url}?success=true`,
            cancel_url: `${config_js_1.Client_Url}?success=false`,
            payment_method_types: ["card"],
            customer_email: email,
        });
        const date = () => new Date();
        res.json(session);
        console.log(session);
        yield order_js_1.OrderCollection.create({
            createdAt: date(),
            cost: session.amount_total / 100,
            userId,
            productId: products.map((e) => ({
                id: e._id,
                count: e.count,
                title: e.title,
                price: e.price,
                image: e.path,
            })),
            state: "pending",
            count: products.length,
        });
        const notificationObj = {
            isRead: false,
            content: `${email} created a new order`,
            createdAt: new Date().toISOString(),
        };
        yield user_js_1.userCollection.updateMany({ role: { $in: ["admin", "moderator", "owner", "user"] } }, {
            $push: {
                notifications: notificationObj,
            },
            $inc: {
                notificationsCount: +1,
            },
        });
    }
    catch (err) {
        console.log(err);
    }
});
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = () => new Date();
    const userId = req.params.userid;
    yield order_js_1.OrderCollection.create({
        createdAt: date(),
        cost: session.amount_total / 100,
        userId,
        productId: orderData.map((e) => ({
            id: e._id,
            count: e.count,
            title: e.title,
            price: e.price,
            image: e.path,
        })),
        state: "pending",
        count: orderData.length,
    });
    const notificationObj = {
        isRead: false,
        content: `${email} created a new order`,
        createdAt: new Date().toISOString(),
    };
    yield user_js_1.userCollection.updateMany({ role: { $in: ["admin", "moderator", "owner", "user"] } }, {
        $push: {
            notifications: notificationObj,
        },
        $inc: {
            notificationsCount: +1,
        },
    });
});
const getStripeublicKey = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(config_js_1.Stripe_Public);
    }
    catch (err) {
        console.log(err);
    }
});
const stripeRoutes = (0, express_1.Router)();
stripeRoutes.route("/checkout/:userid").post(auth_js_1.RestfullAuth, stripeFn);
stripeRoutes
    .route("/checkout/order/create/:userid")
    .post(auth_js_1.RestfullAuth, createOrder);
stripeRoutes.route("/getkey").get(auth_js_1.RestfullAuth, getStripeublicKey);
exports.default = stripeRoutes;
