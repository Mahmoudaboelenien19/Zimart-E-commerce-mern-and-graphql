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
import { IdInterface, ShopType } from "../interfaces/graqphInterfaces.js";
import { pubsub } from "../context.js";
import productCollection from "../../mongoose/schema/product.js";
import { ObjectId } from "mongodb";
import { AddNotification } from "../../lib/AddNotification";
const imgUrl =
  "https://res.cloudinary.com/domobky11/image/upload/v1682383659/download_d2onbx.png";

interface updateUserDataInterface {
  input: {
    _id: string;
    target: string;
    value: string;
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
      const data = await userCollection.aggregate([
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
            users: { $push: "$$ROOT" },
          },
        },
        {
          $project: {
            users: { $slice: ["$users", skip, limit] },
            count: 1,
            _id: 0,
          },
        },
      ]);
      const { count, users } = data[0];
      return {
        totalUsers: count,
        users,
      };
    },
    async getNotifications(
      _: unknown,
      {
        input: { id, skip, limit, type },
      }: { input: { id: string; skip: number; limit: number; type: string } }
    ) {
      try {
        const boolAr = type === "unread" ? [false] : [false, true];
        const data = await userCollection.aggregate([
          {
            $match: {
              _id: new ObjectId(id),
            },
          },
          {
            $project: {
              notifications: 1,
              _id: 0,
            },
          },
          {
            $unwind: "$notifications",
          },
          {
            $match: {
              "notifications.isRead": { $in: boolAr },
            },
          },
          {
            $sort: {
              "notifications.createdAt": -1,
            },
          },
          {
            $skip: skip,
          },
          {
            $limit: limit,
          },

          {
            $group: {
              _id: null,
              notifications: { $push: "$notifications" },
            },
          },
        ]);
        return data[0]?.notifications || [];
      } catch (er) {
        console.log(er);
      }
    },

    async getUserData(_: any, args: IdInterface) {
      return await userCollection.findById(args.id);
    },
    async getUserShopCollection(_: unknown, args: ShopType) {
      try {
        const { target, userId } = args.input;
        const data = await userCollection.aggregate([
          { $match: { _id: new ObjectId(userId) } },
          {
            $project: {
              [target]: 1,
            },
          },
          { $unwind: `$${target}` },
          {
            $lookup: {
              from: "products",
              localField: `${target}.id`,
              foreignField: "_id",

              as: `${target}.product`,
            },
          },
          { $unwind: `$${target}.product` },
          {
            $group: {
              _id: null,

              data: { $push: `$${target}` },
            },
          },
        ]);
        console.log(data);
        return data[0].data;
      } catch (error) {
        console.log(error);
      }
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
  // Cart: {
  //   async product(par: { id: string }) {
  //     console.log("cart resolver worked");
  //     const res = await productCollection.findById(par.id);

  //     console.log({ res });
  //     return res;
  //   },
  // },
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
        const newUser = await userCollection.create({
          ...input,
          createdAt: new Date().toISOString(),
          image: input.image || imgUrl,
          password: hashPassword(input.password),
        });

        pubsub.publish("NEW_USER", {
          NeWUser: newUser,
        });
        const notificationObj = {
          content: `${input.email} created a new account`,
          link: "/dashboard/users",
        };
        AddNotification(notificationObj);
        return { status: 200, msg: "user created successfully" };
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
                id,
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

    changeCartCount: async (
      _: any,
      { input }: { input: { userId: string; productId: string; count: number } }
    ) => {
      try {
        const { userId, productId, count } = input;
        console.log("chnage worked");
        console.log({ userId, productId, count });
        await userCollection.findOneAndUpdate(
          {
            _id: input.userId,
            "cart.id": input.productId,
          },
          {
            $set: { "cart.$.count": input.count },
          }
        );

        return { msg: "count successfully changed" };
      } catch (err) {
        return (err as Error).message;
      }
    },

    addToShoppingCollection: async (_: unknown, args: ShopType) => {
      try {
        const { id, userId, target } = args.input;

        console.log({ id, userId, target });
        const res = await userCollection.findByIdAndUpdate(userId, {
          $push: { [target]: { id } },
        });
        const msg = target === "fav" ? "wishlist" : target;

        return { msg: `successfully added to your ${msg}`, status: 200 };
      } catch (err) {
        return (err as Error).message;
      }
    },

    removeFromShoppingCollection: async (_: any, args: ShopType) => {
      try {
        const { id, userId, target } = args.input;
        await userCollection.findByIdAndUpdate(userId, {
          $pull: { [target]: { id } },
        });
        const msg = target === "fav" ? "wishlist" : target;
        return { msg: `removed from your ${msg}`, status: 200 };
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
    async updateUserData(
      _: unknown,
      { input: { _id, target, value } }: updateUserDataInterface
    ) {
      try {
        if (target != "email") {
          const res = await userCollection.findByIdAndUpdate(_id, {
            [target]: value,
          });
          return { status: 200, msg: "data is updated successfully" };
        } else if (target === "email") {
          const check = await userCollection.find({ email: value });
          if (check.length) {
            return { msg: "this email already used", status: 401 };
          } else {
            await userCollection.findByIdAndUpdate(_id, {
              email: value,
            });
            return { msg: "your email is updated successfully", status: 200 };
          }
        }
        return null;
      } catch (err) {
        console.log(err);
      }
    },

    async updatePassword(
      _: unknown,
      args: { _id: string; oldPassword: string; newPassword: string }
    ) {
      const result = await checkOldPass(args._id, args.oldPassword);
      if (result) {
        console.log({ result });
        await userCollection.findByIdAndUpdate(args._id, {
          password: hashPassword(args.newPassword),
        });
        return { msg: "your password successfully updated", status: 200 };
      } else {
        return { msg: "enter your correct old password", status: 404 };
      }
    },

    async updateUserImage(_: unknown, args: any) {
      try {
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
      } catch (err) {
        console.log(err);
      }
    },
  },
  Subscription: {
    NeWUser: {
      async subscribe() {
        return pubsub.asyncIterator("NEW_USER");
      },
    },
  },
};
