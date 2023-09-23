import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  from,
  ApolloLink,
  split,
} from "@apollo/client";

import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { createClient } from "graphql-ws";
import { setContext } from "apollo-link-context";
import { graphQLRoute, webSocketGraphQLRoute } from "./assets/routes.js";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
import { getnewAccess } from "./lib/getNewAccess";

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
  const { accessToken } = await getnewAccess();
  if (accessToken) {
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : null,
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
