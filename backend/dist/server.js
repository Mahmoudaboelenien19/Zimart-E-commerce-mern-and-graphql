"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_js_1 = require("./config.js");
const uploudRoute_js_1 = require("./Upload/uploudRoute.js");
const passport_1 = __importDefault(require("passport"));
require("./oAuth/google.js");
const googleAuth_js_1 = require("./routes/googleAuth.js");
const cookieSession = require("cookie-session");
const apollo_server_express_1 = require("apollo-server-express");
const ProductDefTypes_js_1 = require("./new Grapgql/typeDefs/ProductDefTypes.js");
const productResolver_js_1 = require("./new Grapgql/Resolvers/productResolver.js");
const orderType_js_1 = require("./new Grapgql/typeDefs/orderType.js");
const orderResolver_js_1 = require("./new Grapgql/Resolvers/orderResolver.js");
const userTypeDefs_js_1 = require("./new Grapgql/typeDefs/userTypeDefs.js");
const userResolver_js_1 = require("./new Grapgql/Resolvers/userResolver.js");
const graphql_middleware_1 = require("graphql-middleware");
const tokensRoutes_js_1 = require("./routes/tokensRoutes.js");
const permissions_js_1 = require("./new Grapgql/shield/permissions.js");
const blogResolver_js_1 = require("./new Grapgql/Resolvers/blogResolver.js");
const blogsType_js_1 = require("./new Grapgql/typeDefs/blogsType.js");
const context_js_1 = require("./new Grapgql/context.js");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const stripeType_js_1 = require("./new Grapgql/typeDefs/stripeType.js");
const stripeResolver_js_1 = require("./new Grapgql/Resolvers/stripeResolver.js");
const http_1 = require("http");
const apollo_server_core_1 = require("apollo-server-core");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
mongoose_1.default.connect(config_js_1.MongoDB_URL);
const app = (0, express_1.default)();
app.use(cookieSession({
    name: "session",
    keys: [config_js_1.SeSSion_Secret],
    maxAge: 24 * 60 * 60 * 100,
    // maxAge: 24 * 60,
}));
app.use(passport_1.default.initialize());
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.session());
app.use((0, cors_1.default)({
    credentials: true,
    // origin: `${Client_Url}/`, // deployment
    origin: `${config_js_1.Client_Url}`,
    methods: ["GET", "POST", "PATCH", "DELETE"],
}));
const schema = makeExecutableSchema({
    typeDefs: [
        ProductDefTypes_js_1.productTypeDefs,
        orderType_js_1.orderDefType,
        userTypeDefs_js_1.userTypeDefs,
        blogsType_js_1.BlogDefType,
        stripeType_js_1.StripeTypes,
    ],
    resolvers: [
        productResolver_js_1.productResolver,
        orderResolver_js_1.orderResolver,
        userResolver_js_1.userResolver,
        blogResolver_js_1.blogResolver,
        stripeResolver_js_1.stripeResolver,
    ],
});
const schemaWithPermissions = (0, graphql_middleware_1.applyMiddleware)(schema, permissions_js_1.permissions);
const httpServer = (0, http_1.createServer)(app);
const wsServer = new ws_1.WebSocketServer({
    server: httpServer,
    path: "/graphql",
});
const serverCleanup = (0, ws_2.useServer)({ schema: schemaWithPermissions }, wsServer);
app.use(express_1.default.json());
const server = new apollo_server_express_1.ApolloServer({
    schema: schemaWithPermissions,
    context: context_js_1.context,
    plugins: [
        (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
        {
            serverWillStart() {
                return __awaiter(this, void 0, void 0, function* () {
                    return {
                        drainServer() {
                            return __awaiter(this, void 0, void 0, function* () {
                                yield serverCleanup.dispose();
                            });
                        },
                    };
                });
            },
        },
    ],
});
// app.use(express.static(path.join(path.resolve(), "/react/dist")));
app.get("/cookie", (req, res) => {
    const { access_token, refresh_token, user_id } = req.cookies;
    res.json({ access_token, refresh_token, user_id });
});
app.use("/upload", uploudRoute_js_1.uploadRoute);
app.use("/", googleAuth_js_1.oAuthRouter);
app.use("/token", tokensRoutes_js_1.AuthRouter);
// app.get("*", (_, res) => {
//   res.sendFile(path.join(path.resolve(), "/react/dist/index.html"));
// });
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield server.start();
    server.applyMiddleware({
        app,
        cors: {
            credentials: true,
            methods: ["GET", "POST", "PATCH", "DELETE"],
            origin: config_js_1.Client_Url,
        },
    });
    httpServer.listen({ port: 3000 }, () => {
        console.log("server-runs");
    });
}))();
