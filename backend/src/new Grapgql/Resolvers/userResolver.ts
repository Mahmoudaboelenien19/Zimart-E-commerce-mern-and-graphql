import { SkipAndLimit } from "./../interfaces/graqphInterfaces";
import GraphQLUpload from "graphql-upload";
import cloudinary from "cloudinary";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../config.js";
import {
  authenticateMiddleware,
  checkOldPass,
} from "../../middlewares/authenticate.js";
import { hashPassword } from "../../middlewares/hashPassword.js";
import { userCollection } from "../../mongoose/schema/user.js";
import { IdInterface } from "../interfaces/graqphInterfaces.js";
import { pubsub } from "../context.js";
import productCollection from "../../mongoose/schema/product.js";

interface addToFavInterface {
  input: {
    productId: string;
    parentId: string;
    title: string;
    path: string;
    price: number;
    userId: string;
  };
}

interface removeFromFavInterface {
  input: {
    userId: string;
    productId: string[];
  };
}

export const userResolver = {
  Query: {
    async users(_: unknown, { limit, skip }: SkipAndLimit) {
      const totalUsers = await userCollection.find().count();
      const users = await userCollection.find().limit(limit).skip(skip);
      return {
        totalUsers,
        users,
      };
    },
  },
  Upload: GraphQLUpload,
  Review: {
    async userData(par: { userId: string }) {
      return (
        (await userCollection.findById(par.userId)) || {
          name: null,
          image: null,
        }
      );
    },
  },
  Cart: {
    async product(par: { parentId: string }) {
      return await productCollection.findById(par.parentId);
    },
  },
  Mutation: {
    addUser: async (_: unknown, { input }: any) => {
      const check = await userCollection.find({ email: input.email });
      if (check.length > 0) {
        return {
          status: 401,
          email: input.email,
          msg: "this email has registered",
        };
      } else {
        const res = await userCollection.create({
          ...input,
          createdAt: new Date().toISOString(),
          image:
            input.image ||
            "https://res.cloudinary.com/domobky11/image/upload/v1682383659/download_d2onbx.png",
          password: hashPassword(input.password),
          role: "user",
        });

        pubsub.publish("User_Added", {
          AddUser: res,
        });
        const notificationObj = {
          isRead: false,
          content: `${input.email} created a new account`,
          createdAt: new Date().toISOString(),
          link: "/dashboard/users",
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

        return { ...res, status: 200, msg: "user created successfully" };
      }
    },

    authenticate: async (
      _: unknown,
      args: { password: string; email: string },
      { res }: { res: Response }
    ) =>
      // context: any
      {
        try {
          const user = await authenticateMiddleware(args.email, args.password);

          if (Array.isArray(user)) {
            if (user?.length >= 1) {
              const accessToken = jwt.sign(
                { email: args.email, id: user[0]._id },
                ACCESS_TOKEN_SECRET as unknown as string,
                { expiresIn: "15s" }
              );
              const refToken = jwt.sign(
                { email: args.email, id: user[0]._id },

                REFRESH_TOKEN_SECRET as unknown as string
              );

              const id = user[0]._id.toString();
              res.cookie("access_token", accessToken, {
                httpOnly: true,
                secure: true,
              });
              res.cookie("refresh_token", refToken, {
                httpOnly: true,
                secure: true,
              });
              return {
                msg: "you successfully logged in",
                status: 200,
                user: user[0],
              };
            }
          } else if (!user) {
            return { msg: "password is wrong", status: 404 };
          } else {
            return { msg: user };
          }
        } catch (err) {
          return (err as Error).message;
        }
      },

    async getUserData(_: any, args: IdInterface) {
      return await userCollection.findById(args.id);
    },
    addToCart: async (_: any, { input }: any) => {
      try {
        const res = await userCollection.findByIdAndUpdate(
          input.userId,
          {
            $push: { cart: input },
          },
          { new: true }
        );
        return { ...res, msg: "successfully added to your cart" };
      } catch (err) {
        return (err as Error).message;
      }
    },

    removeFromCart: async (
      _: any,
      { input }: { input: { productId: string[]; userId: string } }
    ) => {
      try {
        await userCollection.findByIdAndUpdate(
          input.userId,
          {
            $pull: { cart: { productId: { $in: input.productId } } },
          },
          { new: true }
        );
        return { msg: "removed from your cart" };
      } catch (err) {
        return (err as Error).message;
      }
    },
    changeCartCount: async (
      _: any,
      { input }: { input: { userId: string; productId: string; count: number } }
    ) => {
      try {
        await userCollection.findOneAndUpdate(
          {
            _id: input.userId,
            "cart.productId": input.productId,
          },
          {
            $set: { "cart.$.count": input.count },
          },
          { new: true }
        );
        return { msg: "count successfully changed" };
      } catch (err) {
        return (err as Error).message;
      }
    },

    async addToCompare(
      _: any,
      { input }: { input: { userId: string; title: string; productId: string } }
    ) {
      const { productId, title } = input;
      const res = await userCollection.findByIdAndUpdate(
        input.userId,
        {
          $push: { compare: { productId, title } },
        },
        { new: true }
      );

      const newCompared = res!.compare[res!.compare.length - 1] as any;
      newCompared.msg = "successfully added to your comparelist";
      return newCompared;
    },

    async removeFromCompare(
      _: any,
      { input }: { input: { userId: string; productId: string } }
    ) {
      const { productId } = input;
      const res = await userCollection.findByIdAndUpdate(
        input.userId,
        {
          $pull: { compare: { productId } },
        },
        { new: true }
      );

      return { msg: "successfully removed from your comparelist" };
    },

    addToFav: async (_: any, { input }: addToFavInterface) => {
      try {
        const res = await userCollection.findByIdAndUpdate(
          input.userId,
          {
            $push: { fav: input },
          },
          { new: true }
        );
        return { ...res, msg: "successfully added to your favorites" };
      } catch (err) {
        return (err as Error).message;
      }
    },

    removeFromFav: async (_: any, { input }: removeFromFavInterface) => {
      try {
        await userCollection.findByIdAndUpdate(
          input.userId,
          {
            $pull: { fav: { productId: { $in: input.productId } } },
          },
          { new: true }
        );
        return { msg: "removed from your favorites" };
      } catch (err) {
        return (err as Error).message;
      }
    },

    updateUserRole: async (_: any, args: { _id: string; role: string }) => {
      try {
        await userCollection.findByIdAndUpdate(args._id, { role: args.role });

        return { msg: `now ,user role is ${args.role}` };
      } catch (err) {
        return (err as Error).message;
      }
    },
    async logOut(
      _: any,
      args: { _id: string; lastLogIn: string },
      { res }: { res: Response }
    ) {
      await userCollection.findByIdAndUpdate(args._id, {
        lastLogIn: args.lastLogIn,
      });
      res.clearCookie("access_token", { httpOnly: true });
      res.clearCookie("user_id", { httpOnly: true });
      res.clearCookie("refresh_token", { httpOnly: true });
      res.clearCookie("user_email", { httpOnly: true });
      return { msg: "you successfully signed out", status: 200 };
    },

    async resetNotificationCount(_: any, args: IdInterface) {
      await userCollection.findByIdAndUpdate(args.id, {
        notificationsCount: 0,
      });
      return { msg: "done" };
    },

    async deleteNotification(_: any, args: { id: string; userId: string }) {
      await userCollection.findByIdAndUpdate(args.userId, {
        $pull: {
          notifications: { _id: args.id },
        },
      });
      return { msg: "notification is successfully deleted" };
    },

    async toggleReadNotification(
      _: unknown,
      args: { id: string; userId: string; isRead: boolean }
    ) {
      await userCollection.findOneAndUpdate(
        { _id: args.userId, "notifications._id": args.id },
        { $set: { "notifications.$.isRead": args.isRead } }
      );
      return { status: 200 };
    },
    async ClearNotification(_: unknown, args: { userId: string }) {
      await userCollection.findByIdAndUpdate(args.userId, {
        notifications: [],
      });
      return { msg: "Notifications are successfull cleared " };
    },
    async ClearFav(_: unknown, args: { userId: string }) {
      await userCollection.findByIdAndUpdate(args.userId, {
        fav: [],
      });
      return { msg: "your wishlist is successfully cleared ", status: 200 };
    },
    async MarkAllAsReadNotification(_: unknown, args: { userId: string }) {
      await userCollection.findByIdAndUpdate(args.userId, {
        "notifications.$[].isRead": true,
      });
      return { status: 200 };
    },

    async updateUserName(_: any, args: { _id: string; name: string }) {
      await userCollection.findByIdAndUpdate(args._id, { name: args.name });

      return { status: 200, msg: "username is successfully updated  " };
    },
    async updateUserCountry(_: any, args: { _id: string; country: string }) {
      await userCollection.findByIdAndUpdate(args._id, {
        country: args.country,
      });
      return { status: 200, msg: "your country  is successfully updated  " };
    },

    async updateUserPhone(_: any, args: { _id: string; phone: string }) {
      await userCollection.findByIdAndUpdate(args._id, { phone: args.phone });
      return { status: 200 };
    },
    async updateEmail(_: any, args: { _id: string; email: string }) {
      const check = await userCollection.find({ email: args.email });
      if (check.length) {
        return { msg: "this email already used", status: 401 };
      } else {
        await userCollection.findByIdAndUpdate(args._id, {
          email: args.email,
        });
        return { msg: "your email is updated successfully", status: 200 };
      }
    },

    async updatePassword(
      _: unknown,
      args: { _id: string; oldPassword: string; newPassword: string }
    ) {
      const result = await checkOldPass(args._id, args.oldPassword);
      if (result) {
        await userCollection.findByIdAndUpdate(args._id, {
          password: hashPassword(args.newPassword),
        });
        return { msg: "your password successfully updated", status: 200 };
      } else {
        return { msg: "enter your correct old password", status: 404 };
      }
    },

    async updateUserImage(_: unknown, args: any) {
      const result = await new Promise((resolve, reject) => {
        const stream = args.image.file.createReadStream();

        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        stream.pipe(uploadStream);
      });

      const url = (result as any).secure_url;
      if (url) {
        await userCollection.findByIdAndUpdate(args._id, {
          image: url,
        });
        return { status: 200, msg: "you profile successfully updated" };
      } else {
        return { status: 404, msg: "faild to upload" };
      }
    },
  },
  Subscription: {
    AddUser: {
      async subscribe() {
        return pubsub.asyncIterator("User_Added");
      },
    },
  },
};
