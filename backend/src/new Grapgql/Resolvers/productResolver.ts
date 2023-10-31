import { SkipAndLimit } from "./../interfaces/graqphInterfaces";
import cloudinary from "cloudinary";
import productCollection from "../../mongoose/schema/product.js";
import { pubsub } from "../context.js";
import { userCollection } from "../../mongoose/schema/user.js";
import { OrderCollection } from "../../mongoose/schema/order";
import { productInterface } from "../interfaces/product";

interface filterAllInterface {
  input: {
    state: string[];
    category: string[];
    price: number;
    rate: number;
    skip: number;
    limit: number;
  };
}
type Data = {
  data: {
    products: productInterface[];
    totalCount: number;
  }[];
};

interface reviewInterface {
  image: string;
  _id: string;
  user: string;
  userId: string;

  review: string;
  rate: number;
}

export const productResolver = {
  Query: {
    async products(_: unknown, { limit, skip }: SkipAndLimit) {
      //i run it in two queries as  count() is super fast so no need to use aggerate with facet as i use in AllFIlterType  && search
      const totalProducts = await productCollection.count();
      const products = await productCollection.find({}).skip(skip).limit(limit);
      return { products, totalProducts };
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
      const count = await productCollection.find({}).count();
      const { skip, limit, sortTarget, sortType } = args.input;
      const sortOptions = {
        [sortTarget]: sortType,
      } as any;
      const sortedProducts = await productCollection
        .find({})
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);

      return {
        totalProducts: count,
        products: sortedProducts,
      };
    },

    async SortByRate(
      _: unknown,
      args: { input: { limit: number; skip: number; sortType: 1 | -1 } }
    ) {
      const { skip, sortType, limit } = args.input;
      const totalProducts = await productCollection.find({}).count();
      const products = await productCollection.aggregate([
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            price: 1,
            stock: 1,
            category: 1,
            state: 1,
            images: 1,
            rating: 1,
            reviews: 1,
            avgRate: { $avg: { $concatArrays: ["$rating", "$reviews.rate"] } },
          },
        },
        { $sort: { avgRate: sortType } },
        { $skip: skip },
        { $limit: limit },
      ]);

      return { products, totalProducts };
    },

    async filterAllTypes(_: unknown, args: filterAllInterface) {
      try {
        const data = await productCollection.aggregate([
          {
            $project: {
              _id: 1,
              title: 1,
              description: 1,
              price: 1,
              stock: 1,
              category: 1,
              state: 1,
              images: 1,
              rating: 1,
              reviews: 1,
              avgRate: {
                $avg: { $concatArrays: ["$rating", "$reviews.rate"] } || 1,
              },
            },
          },

          {
            $match: {
              $or: [{ avgRate: { $lte: args.input.rate } }, { avgRate: null }],
              price: { $lte: args.input.price },
              category: { $in: args.input.category },
              state: { $in: args.input.state },
            },
          },

          {
            $facet: {
              totalCount: [{ $count: "count" }],
              products: [
                { $skip: args.input.skip },
                { $limit: 12 },
                { $group: { _id: null, products: { $push: "$$ROOT" } } },
              ],
            },
          },
        ]);

        return {
          products: data[0].products[0].products || [],
          totalProducts: data[0].totalCount[0].count || 0,
        } as unknown as Data;
      } catch (err) {
        console.log((err as Error).message);
      }
    },
    async searchProducts(
      _: unknown,
      args: { word: string; skip: number; limit: number }
    ) {
      const data = await productCollection.aggregate([
        {
          $match: {
            $or: [
              { category: { $regex: args.word, $options: "i" } },
              { title: { $regex: args.word, $options: "i" } },
            ],
          },
        },
        {
          $facet: {
            totalCount: [{ $count: "count" }],
            products: [
              { $skip: args.skip },
              { $limit: 12 },
              { $group: { _id: null, products: { $push: "$$ROOT" } } },
            ],
          },
        },
      ]);

      return {
        products: data[0]?.products[0]?.products || null,

        totalProducts: data[0]?.totalCount[0]?.count || 0,
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
        isRead: false,
        content: `${updatedProduct?.title
          .split(" ")
          .slice(0, 5)
          .join(" ")} is updated`,
        createdAt: new Date().toISOString(),
        link: `/${updatedProduct?._id}`,
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
            isRead: false,
            content: `${newProduct.title
              .split(" ")
              .slice(0, 5)
              .join(" ")}  is Added`,
            createdAt: new Date().toISOString(),
            link: `/${newProduct._id}`,
          };
          const notification = await userCollection.updateMany(
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

    async addReview(_: any, { input }: { input: reviewInterface }) {
      try {
        const { userId, rate, review, image, user } = input;
        const data = await productCollection.findByIdAndUpdate(
          input._id,
          {
            $push: { reviews: { user, userId, rate, review, image } },
          },
          { new: true }
        );

        pubsub.publish("Product_Updated", {
          productUpdated: data,
        });

        pubsub.publish("Single_Product_Updated", {
          singleProductUpdate: data,
        });
        const notificationObj = {
          isRead: false,
          content: `${user} added a review on ${data?.title
            .split(" ")
            .slice(0, 5)
            .join(" ")}`,
          createdAt: new Date().toISOString(),
          link: `/${data?._id}`,
        };
        const notification = await userCollection.updateMany(
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

        return { status: 200, msg: "review added successfully" };
      } catch (err) {
        return (err as Error).message;
      }
    },
    async updateReview(_: any, { input }: any) {
      try {
        const { rate, review } = input;
        const newReview = await productCollection.findOneAndUpdate(
          {
            _id: input.productId,
            "reviews.userId": input.userId,
          },
          {
            $set: {
              "reviews.$.rate": rate,
              "reviews.$.review": review,
            },
          },
          { new: true }
        );
        pubsub.publish("Single_Product_Updated", {
          singleProductUpdate: newReview,
        });
        pubsub.publish("Product_Updated", {
          productUpdated: newReview,
        });
        return { msg: "review updated successfully" };
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
