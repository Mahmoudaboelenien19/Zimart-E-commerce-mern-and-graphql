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
exports.productResolver = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const product_js_1 = __importDefault(require("../../mongoose/schema/product.js"));
const context_js_1 = require("../context.js");
const user_js_1 = require("../../mongoose/schema/user.js");
exports.productResolver = {
    Query: {
        products() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield product_js_1.default.find({});
            });
        },
        product(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield product_js_1.default.findById(args.id);
            });
        },
    },
    Mutation: {
        filterByPrice(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                if (args.price === 1) {
                    return product_js_1.default.find({}).sort({ price: 1 });
                }
                else if (args.price === -1) {
                    return product_js_1.default.find({}).sort({ price: -1 });
                }
                else {
                    return product_js_1.default.find({ price: { $lte: args.price } });
                }
            });
        },
        filterByDate(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                if (args.date === 1) {
                    return product_js_1.default.find({}).sort({ createdAt: 1 });
                }
                else if (args.date === -1) {
                    return product_js_1.default.find({}).sort({ createdAt: -1 });
                }
            });
        },
        filterByRate(_, args) {
            return product_js_1.default.aggregate([
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        description: 1,
                        price: 1,
                        stock: 1,
                        category: 1,
                        state: 1,
                        images: 1,
                        rating: 1,
                        reviews: 1,
                        avgRate: { $avg: { $concatArrays: ["$rating", "$reviews.rate"] } },
                    },
                },
                { $sort: { avgRate: args.rate } },
            ]);
        },
        filterBycatageory(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return product_js_1.default.find({ category: args.category });
            });
        },
        filterByState(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return product_js_1.default.find({ state: args.state });
            });
        },
        filterAllTypes(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const data = yield product_js_1.default.aggregate([
                        {
                            $project: {
                                _id: 1,
                                title: 1,
                                description: 1,
                                price: 1,
                                stock: 1,
                                category: 1,
                                state: 1,
                                images: 1,
                                rating: 1,
                                reviews: 1,
                                avgRate: {
                                    $avg: { $concatArrays: ["$rating", "$reviews.rate"] } || 1,
                                },
                            },
                        },
                        {
                            $match: {
                                $or: [{ avgRate: { $lte: args.input.rate } }, { avgRate: null }],
                                price: { $lte: args.input.price },
                                category: { $in: args.input.category },
                                state: { $in: args.input.state },
                            },
                        },
                    ]);
                    return data;
                }
                catch (err) {
                    console.log(err.message);
                }
            });
        },
        searchProducts(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield product_js_1.default.find({
                    $or: [
                        { category: { $regex: args.word, $options: "i" } },
                        { title: { $regex: args.word, $options: "i" } },
                    ],
                });
            });
        },
        updateProduct(_, { input }) {
            return __awaiter(this, void 0, void 0, function* () {
                const updatedProduct = yield product_js_1.default.findByIdAndUpdate(input._id, input, { returnDocument: "after" });
                context_js_1.pubsub.publish("Product_Updated", {
                    productUpdated: updatedProduct,
                });
                const notificationObj = {
                    isRead: false,
                    content: `${updatedProduct === null || updatedProduct === void 0 ? void 0 : updatedProduct.title.split(" ").slice(0, 5).join(" ")} is updated`,
                    createdAt: new Date().toISOString(),
                    link: `/${updatedProduct === null || updatedProduct === void 0 ? void 0 : updatedProduct._id}`,
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
                return { msg: "product updated successfully", status: 200 };
            });
        },
        addNewProduct(_, { input }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const urls = yield Promise.all(input.images.map((f) => __awaiter(this, void 0, void 0, function* () {
                        const file = yield f.promise;
                        return new Promise((resolve, reject) => {
                            const stream = file.createReadStream();
                            const uploadStream = cloudinary_1.default.v2.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve({
                                        productPath: result.secure_url,
                                        productName: result.original_filename,
                                    });
                                }
                            });
                            stream.pipe(uploadStream);
                        });
                    })));
                    if (urls.length >= 1) {
                        const newProduct = yield product_js_1.default.create(Object.assign(Object.assign({}, input), { images: urls }));
                        context_js_1.pubsub.publish("Product_Added", {
                            productAdded: newProduct,
                        });
                        const notificationObj = {
                            isRead: false,
                            content: `${newProduct.title
                                .split(" ")
                                .slice(0, 5)
                                .join(" ")}  is Added`,
                            createdAt: new Date().toISOString(),
                            link: `/${newProduct._id}`,
                        };
                        const notification = yield user_js_1.userCollection.updateMany({ role: { $in: ["admin", "moderator", "owner", "user"] } }, {
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
                        return {
                            status: 200,
                            msg: "your product is successfully added",
                        };
                    }
                    else {
                        return { status: 404, msg: "Failed to upload images" };
                    }
                }
                catch (err) {
                    console.log(err);
                    return { status: 404, msg: "Failed to upload images" };
                }
            });
        },
        //reviews
        addReview(_, { input }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { userId, rate, review, image, user } = input;
                    const data = yield product_js_1.default.findByIdAndUpdate(input._id, {
                        $push: { reviews: { user, userId, rate, review, image } },
                    }, { projection: { reviews: { $slice: [-1, 1] } }, new: true });
                    const newReview = data.reviews[0];
                    newReview.msg = "review added";
                    newReview.status = 200;
                    console.log(data);
                    context_js_1.pubsub.publish("Product_Updated", {
                        productUpdated: data,
                    });
                    const notificationObj = {
                        isRead: false,
                        content: `${user} added a review on ${data === null || data === void 0 ? void 0 : data.title.split(" ").slice(0, 5).join(" ")}`,
                        createdAt: new Date().toISOString(),
                        link: `/${data === null || data === void 0 ? void 0 : data._id}`,
                    };
                    const notification = yield user_js_1.userCollection.updateMany({ role: { $in: ["admin", "moderator", "owner", "user"] } }, {
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
                    return newReview;
                }
                catch (err) {
                    return err.message;
                }
            });
        },
        updateReview(_, { input }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { rate, review } = input;
                    const data = yield product_js_1.default.findOneAndUpdate({
                        _id: input.productId,
                        "reviews.userId": input.userId,
                    }, {
                        $set: {
                            "reviews.$.rate": rate,
                            "reviews.$.review": review,
                        },
                    });
                    return { msg: "review updated successfully" };
                }
                catch (err) {
                    return err.message;
                }
            });
        },
    },
    Subscription: {
        productUpdated: {
            subscribe() {
                return __awaiter(this, void 0, void 0, function* () {
                    return context_js_1.pubsub.asyncIterator("Product_Updated");
                });
            },
        },
        productAdded: {
            subscribe() {
                return __awaiter(this, void 0, void 0, function* () {
                    return context_js_1.pubsub.asyncIterator("Product_Added");
                });
            },
        },
    },
};
