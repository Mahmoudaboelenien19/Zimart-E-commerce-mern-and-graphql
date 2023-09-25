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
const product_js_1 = __importDefault(require("../../mongoose/schema/product.js"));
exports.userResolver = {
    Query: {
        users(_, { limit, skip }) {
            return __awaiter(this, void 0, void 0, function* () {
                const totalUsers = yield user_js_1.userCollection.find().count();
                const users = yield user_js_1.userCollection.find().limit(limit).skip(skip);
                return {
                    totalUsers,
                    users,
                };
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
    Cart: {
        product(par) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield product_js_1.default.findById(par.parentId);
            });
        },
    },
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
                const res = yield user_js_1.userCollection.create(Object.assign(Object.assign({}, input), { createdAt: new Date().toISOString(), image: input.image ||
                        "https://res.cloudinary.com/domobky11/image/upload/v1682383659/download_d2onbx.png", password: (0, hashPassword_js_1.hashPassword)(input.password), role: "user" }));
                context_js_1.pubsub.publish("User_Added", {
                    AddUser: res,
                });
                const notificationObj = {
                    isRead: false,
                    content: `${input.email} created a new account`,
                    createdAt: new Date().toISOString(),
                    link: "/dashboard/users",
                };
                yield user_js_1.userCollection.updateMany({ role: { $in: ["admin", "moderator", "owner", "user"] } }, {
                    $push: {
                        notifications: notificationObj,
                    },
                    $inc: {
                        notificationsCount: +1,
                    },
                });
                const newNotification = yield user_js_1.userCollection.findOne({ role: { $in: ["admin", "moderator", "owner", "user"] } }, {
                    notifications: { $slice: [-1, 1] },
                });
                context_js_1.pubsub.publish("Notification_Created", {
                    NotificationAdded: newNotification === null || newNotification === void 0 ? void 0 : newNotification.notifications[0],
                });
                return Object.assign(Object.assign({}, res), { status: 200, msg: "user created successfully" });
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
                            user: user[0],
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
        getUserData(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield user_js_1.userCollection.findById(args.id);
            });
        },
        addToCart: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield user_js_1.userCollection.findByIdAndUpdate(input.userId, {
                    $push: { cart: input },
                }, { new: true });
                return Object.assign(Object.assign({}, res), { msg: "successfully added to your cart" });
            }
            catch (err) {
                return err.message;
            }
        }),
        removeFromCart: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield user_js_1.userCollection.findByIdAndUpdate(input.userId, {
                    $pull: { cart: { productId: { $in: input.productId } } },
                }, { new: true });
                return { msg: "removed from your cart" };
            }
            catch (err) {
                return err.message;
            }
        }),
        changeCartCount: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield user_js_1.userCollection.findOneAndUpdate({
                    _id: input.userId,
                    "cart.productId": input.productId,
                }, {
                    $set: { "cart.$.count": input.count },
                }, { new: true });
                return { msg: "count successfully changed" };
            }
            catch (err) {
                return err.message;
            }
        }),
        addToCompare(_, { input }) {
            return __awaiter(this, void 0, void 0, function* () {
                const { productId, title } = input;
                const res = yield user_js_1.userCollection.findByIdAndUpdate(input.userId, {
                    $push: { compare: { productId, title } },
                }, { new: true });
                const newCompared = res.compare[res.compare.length - 1];
                newCompared.msg = "successfully added to your comparelist";
                return newCompared;
            });
        },
        removeFromCompare(_, { input }) {
            return __awaiter(this, void 0, void 0, function* () {
                const { productId } = input;
                const res = yield user_js_1.userCollection.findByIdAndUpdate(input.userId, {
                    $pull: { compare: { productId } },
                }, { new: true });
                return { msg: "successfully removed from your comparelist" };
            });
        },
        addToFav: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield user_js_1.userCollection.findByIdAndUpdate(input.userId, {
                    $push: { fav: input },
                }, { new: true });
                return Object.assign(Object.assign({}, res), { msg: "successfully added to your favorites" });
            }
            catch (err) {
                return err.message;
            }
        }),
        removeFromFav: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield user_js_1.userCollection.findByIdAndUpdate(input.userId, {
                    $pull: { fav: { productId: { $in: input.productId } } },
                }, { new: true });
                return { msg: "removed from your favorites" };
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
        updateUserName(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                yield user_js_1.userCollection.findByIdAndUpdate(args._id, { name: args.name });
                return { status: 200, msg: "username is successfully updated  " };
            });
        },
        updateUserCountry(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                yield user_js_1.userCollection.findByIdAndUpdate(args._id, {
                    country: args.country,
                });
                return { status: 200, msg: "your country  is successfully updated  " };
            });
        },
        updateUserPhone(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                yield user_js_1.userCollection.findByIdAndUpdate(args._id, { phone: args.phone });
                return { status: 200 };
            });
        },
        updateEmail(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const check = yield user_js_1.userCollection.find({ email: args.email });
                if (check.length) {
                    return { msg: "this email already used", status: 401 };
                }
                else {
                    yield user_js_1.userCollection.findByIdAndUpdate(args._id, {
                        email: args.email,
                    });
                    return { msg: "your email is updated successfully", status: 200 };
                }
            });
        },
        updatePassword(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield (0, authenticate_js_1.checkOldPass)(args._id, args.oldPassword);
                if (result) {
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
            });
        },
    },
    Subscription: {
        AddUser: {
            subscribe() {
                return __awaiter(this, void 0, void 0, function* () {
                    return context_js_1.pubsub.asyncIterator("User_Added");
                });
            },
        },
    },
};
