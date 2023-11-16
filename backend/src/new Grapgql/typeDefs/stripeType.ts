import "../types/Date.js";
import { StatusMsg } from "./../types/statusMsg.js";
import { gql } from "apollo-server-express";
export const StripeTypes = gql`
  type Key {
    clientSecret: String
  }

  type PublicKey {
    key: String
  }

  input createOrderInput {
    productId: ID
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
