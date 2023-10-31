import { SkipAndLimit } from "./../interfaces/graqphInterfaces";
import { getAmount } from "../../middlewares/getAmount";
import { OrderCollection } from "../../mongoose/schema/order";
import { userCollection } from "../../mongoose/schema/user";
import { IdInterface } from "../interfaces/graqphInterfaces.js";
import { pubsub } from "../context";
import productCollection from "../../mongoose/schema/product";

interface delInterfaceOrder {
  _id: IdInterface[];
}

export const orderResolver = {
  Query: {
    async order(_: any, args: IdInterface) {
      return await OrderCollection.findById(args.id);
    },
    async orders(_: unknown, { limit, skip = 0 }: SkipAndLimit) {
      const totalOrders = await OrderCollection.count();
      const orders = await OrderCollection.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      return { totalOrders, orders };
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

    async createOrder(_: unknown, { input }: any) {
      const date = () => new Date();
      try {
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
        pubsub.publish("Order_Created", {
          OrderCreated: order,
        });

        await input.products.forEach(async (e: any) => {
          const product = await productCollection.findByIdAndUpdate(
            e.parentId,
            {
              $inc: {
                stock: -e.count,
              },
            },
            { new: true }
          );
          pubsub.publish("Product_Updated", {
            productUpdated: product,
          });
          pubsub.publish("Single_Product_Updated", {
            singleProductUpdate: product,
          });

          if (product?._id && (product?.stock <= 5 || product?.stock === 0)) {
            const notificationObj = {
              isRead: false,
              content: `${product?.title
                .split(" ")
                .slice(0, 5)
                .join(" ")} is running out`,
              createdAt: new Date().toISOString(),
              link: `/${product?._id}`,
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
            const newNotification = await userCollection.findOne(
              { role: { $in: ["admin", "moderator", "owner", "user"] } },
              {
                notifications: { $slice: [-1, 1] },
              }
            );
            pubsub.publish("Notification_Created", {
              NotificationAdded: newNotification?.notifications[0],
            });
          }
        });

        const notificationObj = {
          isRead: false,
          content: `${input.name} created a new order`,
          createdAt: new Date().toISOString(),
          link: `/dashboard/orders/${order._id}`,
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

        const newNotification = await userCollection.findOne(
          { role: { $in: ["admin", "moderator", "owner", "user"] } },
          {
            notifications: { $slice: [-1, 1] },
          }
        );
        pubsub.publish("Notification_Created", {
          NotificationAdded: newNotification?.notifications[0],
        });

        return { status: 200, orderId: order._id };
      } catch (err) {
        console.log(err);
      }
    },
  },
};
