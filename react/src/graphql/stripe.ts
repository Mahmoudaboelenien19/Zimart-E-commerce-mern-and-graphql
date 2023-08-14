import { gql } from "@apollo/client";

export const get_Stripe_Secret = gql`
  mutation ($input: [createOrderInput]) {
    getKey(input: $input) {
      clientSecret
    }
  }
`;

export const get_Stripe_PublicKey = gql`
  query {
    getPublickKey {
      key
    }
  }
`;
