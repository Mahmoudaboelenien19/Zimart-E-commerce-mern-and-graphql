// export const backendRoute = "/";
// export const webSocketGraphQLRoute = `wss://zimart-3deh.onrender.com/graphql`;
export const backendRoute = "http://localhost:4000/";
export const webSocketGraphQLRoute = `ws://localhost:4000/graphql`;
export const graphQLRoute = `${backendRoute}graphql`;

export const newRefTokenRoute = `${backendRoute}token/auth/newRefToken`;

export const signUpWithGoogle = `${backendRoute}auth/signup/google`;
export const logInWithGoogle = `${backendRoute}auth/login/google`;
