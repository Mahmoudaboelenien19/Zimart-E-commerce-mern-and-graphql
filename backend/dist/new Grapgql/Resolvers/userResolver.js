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
exports.userResolver = void 0;
const graphql_upload_1 = __importDefault(require("graphql-upload"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("../../config.js");
const authenticate_js_1 = require("../../middlewares/authenticate.js");
const hashPassword_js_1 = require("../../middlewares/hashPassword.js");
const user_js_1 = require("../../mongoose/schema/user.js");
const context_js_1 = require("../context.js");
const mongodb_1 = require("mongodb");
const AddNotification_1 = require("../../lib/AddNotification");
const imgUrl = "https://res.cloudinary.com/domobky11/image/upload/v1682383659/download_d2onbx.png";
exports.userResolver = {
    Query: {
        users(_, { limit, skip }) {
            return __awaiter(this, void 0, void 0, function* () {
                const data = yield user_js_1.userCollection.aggregate([
                    {
                        $sort: {
                            createdAt: -1,
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            count: { $sum: 1 },
                            users: { $push: "$$ROOT" },
                        },
                    },
                    {
                        $project: {
                            users: { $slice: ["$users", skip, limit] },
                            count: 1,
                            _id: 0,
                        },
                    },
                ]);
                const { count, users } = data[0];
                return {
                    totalUsers: count,
                    users,
                };
            });
        },
        getNotifications(_, { input: { id, skip, limit, type }, }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const boolAr = type === "unread" ? [false] : [false, true];
                    const data = yield user_js_1.userCollection.aggregate([
                        {
                            $match: {
                                _id: new mongodb_1.ObjectId(id),
                            },
                        },
                        {
                            $project: {
                                notifications: 1,
                                _id: 0,
                            },
                        },
                        {
                            $unwind: "$notifications",
                        },
                        {
                            $match: {
                                "notifications.isRead": { $in: boolAr },
                            },
                        },
                        {
                            $sort: {
                                "notifications.createdAt": -1,
                            },
                        },
                        {
                            $skip: skip,
                        },
                        {
                            $limit: limit,
                        },
                        {
                            $group: {
                                _id: null,
                                notifications: { $push: "$notifications" },
                            },
                        },
                    ]);
                    return ((_a = data[0]) === null || _a === void 0 ? void 0 : _a.notifications) || [];
                }
                catch (er) {
                    console.log(er);
                }
            });
        },
        getUserData(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield user_js_1.userCollection.findById(args.id);
            });
        },
        getUserShopCollection(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { target, userId } = args.input;
                    const data = yield user_js_1.userCollection.aggregate([
                        { $match: { _id: new mongodb_1.ObjectId(userId) } },
                        {
                            $project: {
                                [target]: 1,
                            },
                        },
                        { $unwind: `$${target}` },
                        {
                            $lookup: {
                                from: "products",
                                localField: `${target}.id`,
                                foreignField: "_id",
                                as: `${target}.product`,
                            },
                        },
                        { $unwind: `$${target}.product` },
                        {
                            $group: {
                                _id: null,
                                data: { $push: `$${target}` },
                            },
                        },
                    ]);
                    console.log(data);
                    return data[0].data;
                }
                catch (error) {
                    console.log(error);
                }
            });
        },
    },
    Upload: graphql_upload_1.default,
    Review: {
        userData(par) {
            return __awaiter(this, void 0, void 0, function* () {
                return ((yield user_js_1.userCollection.findById(par.userId)) || {
                    name: null,
                    image: null,
                });
            });
        },
    },
    // Cart: {
    //   async product(par: { id: string }) {
    //     console.log("cart resolver worked");
    //     const res = await productCollection.findById(par.id);
    //     console.log({ res });
    //     return res;
    //   },
    // },
    Mutation: {
        addUser: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            const check = yield user_js_1.userCollection.find({ email: input.email });
            if (check.length > 0) {
                return {
                    status: 401,
                    email: input.email,
                    msg: "this email has registered",
                };
            }
            else {
                const newUser = yield user_js_1.userCollection.create(Object.assign(Object.assign({}, input), { createdAt: new Date().toISOString(), image: input.image || imgUrl, password: (0, hashPassword_js_1.hashPassword)(input.password) }));
                context_js_1.pubsub.publish("NEW_USER", {
                    NeWUser: newUser,
                });
                const notificationObj = {
                    content: `${input.email} created a new account`,
                    link: "/dashboard/users",
                };
                (0, AddNotification_1.AddNotification)(notificationObj);
                return { status: 200, msg: "user created successfully" };
            }
        }),
        authenticate: (_, args, { res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, authenticate_js_1.authenticateMiddleware)(args.email, args.password);
                if (Array.isArray(user)) {
                    if ((user === null || user === void 0 ? void 0 : user.length) >= 1) {
                        const accessToken = jsonwebtoken_1.default.sign({ email: args.email, id: user[0]._id }, config_js_1.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
                        const refToken = jsonwebtoken_1.default.sign({ email: args.email, id: user[0]._id }, config_js_1.REFRESH_TOKEN_SECRET);
                        const id = user[0]._id.toString();
                        res.cookie("access_token", accessToken, {
                            httpOnly: true,
                            secure: true,
                        });
                        res.cookie("refresh_token", refToken, {
                            httpOnly: true,
                            secure: true,
                        });
                        return {
                            msg: "you successfully logged in",
                            status: 200,
                            id,
                        };
                    }
                }
                else if (!user) {
                    return { msg: "password is wrong", status: 404 };
                }
                else {
                    return { msg: user };
                }
            }
            catch (err) {
                return err.message;
            }
        }),
        changeCartCount: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { userId, productId, count } = input;
                console.log("chnage worked");
                console.log({ userId, productId, count });
                yield user_js_1.userCollection.findOneAndUpdate({
                    _id: input.userId,
                    "cart.id": input.productId,
                }, {
                    $set: { "cart.$.count": input.count },
                });
                return { msg: "count successfully changed" };
            }
            catch (err) {
                return err.message;
            }
        }),
        addToShoppingCollection: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id, userId, target } = args.input;
                console.log({ id, userId, target });
                const res = yield user_js_1.userCollection.findByIdAndUpdate(userId, {
                    $push: { [target]: { id } },
                });
                const msg = target === "fav" ? "wishlist" : target;
                return { msg: `successfully added to your ${msg}`, status: 200 };
            }
            catch (err) {
                return err.message;
            }
        }),
        removeFromShoppingCollection: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id, userId, target } = args.input;
                yield user_js_1.userCollection.findByIdAndUpdate(userId, {
                    $pull: { [target]: { id } },
                });
                const msg = target === "fav" ? "wishlist" : target;
                return { msg: `removed from your ${msg}`, status: 200 };
            }
            catch (err) {
                return err.message;
            }
        }),
        updateUserRole: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield user_js_1.userCollection.findByIdAndUpdate(args._id, { role: args.role });
                return { msg: `now ,user role is ${args.role}` };
            }
            catch (err) {
                return err.message;
            }
        }),
        logOut(_, args, { res }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield user_js_1.userCollection.findByIdAndUpdate(args._id, {
                    lastLogIn: args.lastLogIn,
                });
                res.clearCookie("access_token", { httpOnly: true });
                res.clearCookie("user_id", { httpOnly: true });
                res.clearCookie("refresh_token", { httpOnly: true });
                res.clearCookie("user_email", { httpOnly: true });
                return { msg: "you successfully signed out", status: 200 };
            });
        },
        resetNotificationCount(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                yield user_js_1.userCollection.findByIdAndUpdate(args.id, {
                    notificationsCount: 0,
                });
                return { msg: "done" };
            });
        },
        deleteNotification(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                yield user_js_1.userCollection.findByIdAndUpdate(args.userId, {
                    $pull: {
                        notifications: { _id: args.id },
                    },
                });
                return { msg: "notification is successfully deleted" };
            });
        },
        toggleReadNotification(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                yield user_js_1.userCollection.findOneAndUpdate({ _id: args.userId, "notifications._id": args.id }, { $set: { "notifications.$.isRead": args.isRead } });
                return { status: 200 };
            });
        },
        ClearNotification(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                yield user_js_1.userCollection.findByIdAndUpdate(args.userId, {
                    notifications: [],
                });
                return { msg: "Notifications are successfull cleared " };
            });
        },
        ClearFav(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                yield user_js_1.userCollection.findByIdAndUpdate(args.userId, {
                    fav: [],
                });
                return { msg: "your wishlist is successfully cleared ", status: 200 };
            });
        },
        MarkAllAsReadNotification(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                yield user_js_1.userCollection.findByIdAndUpdate(args.userId, {
                    "notifications.$[].isRead": true,
                });
                return { status: 200 };
            });
        },
        updateUserData(_, { input: { _id, target, value } }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (target != "email") {
                        const res = yield user_js_1.userCollection.findByIdAndUpdate(_id, {
                            [target]: value,
                        });
                        return { status: 200, msg: "data is updated successfully" };
                    }
                    else if (target === "email") {
                        const check = yield user_js_1.userCollection.find({ email: value });
                        if (check.length) {
                            return { msg: "this email already used", status: 401 };
                        }
                        else {
                            yield user_js_1.userCollection.findByIdAndUpdate(_id, {
                                email: value,
                            });
                            return { msg: "your email is updated successfully", status: 200 };
                        }
                    }
                    return null;
                }
                catch (err) {
                    console.log(err);
                }
            });
        },
        updatePassword(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield (0, authenticate_js_1.checkOldPass)(args._id, args.oldPassword);
                if (result) {
                    console.log({ result });
                    yield user_js_1.userCollection.findByIdAndUpdate(args._id, {
                        password: (0, hashPassword_js_1.hashPassword)(args.newPassword),
                    });
                    return { msg: "your password successfully updated", status: 200 };
                }
                else {
                    return { msg: "enter your correct old password", status: 404 };
                }
            });
        },
        updateUserImage(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield new Promise((resolve, reject) => {
                        const stream = args.image.file.createReadStream();
                        const uploadStream = cloudinary_1.default.v2.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
                            if (error) {
                                reject(error);
                            }
                            else {
                                resolve(result);
                            }
                        });
                        stream.pipe(uploadStream);
                    });
                    const url = result.secure_url;
                    if (url) {
                        yield user_js_1.userCollection.findByIdAndUpdate(args._id, {
                            image: url,
                        });
                        return { status: 200, msg: "you profile successfully updated" };
                    }
                    else {
                        return { status: 404, msg: "faild to upload" };
                    }
                }
                catch (err) {
                    console.log(err);
                }
            });
        },
    },
    Subscription: {
        NeWUser: {
            subscribe() {
                return __awaiter(this, void 0, void 0, function* () {
                    return context_js_1.pubsub.asyncIterator("NEW_USER");
                });
            },
        },
    },
};
