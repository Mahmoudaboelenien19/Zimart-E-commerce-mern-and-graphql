import { gql } from "@apollo/client";

export const FILTER_BY_PRICE = gql`
  mutation ($price: Float!) {
    filterByPrice(price: $price) {
      totalProducts
      products {
        reviews {
          image
          user
          review
          rate
          _id
        }
        _id
        price
        stock
        title
        description
        rating
        category
        state

        images {
          productPath
          _id
        }
      }
    }
  }
`;

export const FILTER_BY_Date = gql`
  mutation ($date: Int!) {
    filterByDate(date: $date) {
      reviews {
        image
        user
        review
        rate
        _id
      }
      _id
      price
      stock
      title
      description
      rating
      category
      state

      images {
        productPath
        _id
      }
    }
  }
`;

export const FILTER_BY_STATE = gql`
  mutation ($state: String!) {
    filterByState(state: $state) {
      reviews {
        image
        user
        review
        rate
        _id
      }
      _id
      price
      stock
      title
      description
      rating
      category
      state

      images {
        productPath
        _id
      }
    }
  }
`;

export const FILTER_BY_Catagroy = gql`
  mutation ($category: String!) {
    filterBycatageory(category: $category) {
      reviews {
        image
        user
        review
        rate
        _id
      }
      _id
      price
      stock
      title
      description
      rating
      category
      state

      images {
        productPath
        _id
      }
    }
  }
`;

export const FILTER_BY_Rate = gql`
  mutation ($rate: Int!) {
    filterByRate(rate: $rate) {
      reviews {
        image
        user
        review
        rate
        _id
      }
      _id
      price
      stock
      state
      title
      description
      rating
      category

      images {
        productPath
        _id
      }
    }
  }
`;

export const Search_Mutaion = gql`
  mutation ($word: String!, $skip: Int, $limit: Int) {
    searchProducts(word: $word, skip: $skip, limit: $limit) {
      totalProducts
      products {
        reviews {
          image
          user
          review
          rate
          _id
        }
        _id
        price
        stock
        title
        description
        rating
        category
        state

        images {
          productPath
          _id
        }
      }
    }
  }
`;

export const update_Product = gql`
  mutation ($input: productInput) {
    updateProduct(input: $input) {
      msg
      # status
    }
  }
`;

export const Add_Product = gql`
  mutation ($input: NewProductInput) {
    addNewProduct(input: $input) {
      status
      msg
    }
  }
`;

export const FILTER_All = gql`
  mutation ($input: filterAllInput) {
    filterAllTypes(input: $input) {
      reviews {
        image
        user
        review
        rate
        _id
      }
      _id
      price
      stock
      state
      title
      description
      rating
      category

      images {
        productPath
        _id
      }
    }
  }
`;

export const Updated_Product_Subscription = gql`
  subscription productUpdated {
    productUpdated {
      reviews {
        image
        user
        review
        rate
        _id
      }
      _id
      price
      stock
      title
      description
      rating
      category
      state

      images {
        productPath
        _id
      }
    }
  }
`;

export const Added_Product_Subscription = gql`
  subscription productAdded {
    productAdded {
      reviews {
        image
        user
        review
        rate
        _id
      }
      _id
      price
      stock
      title
      description
      rating
      category
      state

      images {
        productPath
        _id
      }
    }
  }
`;

export const Single_Updated_Product_Subscription = gql`
  subscription productUpdated($id: ID) {
    singleProductUpdate(id: $id) {
      reviews {
        image
        user
        review
        rate
        _id
      }
      _id
      price
      stock
      title
      description
      rating
      category
      state

      images {
        productPath
        _id
      }
    }
  }
`;
