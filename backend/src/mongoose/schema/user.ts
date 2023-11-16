import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  id: { type: mongoose.SchemaTypes.ObjectId, ref: "products" },
  count: {
    type: Number,
    default: 1,
  },
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  country: String,
  phone: String,
  role: { type: String, default: "user" },
  image: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  lastLogIn: Date,
  notificationsCount: Number,
  fav: [collectionSchema],
  cart: [collectionSchema],

  compare: [collectionSchema],
  notifications: [
    {
      isRead: { type: Boolean, default: false },
      content: String,
      link: { type: String },
      createdAt: { type: Date, default: () => Date.now() },
      // immutable: true,
      // required: true,
    },
  ],
});

export const userCollection =
  mongoose.models.users || mongoose.model("users", userSchema);
