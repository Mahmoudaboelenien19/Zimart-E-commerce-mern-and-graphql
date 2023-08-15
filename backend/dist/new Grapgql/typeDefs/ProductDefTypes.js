"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productTypeDefs = void 0;
const statusMsg_1 = require("./../types/statusMsg");
const apollo_server_express_1 = require("apollo-server-express");
require("../types/Date.js");
exports.productTypeDefs = (0, apollo_server_express_1.gql) `
  scalar Date
  ${statusMsg_1.StatusMsg}
  type Image {
    productPath: String
    ProductName: String
    _id: ID
  }

  type Review {
    image: String
    user: String
    review: String
    rate: Int
    status: Int
    msg: String
    userId: ID
    _id: ID
  }

  type Product {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    stock: Int!
    category: String!
    state: String!
    images: [Image]
    rating: [Int]
    reviews: [Review]
    avgRate: Float
    createdAt: Date
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }

  input filterAllInput {
    state: [String]
    category: [String]
    price: Float
    rate: Int
  }

  input productInput {
    title: String
    state: String
    _id: ID
    stock: Int
    price: Float
    description: String
    category: String
    createdAt: Date
  }

  input createProductInput {
    title: String
    state: String
    _id: ID
    stock: Int
    price: Float
    description: String
    category: String
    createdAt: Date
    images: String
  }

  input createProductInput {
    title: String
    state: String
    _id: ID
    stock: Int
    price: Float
    description: String
    category: String
    createdAt: Date
  }
  input CreateReviewInput {
    userId: ID
    _id: ID
    rate: Int
    review: String
    image: String
    user: String
  }

  input updateReviewInput {
    userId: ID
    productId: ID
    rate: Int
    review: String
  }
  type Mutation {
    filterByPrice(price: Float!): [Product]
    filterByDate(date: Int!): [Product]
    filterByRate(rate: Int!): [Product]
    filterBycatageory(category: String!): [Product]
    filterByState(state: String!): [Product]
    filterAllTypes(input: filterAllInput): [Product]
    searchProducts(word: String!): [Product]
    updateProduct(input: productInput): StatusMsg
    addProduct(createInput: createProductInput): Product
    addReview(input: CreateReviewInput): Review
    updateReview(input: updateReviewInput): StatusMsg
  }

  type Subscription {
    productUpdated: Product
  }
`;
