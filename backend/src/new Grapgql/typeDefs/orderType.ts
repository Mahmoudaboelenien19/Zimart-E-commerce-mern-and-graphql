import "../types/Date.js";
import { StatusMsg } from "./../types/statusMsg.js";
import { gql } from "apollo-server-express";

export const orderDefType = gql`
  scalar Date
  ${StatusMsg}

  type OrderProduct {
    id: ID
    image: String
    price: Float
    title: String
    count: Int
    product: Product
  }

  type Order {
    _id: ID!
    userId: ID!
    state: String!
    msg: String
    productId: [OrderProduct]
    count: Int!
    cost: Float!
    createdAt: Date
    deliveredAt: Date
    user: User
  }

  type Query {
    orders: [Order]
    order(id: ID!): Order
  }

  input updateOrderInput {
    _id: ID
    state: String
    deliveredAt: Date
  }

  input ProductOrderinput {
    _id: ID
    productId: ID
    parentId: ID
    price: Float
    path: String
    title: String
    count: Int
  }

  input createdOrderInput {
    products: [ProductOrderinput]
    email: String
    userId: String
  }

  type orderReturn {
    orderId: ID
    status: Int
  }

  type Mutation {
    updateOrder(input: updateOrderInput): Order
    deleteOrder(_id: [ID!]): Order
    createOrder(input: createdOrderInput): orderReturn
  }

  type Notification {
    _id: ID
    isRead: Boolean
    content: String
    createdAt: Date
  }

  type Subscription {
    OrderCreated: Order
    NotificationAdded: Notification
  }
`;
