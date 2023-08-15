import productCollection from "../../mongoose/schema/product.js";
import { pubsub } from "../context.js";

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
      console.log(updatedProduct);
      pubsub.publish("Product_Updated", {
        productUpdated: updatedProduct,
      });
      return { msg: "product updated successfully", status: 200 };
    },
    async addProduct(
      _: any,
      { createInput }: { createInput: productInterface }
    ) {
      try {
        return await productCollection.create(createInput);
      } catch (err) {
        console.log(err);
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
          { projection: { reviews: { $slice: [-1, 1] } }, new: true }
        );
        const newReview = data!.reviews[0];
        newReview.msg = "review added";
        newReview.status = 200;
        return newReview;
      } catch (err) {
        return (err as Error).message;
      }
    },
    async updateReview(_: any, { input }: any) {
      try {
        const { rate, review } = input;
        const data = await productCollection.findOneAndUpdate(
          {
            _id: input.productId,
            "reviews.userId": input.userId,
          },
          {
            $set: {
              "reviews.$.rate": rate,
              "reviews.$.review": review,
            },
          }
        );
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
  },
};
