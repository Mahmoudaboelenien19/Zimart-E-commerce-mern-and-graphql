"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeTypes = void 0;
require("../types/Date.js");
const apollo_server_express_1 = require("apollo-server-express");
exports.StripeTypes = (0, apollo_server_express_1.gql) `
  type Key {
    clientSecret: String
  }

  type PublicKey {
    key: String
  }

  input createOrderInput {
    _id: ID
    productId: ID
    parentId: ID
    price: Float
    path: String
    title: String
    count: Int
  }
  type Query {
    getPublickKey: PublicKey!
  }
  type Mutation {
    getKey(input: [createOrderInput]): Key!
  }
`;
