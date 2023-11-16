"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productTypeDefs = void 0;
const statusMsg_1 = require("./../types/statusMsg");
const apollo_server_express_1 = require("apollo-server-express");
require("../types/Date.js");
exports.productTypeDefs = (0, apollo_server_express_1.gql) `
  scalar Date
  scalar Upload

  ${statusMsg_1.StatusMsg}
  type Image {
    productPath: String
    ProductName: String
    _id: ID
  }

  type Review {
    review: String
    rate: Int
    status: Int
    msg: String
    user: String
    image: String
    userId: ID
    _id: ID
    userData: User
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

  type Return {
    products: [Product]
    totalProducts: Int
  }

  type DataCreated {
    createdAt: Date!
  }

  type OrderDash {
    cost: Float
    createdAt: Date
  }
  type getDashBoardData {
    products: [DataCreated]
    orders: [OrderDash]
    users: [DataCreated]
    notificationsCount: Int
  }

  type Query {
    products(skip: Int, limit: Int): Return
    product(id: ID!): Product
    getDashBoardData(id: ID): getDashBoardData
  }

  input filterAllInput {
    state: [String]
    category: [String]
    price: Float
    rate: Int
    skip: Int
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

  input CreateReviewInput {
    userId: ID
    _id: ID
    rate: Int
    review: String
    user: String
  }

  input NewProductInput {
    title: String!
    state: String!
    images: [Upload!]!
    stock: Int!
    price: Float!
    description: String!
    category: String!
  }

  input sortProducts {
    sortTarget: String
    sortType: Int
    skip: Int
    limit: Int
  }
  input sortProductsByRateInput {
    sortType: Int
    skip: Int
    limit: Int
  }
  type Mutation {
    SortProducts(input: sortProducts): Return
    SortByRate(input: sortProductsByRateInput!): Return
    filterBycatageory(category: String!): [Product]
    filterByState(state: String!): [Product]
    filterAllTypes(input: filterAllInput): Return
    searchProducts(word: String!, skip: Int, limit: Int): Return
    updateProduct(input: productInput): StatusMsg
    addReview(input: CreateReviewInput): StatusMsg
    updateReview(input: CreateReviewInput): StatusMsg
    addNewProduct(input: NewProductInput): StatusMsg
  }

  type Subscription {
    productUpdated: Product
    singleProductUpdate(id: ID): Product
    productAdded: Product
  }
`;
