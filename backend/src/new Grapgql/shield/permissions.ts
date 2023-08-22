import { shield } from "graphql-shield";
import { isAdmin, isUser } from "./rules";

export const permissions = shield({
  Query: {
    getPublickKey: isUser,
  },
  Mutation: {
    addToFav: isUser,
    removeFromFav: isUser,
    addToCompare: isUser,
    removeFromCompare: isUser,
    removeFromCart: isUser,
    addToCart: isUser,
    addReview: isUser,
    updateReview: isUser,
    getKey: isUser,
    createOrder: isUser,
    updateUserImage: isUser,
    deleteOrder: isAdmin,
    addNewProduct: isAdmin,
    updateOrder: isAdmin,
    updateProduct: isAdmin,
    updateUserRole: isAdmin,
  },
});
