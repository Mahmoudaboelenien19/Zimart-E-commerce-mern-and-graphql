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
exports.stripeResolver = void 0;
const config_js_1 = require("../../config.js");
const getAmount_js_1 = require("../../middlewares/getAmount.js");
const stripeData = require("stripe")(config_js_1.Stripe_key);
exports.stripeResolver = {
    Query: {
        getPublickKey() {
            return __awaiter(this, void 0, void 0, function* () {
                return { key: config_js_1.Stripe_Public };
            });
        },
    },
    Mutation: {
        getKey(_, { input }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const paymentIntent = yield stripeData.paymentIntents.create({
                        amount: (0, getAmount_js_1.getAmount)(input),
                        automatic_payment_methods: { enabled: true },
                        currency: "usd",
                    });
                    return { clientSecret: paymentIntent.client_secret };
                }
                catch (err) {
                    console.log(err);
                }
            });
        },
    },
};
