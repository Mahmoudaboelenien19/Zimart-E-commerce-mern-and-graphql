import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation ($input: AddUserInput) {
    addUser(input: $input) {
      name
      msg
      status
    }
  }
`;

export const GET_ALL_USERS = gql`
  query ($skip: Int, $limit: Int) {
    users(skip: $skip, limit: $limit) {
      totalUsers
      users {
        _id
        email
        name
        createdAt
        lastLogIn
        role
      }
    }
  }
`;

export const Add_To_Cart = gql`
  mutation ($input: AddToCartInput) {
    addToCart(input: $input) {
      msg
    }
  }
`;

export const Change_Cart_Count = gql`
  mutation ($input: changeCartCountInput) {
    changeCartCount(input: $input) {
      msg
    }
  }
`;

export const AddTo_Compare = gql`
  mutation ($input: AddToCompareInput) {
    addToCompare(input: $input) {
      msg
      _id
    }
  }
`;

export const remove_From_Compare = gql`
  mutation ($input: removeFromCompareInput) {
    removeFromCompare(input: $input) {
      msg
      _id
    }
  }
`;

export const Add_To_Fav = gql`
  mutation ($input: AddToFavInput) {
    addToFav(input: $input) {
      msg
    }
  }
`;

export const Authenticate_Query = gql`
  mutation ($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
      msg
      status
    }
  }
`;

export const Update_User_ROle = gql`
  mutation ($_id: ID!, $role: String!) {
    updateUserRole(_id: $_id, role: $role) {
      msg
    }
  }
`;

export const GET_USER_DATA = gql`
  query ($id: ID!) {
    getUserData(id: $id) {
      email
      name
      image
      country
      phone
      role
      _id

      fav {
        productId
        product {
          price
          title
        }
        path
        parentId
        _id
      }

      cart {
        count
        productId
        parentId
        _id
        path
        product {
          price
          title
          stock
        }
      }
      compare {
        productId
        title
      }
    }
  }
`;

export const REMOVE_FROM_FAV = gql`
  mutation ($productId: [ID!], $userId: ID!) {
    removeFromFav(input: { userId: $userId, productId: $productId }) {
      msg
    }
  }
`;

export const REMOVE_FROM_Cart = gql`
  mutation ($productId: [ID!], $userId: ID!) {
    removeFromCart(input: { userId: $userId, productId: $productId }) {
      msg
    }
  }
`;
``;

export const addReview = gql`
  mutation ($input: CreateReviewInput) {
    addReview(input: $input) {
      msg
      status
    }
  }
`;

export const update_Review = gql`
  mutation ($input: updateReviewInput) {
    updateReview(input: $input) {
      msg
    }
  }
`;

export const UPDATE_USER_DATA = gql`
  mutation ($input: updateUserDataInput) {
    updateUserData(input: $input) {
      msg
      status
    }
  }
`;

export const Update_Pass = gql`
  mutation ($_id: ID!, $newPassword: String!, $oldPassword: String!) {
    updatePassword(
      newPassword: $newPassword
      _id: $_id
      oldPassword: $oldPassword
    ) {
      msg
      status
    }
  }
`;

export const LogOut_Mutation = gql`
  mutation ($lastLogIn: Date, $_id: ID) {
    logOut(lastLogIn: $lastLogIn, _id: $_id) {
      msg
    }
  }
`;

export const Reset_Notification = gql`
  mutation ($id: ID!) {
    resetNotificationCount(id: $id) {
      msg
    }
  }
`;

export const Delete_Notification = gql`
  mutation ($id: ID!, $userId: ID!) {
    deleteNotification(userId: $userId, id: $id) {
      msg
    }
  }
`;

export const Toggle_Read_Notification = gql`
  mutation ($id: ID!, $userId: ID!, $isRead: Boolean) {
    toggleReadNotification(userId: $userId, id: $id, isRead: $isRead) {
      status
    }
  }
`;

export const Clear_Notification = gql`
  mutation ($userId: ID!) {
    ClearNotification(userId: $userId) {
      msg
    }
  }
`;

export const Clear_Fav = gql`
  mutation ($userId: ID!) {
    ClearFav(userId: $userId) {
      msg
      status
    }
  }
`;

export const Mark_All_as_Notification = gql`
  mutation ($userId: ID!) {
    MarkAllAsReadNotification(userId: $userId) {
      status
    }
  }
`;

export const Update_Profile_Img = gql`
  mutation ($image: Upload, $_id: ID) {
    updateUserImage(_id: $_id, image: $image) {
      status
      msg
    }
  }
`;

export const User_Added_Sub = gql`
  subscription NeWUser {
    NeWUser {
      _id
      email
      name
      createdAt
      lastLogIn
      role
    }
  }
`;

export const GET_NOTiFICATIONS = gql`
  query ($input: NotificationInput) {
    getNotifications(input: $input) {
      isRead
      createdAt
      content
      link
      _id
    }
  }
`;
