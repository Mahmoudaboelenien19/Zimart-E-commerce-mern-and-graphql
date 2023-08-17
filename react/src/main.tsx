import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  from,
  ApolloLink,
  split,
} from "@apollo/client";

import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import axios from "axios";
import { createClient } from "graphql-ws";

import { setContext } from "apollo-link-context";
import {
  backendRoute,
  graphQLRoute,
  newRefToken,
  webSocketGraphQLRoute,
} from "./assets/routes.js";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";

const getrefToken = async () => {
  const {
    data: { refresh_token },
  } = await axios.get(`${backendRoute}cookie`, { withCredentials: true });
  return refresh_token;
};
export const getnewAccess = async () => {
  const refToken = await getrefToken();
  const {
    data: { accessToken },
  } = await axios.post(
    newRefToken,
    {
      refToken,
    },
    { withCredentials: true }
  );
  return accessToken;
};

const wsLink = new GraphQLWsLink(
  createClient({
    url: webSocketGraphQLRoute,
  })
);

// const httpLink = new HttpLink({ uri: graphQLRoute });

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  createUploadLink({ uri: graphQLRoute })
);
const middleware: unknown = setContext(async (_, { headers }) => {
  const token = await getnewAccess();
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    };
  }
});

const client = new ApolloClient({
  // uri: graphQLRoute,
  link: from([middleware as ApolloLink, splitLink]),
  cache: new InMemoryCache(),
  credentials: "include",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
