"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = void 0;
const graphql_shield_1 = require("graphql-shield");
const rules_1 = require("./rules");
exports.permissions = (0, graphql_shield_1.shield)({
    Query: {
        getPublickKey: rules_1.isUser,
    },
    Mutation: {
        addToFav: rules_1.isUser,
        removeFromFav: rules_1.isUser,
        addToCompare: rules_1.isUser,
        removeFromCompare: rules_1.isUser,
        removeFromCart: rules_1.isUser,
        addToCart: rules_1.isUser,
        updateOrder: rules_1.isUser,
        deleteOrder: rules_1.isUser,
        getKey: rules_1.isUser,
        createOrder: rules_1.isUser,
        updateUserImage: rules_1.isUser,
        addNewProduct: rules_1.isUser,
    },
});
