import { gql } from "@apollo/client";

export const Remove_Order = gql`
  mutation ($_id: [ID!]) {
    deleteOrder(_id: $_id) {
      msg
    }
  }
`;

export const update_Order = gql`
  mutation ($input: updateOrderInput) {
    updateOrder(input: $input) {
      msg
    }
  }
`;

export const create_Order = gql`
  mutation ($input: createdOrderInput) {
    createOrder(input: $input) {
      orderId
      status
    }
  }
`;

export const Order_Created_Subscription = gql`
  subscription OrderCreated {
    OrderCreated {
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

      createdAt
      deliveredAt
    }
  }
`;

export const New_Notification_Subscription = gql`
  subscription NotificationAdded {
    NotificationAdded {
      isRead
      createdAt
      content
      link
      _id
    }
  }
`;
