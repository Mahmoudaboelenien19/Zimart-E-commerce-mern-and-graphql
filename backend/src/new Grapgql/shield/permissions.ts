import { shield } from "graphql-shield";
import { isAdmin, isUser } from "./rules";

export const permissions = shield({
  Query: {
    getPublickKey: isUser,
  },
  Mutation: {
    addToShoppingCollection: isUser,
    removeFromShoppingCollection: isUser,
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
