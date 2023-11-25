import express, { Request } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { Client_Url, MongoDB_URL, SeSSion_Secret } from "./config.js";
import passport from "passport";
import "./oAuth/google.js";
import { oAuthRouter } from "./routes/googleAuth.js";
import cookieSession from "cookie-session";
import { ApolloServer } from "apollo-server-express";
import { productTypeDefs } from "./new Grapgql/typeDefs/ProductDefTypes.js";
import { productResolver } from "./new Grapgql/Resolvers/productResolver.js";
import { orderDefType } from "./new Grapgql/typeDefs/orderType.js";
import { orderResolver } from "./new Grapgql/Resolvers/orderResolver.js";
import "./middlewares/upload.js";
import { userTypeDefs } from "./new Grapgql/typeDefs/userTypeDefs.js";
import { userResolver } from "./new Grapgql/Resolvers/userResolver.js";
import { applyMiddleware } from "graphql-middleware";
import { AuthRouter } from "./routes/tokensRoutes.js";
import { permissions } from "./new Grapgql/shield/permissions.js";
import { blogResolver } from "./new Grapgql/Resolvers/blogResolver.js";
import { BlogDefType } from "./new Grapgql/typeDefs/blogsType.js";
import { context } from "./new Grapgql/context.js";
const { makeExecutableSchema } = require("@graphql-tools/schema");
import path from "path";
import { StripeTypes } from "./new Grapgql/typeDefs/stripeType.js";
import { stripeResolver } from "./new Grapgql/Resolvers/stripeResolver.js";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import * as graphqlUpload from "graphql-upload";

mongoose.connect(MongoDB_URL as unknown as string);

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: [SeSSion_Secret as unknown as string],
    // maxAge: 24 * 60 * 60 * 100,
    maxAge: 24 * 60,
  })
);
app.use(
  // @ts-ignore
  graphqlUpload.graphqlUploadExpress({
    maxFileSize: 10000000,
    maxFiles: 10,
  })
);
app.use(passport.initialize());
app.use(cookieParser());
app.use(passport.session());
app.use(
  cors({
    credentials: true,
    origin: `${Client_Url}`,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

const schema: any = makeExecutableSchema({
  typeDefs: [
    productTypeDefs,
    orderDefType,
    userTypeDefs,
    BlogDefType,
    StripeTypes,
  ],
  resolvers: [
    productResolver,
    orderResolver,
    userResolver,
    blogResolver,
    stripeResolver,
  ],
});

const schemaWithPermissions = applyMiddleware(schema, permissions);
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const serverCleanup = useServer({ schema: schemaWithPermissions }, wsServer);

app.use(express.json());

const server = new ApolloServer({
  schema: schemaWithPermissions,
  context,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),

    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

app.use(express.static(path.join(path.resolve(), "/react/dist")));
app.get("/cookie", (req: Request, res) => {
  const { access_token, refresh_token, user_id } = req.cookies;

  res.json({ access_token, refresh_token, user_id });
});
app.use("/", oAuthRouter);
app.use("/token", AuthRouter);

app.get("*", (_, res) => {
  res.sendFile(path.join(path.resolve(), "/react/dist/index.html"));
});

(async () => {
  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      methods: ["GET", "POST", "PATCH", "DELETE"],
      origin: Client_Url,
    },
  });

  httpServer.listen({ port: 4000 }, () => {
    console.log("server-runs");
  });
})();
