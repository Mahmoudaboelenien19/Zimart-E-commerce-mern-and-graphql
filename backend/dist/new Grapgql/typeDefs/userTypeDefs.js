"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypeDefs = void 0;
const statusMsg_1 = require("./../types/statusMsg");
const apollo_server_express_1 = require("apollo-server-express");
require("../types/Date.js");
exports.userTypeDefs = (0, apollo_server_express_1.gql) `
  ${statusMsg_1.StatusMsg}
  scalar Upload
  scalar Date

  type Collection {
    id: ID
    count: Int
  }
  type Notification {
    _id: ID
    isRead: Boolean
    content: String
    link: String
    createdAt: Date
  }

  type User {
    _id: ID
    name: String
    image: String
    email: String
    msg: String
    country: String
    role: String
    phone: String
    status: Int
    fav: [Collection]
    cart: [Collection]
    compare: [Collection]
    createdAt: Date
    lastLogIn: Date
    notificationsCount: Int
  }

  input AddUserInput {
    name: String!
    email: String!
    password: String!
    country: String!
    image: String
  }

  input changeCartCountInput {
    productId: ID
    userId: ID!
    count: Int
  }

  input updateImgInput {
    _id: ID!
    image: Upload
  }

  type UsersData {
    name: String
    _id: ID
    email: String
    status: Int
    createdAt: Date
    lastLogIn: Date
    role: String
  }

  type UserReturn {
    users: [UsersData]
    totalUsers: Int
  }

  input NotificationInput {
    id: ID!
    limit: Int
    skip: Int
    type: String
  }
  type Query {
    users(limit: Int, skip: Int): UserReturn
    getUserData(id: ID!): User
    getNotifications(input: NotificationInput): [Notification]
    getUserShopCollection(input: ShopInput): [ReturnCollection]
  }

  type AuthResult {
    msg: String!
    status: Int
    id: ID
  }

  type Subscription {
    NeWUser: User
  }

  input updateUserDataInput {
    _id: ID!
    target: String!
    value: String!
  }

  input ShopInput {
    userId: ID
    id: ID
    target: String
  }

  type ReturnCollection {
    id: ID
    count: Int
    product: Product
  }

  type UpdateImgReturn {
    url: String
    msg: String
    status: Int
  }
  type Mutation {
    addUser(input: AddUserInput): StatusMsg
    authenticate(password: String!, email: String!): AuthResult
    changeCartCount(input: changeCartCountInput): StatusMsg
    addToShoppingCollection(input: ShopInput): StatusMsg
    removeFromShoppingCollection(input: ShopInput): StatusMsg
    updateUserRole(_id: ID!, role: String!): StatusMsg
    logOut(lastLogIn: Date, _id: ID): StatusMsg
    resetNotificationCount(id: ID!): StatusMsg
    deleteNotification(id: ID!, userId: ID!): StatusMsg
    toggleReadNotification(id: ID!, userId: ID!, isRead: Boolean): StatusMsg
    ClearNotification(userId: ID!): StatusMsg
    ClearFav(userId: ID!): StatusMsg
    MarkAllAsReadNotification(userId: ID!): StatusMsg
    updateUserData(input: updateUserDataInput): StatusMsg
    updatePassword(
      _id: ID!
      oldPassword: String!
      newPassword: String!
    ): StatusMsg
    updateUserImage(_id: ID, image: Upload): UpdateImgReturn
  }
`;
