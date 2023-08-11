import { Client_Url, Stripe_Public, Stripe_key } from "../config.js";
import { Request, Response, Router } from "express";
import { OrderCollection } from "../mongoose/schema/order.js";
import { RestfullAuth } from "../middlewares/auth.js";
import { userCollection } from "../mongoose/schema/user.js";

const stripeData = require("stripe")(Stripe_key);

let orderData: any;
let session: any;
let email: any;
const stripeFn = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userid;
    const { products, email } = req.body;
    orderData = products;
    const lineItems = await Promise.all(
      products.map((item: any) => {
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
      })
    );
    session = await stripeData.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${Client_Url}?success=true`,
      cancel_url: `${Client_Url}?success=false`,
      payment_method_types: ["card"],
      customer_email: email,
    });
    const date = () => new Date();

    res.json(session);
    console.log(session);
    await OrderCollection.create({
      createdAt: date(),
      cost: session.amount_total / 100,
      userId,
      productId: products.map((e: any) => ({
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
    await userCollection.updateMany(
      { role: { $in: ["admin", "moderator", "owner", "user"] } },
      {
        $push: {
          notifications: notificationObj,
        },
        $inc: {
          notificationsCount: +1,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const createOrder = async (req: Request, res: Response) => {
  const date = () => new Date();
  const userId = req.params.userid;

  await OrderCollection.create({
    createdAt: date(),
    cost: session.amount_total / 100,
    userId,
    productId: orderData.map((e: any) => ({
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
  await userCollection.updateMany(
    { role: { $in: ["admin", "moderator", "owner", "user"] } },
    {
      $push: {
        notifications: notificationObj,
      },
      $inc: {
        notificationsCount: +1,
      },
    }
  );
};
const getStripeublicKey = async (_: Request, res: Response) => {
  try {
    res.json(Stripe_Public);
  } catch (err) {
    console.log(err);
  }
};

const stripeRoutes = Router();

stripeRoutes.route("/checkout/:userid").post(RestfullAuth, stripeFn);
stripeRoutes
  .route("/checkout/order/create/:userid")
  .post(RestfullAuth, createOrder);
stripeRoutes.route("/getkey").get(RestfullAuth, getStripeublicKey);

export default stripeRoutes;
