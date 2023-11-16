import { Stripe_Public, Stripe_key } from "../../config.js";
import { Request, Response, Router } from "express";
import { getAmount } from "../../middlewares/getAmount.js";
const stripeData = require("stripe")(Stripe_key);

export const stripeResolver = {
  Query: {
    async getPublickKey() {
      return { key: Stripe_Public };
    },
  },

  Mutation: {
    async getKey(_: unknown, { input }: any) {
      console.log(input);
      try {
        const paymentIntent = await stripeData.paymentIntents.create({
          amount: getAmount(input),
          automatic_payment_methods: { enabled: true },
          currency: "usd",
        });
        return { clientSecret: paymentIntent.client_secret };
      } catch (err) {
        console.log(err);
      }
    },
  },
};
