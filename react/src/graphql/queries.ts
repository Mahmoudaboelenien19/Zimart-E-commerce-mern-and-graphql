import { gql } from "@apollo/client";

export const GET_ALL_ORDERS = gql`
  query {
    orders {
      _id
      state
      cost
      productId {
        id
        count
        image
        title
        price
      }
      userId
      count
      createdAt
      deliveredAt
    }
  }
`;

export const GET_ORDER = gql`
  query ($id: ID!) {
    order(id: $id) {
      _id
      state
      cost
      productId {
        id
        count
        image
        title
        price
      }
      userId
      count
      createdAt
      deliveredAt
    }
  }
`;
