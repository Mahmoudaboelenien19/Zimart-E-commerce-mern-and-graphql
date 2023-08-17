// export const backendRoute = "/";
export const backendRoute = "http://localhost:3000/";
export const graphQLRoute = `${backendRoute}graphql`;
export const webSocketGraphQLRoute = `ws://localhost:3000/graphql`;

export const newRefToken = `${backendRoute}token/auth/newRefToken`;

export const uploadImagesRoute = (id: string) =>
  `${backendRoute}upload/products/images/upload/${id}`;

export const signUpWithGoogle = `${backendRoute}auth/signup/google`;
export const logInWithGoogle = `${backendRoute}auth/login/google`;
