import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  country: String,
  phone: String,
  role: String,
  image: String,
  createdAt: Date,
  lastLogIn: Date,
  notificationsCount: Number,
  fav: [
    {
      productId: mongoose.SchemaTypes.ObjectId,
      parentId: mongoose.SchemaTypes.ObjectId,
      title: String,
      path: String,
      price: Number,
    },
  ],
  cart: [
    {
      productId: mongoose.SchemaTypes.ObjectId,
      parentId: mongoose.SchemaTypes.ObjectId,
      count: Number,
      title: String,
      path: String,
      price: Number,
    },
  ],

  compare: [
    {
      productId: mongoose.SchemaTypes.ObjectId,
      title: String,
    },
  ],
  notifications: [
    {
      isRead: Boolean,
      content: String,
      link: String,
      createdAt: Date,
    },
  ],
});

export const userCollection = mongoose.model("users", userSchema);
