"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwErrorFunction = exports.GraphqlErrorTyps = void 0;
const graphql_1 = require("graphql");
exports.GraphqlErrorTyps = {
    Already_Found: { errorCode: "Already_Found", errorStatus: 401 },
};
const throwErrorFunction = (msg, type) => {
    throw new graphql_1.GraphQLError(msg, {
        //@ts-ignore
        extensions: {
            code: type.errorCode,
            http: {
                status: type.errorStatus,
            },
        },
    });
};
exports.throwErrorFunction = throwErrorFunction;
