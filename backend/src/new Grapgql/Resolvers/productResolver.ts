import cloudinary from "cloudinary";
import productCollection from "../../mongoose/schema/product.js";
import { pubsub } from "../context.js";
import { userCollection } from "../../mongoose/schema/user.js";

interface filterAllInterface {
  input: {
    state: string[];
    category: string[];
    price: number;
    rate: number;
  };
}

interface productInterface {
  title: string;
  state: string;
  _id: string;
  stock: number;
  price: number;
  description: string;
  category: string;
  createdAt?: string;
}

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
    async products() {
      return await productCollection.find({});
    },
    async product(_: any, args: { id: string }) {
      return await productCollection.findById(args.id);
    },
  },
  Mutation: {
    async filterByPrice(_: any, args: { price: number }) {
      if (args.price === 1) {
        return productCollection.find({}).sort({ price: 1 });
      } else if (args.price === -1) {
        return productCollection.find({}).sort({ price: -1 });
      } else {
        return productCollection.find({ price: { $lte: args.price } });
      }
    },

    async filterByDate(_: any, args: { date: number }) {
      if (args.date === 1) {
        return productCollection.find({}).sort({ createdAt: 1 });
      } else if (args.date === -1) {
        return productCollection.find({}).sort({ createdAt: -1 });
      }
    },
    filterByRate(_: any, args: { rate: 1 | -1 }) {
      return productCollection.aggregate([
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

        { $sort: { avgRate: args.rate } },
      ]);
    },
    async filterBycatageory(_: any, args: { category: string }) {
      return productCollection.find({ category: args.category });
    },
    async filterByState(_: any, args: { state: string }) {
      return productCollection.find({ state: args.state });
    },
    async filterAllTypes(_: any, args: filterAllInterface) {
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
        ]);

        return data;
      } catch (err) {
        console.log((err as Error).message);
      }
    },
    async searchProducts(_: any, args: { word: string }) {
      return await productCollection.find({
        $or: [
          { category: { $regex: args.word, $options: "i" } },
          { title: { $regex: args.word, $options: "i" } },
        ],
      });
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
