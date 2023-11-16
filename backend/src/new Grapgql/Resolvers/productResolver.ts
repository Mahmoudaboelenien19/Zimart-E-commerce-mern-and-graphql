import { SkipAndLimit } from "./../interfaces/graqphInterfaces";
import cloudinary from "cloudinary";
import productCollection from "../../mongoose/schema/product.js";
import { pubsub } from "../context.js";
import { userCollection } from "../../mongoose/schema/user.js";
import { OrderCollection } from "../../mongoose/schema/order";
import { productInterface } from "../interfaces/product";
import { AddNotification } from "../../lib/AddNotification";

type filterAllIType = {
  input: {
    state: string[];
    category: string[];
    price: number;
    rate: number;
    skip: number;
    limit: number;
  };
};

type ProductData = { count: number; products: productInterface[] };

type SearchProduct = { word: string; skip: number; limit: number };
type reviewType = {
  image: string;
  _id: string;
  user: string;
  userId: string;
  review: string;
  rate: number;
};

export const productResolver = {
  Query: {
    async products(_: unknown, { limit, skip }: SkipAndLimit) {
      const data = await productCollection.aggregate([
        { $sort: { createdAt: -1 } },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
            products: { $push: "$$ROOT" },
          },
        },
        {
          $project: {
            products: { $slice: ["$products", skip, limit] },
            count: 1,
            _id: 0,
          },
        },
      ]);
      const { count, products } = data[0];
      return { products, totalProducts: count };
    },

    async product(_: any, args: { id: string }) {
      return await productCollection.findById(args.id);
    },
    async getDashBoardData(_: unknown, { id }: { id: string }) {
      const orders = await OrderCollection.find({}, { createdAt: 1, cost: 1 });
      const products = await productCollection.find({}, { createdAt: 1 });
      const users = await userCollection.find({}, { createdAt: 1 });
      const notificationsCount = (await userCollection.findById(id, {
        notificationsCount: 1,
        _id: 0,
      })) as { notificationsCount: number };

      return {
        orders,
        products,
        users,
        notificationsCount: notificationsCount?.notificationsCount || 0,
      };
    },
  },

  Mutation: {
    async SortProducts(
      _: any,
      args: {
        input: {
          sortTarget: string;
          sortType: number;
          limit: number;
          skip: number;
        };
      }
    ) {
      const { skip, limit = 12, sortTarget, sortType } = args.input;
      const sortOptions = {
        [sortTarget]: sortType,
      } as any;
      const data = await productCollection.aggregate([
        { $sort: sortOptions },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
            products: { $push: "$$ROOT" },
          },
        },
        {
          $project: {
            products: { $slice: ["$products", skip, limit] },
            count: 1,
            _id: 0,
          },
        },
      ]);

      const { count, products } = data[0];
      return {
        totalProducts: count,
        products,
      };
    },

    async SortByRate(
      _: unknown,
      args: { input: { limit: number; skip: number; sortType: 1 | -1 } }
    ) {
      const { skip, sortType, limit = 12 } = args.input;
      const data = await productCollection.aggregate([
        {
          $addFields: {
            avgRate: { $avg: { $concatArrays: ["$rating", "$reviews.rate"] } },
          },
        },
        { $sort: { avgRate: sortType } },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
            products: { $push: "$$ROOT" },
          },
        },
        {
          $project: {
            products: { $slice: ["$products", skip, limit] },
            count: 1,
            _id: 0,
          },
        },
      ]);

      const { count, products } = data[0];
      return { products, totalProducts: count };
    },

    async filterAllTypes(_: unknown, args: filterAllIType) {
      try {
        const { state, category, price, rate, skip, limit = 12 } = args.input;
        const data: ProductData[] = await productCollection.aggregate([
          {
            $addFields: {
              avgRate: {
                $avg: { $concatArrays: ["$rating", "$reviews.rate"] } || 1,
              },
            },
          },

          {
            $match: {
              $or: [{ avgRate: { $lte: rate } }, { avgRate: null }],
              price: { $lte: price },
              category: { $in: category },
              state: { $in: state },
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
              products: { $push: "$$ROOT" },
            },
          },
          {
            $project: {
              products: { $slice: ["$products", skip, limit] },
              count: 1,
              _id: 0,
            },
          },
        ]);

        return {
          products: data[0]?.products,
          totalProducts: data[0]?.count,
        };
      } catch (err) {
        console.log((err as Error).message);
      }
    },
    async searchProducts(_: unknown, args: SearchProduct) {
      const { word, skip, limit = 12 } = args;
      console.log({ word, skip, limit });
      const data = await productCollection.aggregate([
        {
          $match: {
            $or: [
              { category: { $regex: word, $options: "i" } },
              { title: { $regex: word, $options: "i" } },
            ],
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
            products: { $push: "$$ROOT" },
          },
        },

        {
          $project: {
            _id: 0,
            count: 1,
            products: { $slice: ["$products", skip, limit] },
          },
        },
      ]);
      console.log(data);
      return {
        products: data[0]?.products,
        totalProducts: data[0]?.count,
      };
    },

    async updateProduct(_: any, { input }: { input: productInterface }) {
      const updatedProduct = await productCollection.findByIdAndUpdate(
        input._id,
        input,
        { returnDocument: "after" }
      );

      pubsub.publish("Product_Updated", {
        productUpdated: updatedProduct,
      });
      pubsub.publish("Single_Product_Updated", {
        singleProductUpdate: updatedProduct,
      });

      const notificationObj = {
        content: `${updatedProduct?.title
          .split(" ")
          .slice(0, 5)
          .join(" ")} is updated`,
        link: `/product/${updatedProduct?._id}`,
      };
      AddNotification(notificationObj);
      return { msg: "product updated successfully", status: 200 };
    },
    async addNewProduct(_: unknown, { input }: { input: any }) {
      try {
        const urls = await Promise.all(
          input.images.map(async (f: any) => {
            const file = await f.promise;
            return new Promise((resolve, reject) => {
              const stream = file.createReadStream();

              const uploadStream = cloudinary.v2.uploader.upload_stream(
                { resource_type: "auto" },
                (error: any, result: any) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve({
                      productPath: result.secure_url,
                      productName: result.original_filename,
                    });
                  }
                }
              );

              stream.pipe(uploadStream);
            });
          })
        );

        if (urls.length >= 1) {
          const newProduct = await productCollection.create({
            ...input,
            images: urls,
          });
          pubsub.publish("Product_Added", {
            productAdded: newProduct,
          });
          const notificationObj = {
            content: `${newProduct.title
              .split(" ")
              .slice(0, 5)
              .join(" ")}  is Added`,
            link: `/${newProduct._id}`,
          };
          AddNotification(notificationObj);
          return {
            status: 200,
            msg: "your product is successfully added",
          };
        } else {
          return { status: 404, msg: "Failed to upload images" };
        }
      } catch (err) {
        console.log(err);
        return { status: 404, msg: "Failed to upload images" };
      }
    },

    //reviews

    async addReview(_: any, { input }: { input: reviewType }) {
      try {
        const { userId, rate, review, user } = input;
        const data = await productCollection.findByIdAndUpdate(input._id, {
          $push: { reviews: { userId, rate, review } },
        });

        const notificationObj = {
          content: `${user} added a review on ${data?.title
            .split(" ")
            .slice(0, 5)
            .join(" ")}`,
          link: `/product/${data?._id}`,
        };
        AddNotification(notificationObj);
        return { status: 200, msg: "review added successfully" };
      } catch (err) {
        return (err as Error).message;
      }
    },
    async updateReview(_: any, { input }: any) {
      try {
        const { rate, review, _id, userId } = input;
        await productCollection.findOneAndUpdate(
          {
            _id,
            "reviews.userId": userId,
          },
          {
            $set: {
              "reviews.$.rate": rate,
              "reviews.$.review": review,
            },
          }
        );

        return { msg: "review updated successfully", status: 200 };
      } catch (err) {
        return (err as Error).message;
      }
    },
  },
  Subscription: {
    productUpdated: {
      async subscribe() {
        return pubsub.asyncIterator("Product_Updated");
      },
    },
    productAdded: {
      async subscribe() {
        return pubsub.asyncIterator("Product_Added");
      },
    },
    singleProductUpdate: {
      async subscribe() {
        return pubsub.asyncIterator("Single_Product_Updated");
      },
    },
  },
};
