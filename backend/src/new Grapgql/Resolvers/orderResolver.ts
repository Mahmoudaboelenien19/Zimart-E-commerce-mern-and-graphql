import { SkipAndLimit } from "./../interfaces/graqphInterfaces";
import { getAmount } from "../../middlewares/getAmount";
import { OrderCollection } from "../../mongoose/schema/order";
import { userCollection } from "../../mongoose/schema/user";
import { type IdInterface } from "../interfaces/graqphInterfaces.js";
import { pubsub } from "../context";
import { reduceProductsByOrderCount } from "../../lib/reduceProductsByOrderCount.js";
import productCollection from "../../mongoose/schema/product";
import { AddNotification } from "../../lib/AddNotification";

interface delInterfaceOrder {
  _id: IdInterface[];
}
type CreateOrder = {
  input: { userId: string; products: Order[]; name: string };
};
export const orderResolver = {
  Query: {
    async order(_: any, args: IdInterface) {
      return await OrderCollection.findById(args.id);
    },
    async orders(_: unknown, { limit, skip = 0 }: SkipAndLimit) {
      const data = await OrderCollection.aggregate([
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
    },
  },
  OrderProduct: {
    async product(par: any) {
      return await productCollection.findById(par.id);
    },
  },
  Order: {
    async user(par: any) {
      return await userCollection.findById(par.userId);
    },
  },
  Subscription: {
    OrderCreated: {
      async subscribe() {
        return pubsub.asyncIterator("Order_Created");
      },
    },
    NotificationAdded: {
      async subscribe() {
        return pubsub.asyncIterator("Notification_Created");
      },
    },
  },
  Mutation: {
    async updateOrder(_: any, args: any) {
      await OrderCollection.findByIdAndUpdate(args.input._id, {
        state: args.input.state,
        deliveredAt: args.input.deliveredAt,
      });

      return { msg: `order is at  ${args.input.state} mode` };
    },
    async deleteOrder(_: any, args: delInterfaceOrder) {
      const length = args._id.length;
      await OrderCollection.deleteMany({ _id: { $in: args._id } });

      return {
        msg: `${length} ${length >= 2 ? "orders" : "order"} ${
          length >= 2 ? "are" : "is"
        } successfully deleted`,
      };
    },

    async createOrder(_: unknown, { input }: CreateOrder) {
      try {
        const { products, userId, name } = input;
        const order = await OrderCollection.create({
          cost: getAmount(products) / 100,
          userId,
          productId: products.map((e: any) => ({
            id: e._id,
            count: e.count,
            title: e.title,
            price: e.price,
            image: e.path,
          })),
          count: products.length,
        });
        pubsub.publish("Order_Created", {
          OrderCreated: order,
        });

        reduceProductsByOrderCount(products);
        const notificationObj = {
          content: `${name} created a new order`,
          link: `/dashboard/orders/${order._id}`,
        };
        AddNotification(notificationObj);

        return { status: 200, orderId: order._id };
      } catch (err) {
        console.log(err);
      }
    },
  },
};
