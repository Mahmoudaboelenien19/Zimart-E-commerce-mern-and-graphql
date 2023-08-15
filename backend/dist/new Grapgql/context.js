"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = exports.pubsub = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
exports.pubsub = new graphql_subscriptions_1.PubSub();
const context = ({ req, res }) => {
    return { req, res };
};
exports.context = context;
