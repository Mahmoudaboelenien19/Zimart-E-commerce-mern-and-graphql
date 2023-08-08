// export const backendRoute = "http://localhost:4000/";
export const backendRoute = "/";

export const newRefToken = `${backendRoute}token/auth/newRefToken`;
export const graphQLRoute = `${backendRoute}graphql`;
export const getStripePublicKeyRoute = () => `${backendRoute}stripe/getkey`;
export const StripeRoute = (userId: string) =>
  `${backendRoute}stripe/checkout/${userId}`;

export const uploadImagesRoute = (id: string) =>
  `${backendRoute}upload/products/images/upload/${id}`;

export const updateUserImg = (id: string) => `${backendRoute}upload/${id}`;
export const signUpWithGoogle = `${backendRoute}auth/signup/google`;
export const logInWithGoogle = `${backendRoute}auth/login/google`;
