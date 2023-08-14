import { shield } from "graphql-shield";
import { isUser } from "./rules";

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
    updateOrder: isUser,
    deleteOrder: isUser,
    getKey: isUser,
    createOrder: isUser,
  },
});
