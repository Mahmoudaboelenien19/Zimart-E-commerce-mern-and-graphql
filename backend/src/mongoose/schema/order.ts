import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  state: { type: String, default: "pending" },
  productId: [
    {
      id: mongoose.Types.ObjectId,
      count: Number,
      image: String,
      price: Number,
      title: String,
    },
  ],
  count: Number,
  cost: Number,
  createdAt: { type: Date, default: () => Date.now() },
  deliveredAt: Date,
});

export const OrderCollection = mongoose.model("orders", orderSchema);
