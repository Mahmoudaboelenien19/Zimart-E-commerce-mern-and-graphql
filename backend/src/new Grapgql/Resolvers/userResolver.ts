import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../config.js";
import {
  authenticateMiddleware,
  checkOldPass,
} from "../../middlewares/authenticate.js";
import { hashPassword } from "../../middlewares/hashPassword.js";
import { userCollection } from "../../mongoose/schema/user.js";
import { IdInterface } from "../interfaces/graqphInterfaces.js";

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
    async users() {
      return await userCollection.find();
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
        const notificationObj = {
          isRead: false,
          content: `${input.email} created a new account`,
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
          const result = await authenticateMiddleware(
            args.email,
            args.password
          );

          if (Array.isArray(result)) {
            console.log(89);
            console.log(result);
            if (result.length >= 1) {
              console.log(92);

              const expire = { expiresIn: "15s" };
              const accessToken = jwt.sign(
                { result },
                ACCESS_TOKEN_SECRET as unknown as string,
                expire
              );
              const refToken = jwt.sign(
                { result },
                REFRESH_TOKEN_SECRET as unknown as string
              );

              const id = result[0]._id.toString();
              console.log({
                accessToken,
                refToken,
                id,
                email: result[0].email,
              });
              res.cookie("user_email", result[0].email as unknown as string, {
                httpOnly: true,
              });
              res.cookie("user_id", id as unknown as string, {
                httpOnly: true,
                secure: true,
              });
              res.cookie("access_token", accessToken, {
                httpOnly: true,
                secure: true,
              });
              res.cookie("refresh_token", refToken, {
                httpOnly: true,
                secure: true,
              });
              return { msg: "you successfully logged in", status: 200 };
            }
          } else if (!result) {
            return { msg: "password is wrong", status: 404 };
          } else {
            return { msg: result };
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
  },
};
