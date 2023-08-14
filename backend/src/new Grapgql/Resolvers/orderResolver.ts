import { getAmount } from "../../middlewares/getAmount";
import { OrderCollection } from "../../mongoose/schema/order";
import { userCollection } from "../../mongoose/schema/user";
import { IdInterface } from "../interfaces/graqphInterfaces.js";

interface delInterfaceOrder {
  _id: IdInterface[];
}

export const orderResolver = {
  Query: {
    async order(_: any, args: IdInterface) {
      return await OrderCollection.findById(args.id);
    },
    async orders() {
      return await OrderCollection.find({});
    },
  },
  Mutation: {
    async updateOrder(_: any, args: any) {
      console.log(args);
      const res = await OrderCollection.findByIdAndUpdate(args.input._id, {
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

    async createOrder(_: unknown, { input }: any) {
      const date = () => new Date();
      try {
        //order
        const order = await OrderCollection.create({
          createdAt: date(),
          cost: getAmount(input.products) / 100,
          userId: input.userId,
          productId: input.products.map((e: any) => ({
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
        console.log({ orderId: order._id });
        return { status: 200, orderId: order._id };
      } catch (err) {
        console.log(err);
      }
    },
  },
};
