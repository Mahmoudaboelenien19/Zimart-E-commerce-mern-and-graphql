import { gql } from "@apollo/client";

export const GET_Product_By_Id = gql`
  query ($id: ID!) {
    product(id: $id) {
      _id
      price
      stock
      title
      state
      rating
      category
      createdAt
      reviews {
        image
        user
        userId
        review
        rate
        _id
        userData {
          name
          image
        }
      }
      description
      images {
        productPath
        _id
      }
    }
  }
`;

export const Get_All_Products = gql`
  query ($skip: Int, $limit: Int) {
    products(skip: $skip, limit: $limit) {
      totalProducts
      products {
        _id
        price
        stock
        title
        state
        rating
        category
        createdAt
        reviews {
          image
          user
          userId
          review
          rate
          _id
          userData {
            name
            image
          }
        }
        description
        images {
          productPath
          _id
        }
      }
    }
  }
`;
