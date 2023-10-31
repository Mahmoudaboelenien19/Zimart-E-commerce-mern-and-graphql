import mongoose, { Model } from "mongoose";
import { productInterface } from "../../new Grapgql/interfaces/product";

const imageSchema = new mongoose.Schema({
  productPath: String,
  ProductName: String,
});

const reviewSchema = new mongoose.Schema({
  image: String,
  user: String,
  review: String,
  userId: mongoose.Types.ObjectId,
  rate: Number,
});

export const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: { type: Number, min: 0 },
  category: String,
  state: String,
  images: [imageSchema],
  rating: [Number],
  reviews: [reviewSchema],
  createdAt: Date,
});

const productCollection: Model<productInterface> =
  mongoose.model<productInterface>("products", productSchema);
export default productCollection;
