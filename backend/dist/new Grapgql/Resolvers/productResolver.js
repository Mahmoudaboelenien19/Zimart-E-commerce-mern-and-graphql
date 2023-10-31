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
const order_1 = require("../../mongoose/schema/order");
exports.productResolver = {
    Query: {
        products(_, { limit, skip }) {
            return __awaiter(this, void 0, void 0, function* () {
                //i run it in two queries as  count() is super fast so no need to use aggerate with facet as i use in AllFIlterType  && search
                const totalProducts = yield product_js_1.default.count();
                const products = yield product_js_1.default.find({}).skip(skip).limit(limit);
                return { products, totalProducts };
            });
        },
        product(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield product_js_1.default.findById(args.id);
            });
        },
        getDashBoardData(_, { id }) {
            return __awaiter(this, void 0, void 0, function* () {
                const orders = yield order_1.OrderCollection.find({}, { createdAt: 1, cost: 1 });
                const products = yield product_js_1.default.find({}, { createdAt: 1 });
                const users = yield user_js_1.userCollection.find({}, { createdAt: 1 });
                const notificationsCount = (yield user_js_1.userCollection.findById(id, {
                    notificationsCount: 1,
                    _id: 0,
                }));
                return {
                    orders,
                    products,
                    users,
                    notificationsCount: (notificationsCount === null || notificationsCount === void 0 ? void 0 : notificationsCount.notificationsCount) || 0,
                };
            });
        },
    },
    Mutation: {
        SortProducts(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const count = yield product_js_1.default.find({}).count();
                const { skip, limit, sortTarget, sortType } = args.input;
                const sortOptions = {
                    [sortTarget]: sortType,
                };
                const sortedProducts = yield product_js_1.default
                    .find({})
                    .sort(sortOptions)
                    .skip(skip)
                    .limit(limit);
                return {
                    totalProducts: count,
                    products: sortedProducts,
                };
            });
        },
        SortByRate(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const { skip, sortType, limit } = args.input;
                const totalProducts = yield product_js_1.default.find({}).count();
                const products = yield product_js_1.default.aggregate([
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
                    { $sort: { avgRate: sortType } },
                    { $skip: skip },
                    { $limit: limit },
                ]);
                return { products, totalProducts };
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
                        {
                            $facet: {
                                totalCount: [{ $count: "count" }],
                                products: [
                                    { $skip: args.input.skip },
                                    { $limit: 12 },
                                    { $group: { _id: null, products: { $push: "$$ROOT" } } },
                                ],
                            },
                        },
                    ]);
                    return {
                        products: data[0].products[0].products || [],
                        totalProducts: data[0].totalCount[0].count || 0,
                    };
                }
                catch (err) {
                    console.log(err.message);
                }
            });
        },
        searchProducts(_, args) {
            var _a, _b, _c, _d;
            return __awaiter(this, void 0, void 0, function* () {
                const data = yield product_js_1.default.aggregate([
                    {
                        $match: {
                            $or: [
                                { category: { $regex: args.word, $options: "i" } },
                                { title: { $regex: args.word, $options: "i" } },
                            ],
                        },
                    },
                    {
                        $facet: {
                            totalCount: [{ $count: "count" }],
                            products: [
                                { $skip: args.skip },
                                { $limit: 12 },
                                { $group: { _id: null, products: { $push: "$$ROOT" } } },
                            ],
                        },
                    },
                ]);
                return {
                    products: ((_b = (_a = data[0]) === null || _a === void 0 ? void 0 : _a.products[0]) === null || _b === void 0 ? void 0 : _b.products) || null,
                    totalProducts: ((_d = (_c = data[0]) === null || _c === void 0 ? void 0 : _c.totalCount[0]) === null || _d === void 0 ? void 0 : _d.count) || 0,
                };
            });
        },
        updateProduct(_, { input }) {
            return __awaiter(this, void 0, void 0, function* () {
                const updatedProduct = yield product_js_1.default.findByIdAndUpdate(input._id, input, { returnDocument: "after" });
                context_js_1.pubsub.publish("Product_Updated", {
                    productUpdated: updatedProduct,
                });
                context_js_1.pubsub.publish("Single_Product_Updated", {
                    singleProductUpdate: updatedProduct,
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
                    }, { new: true });
                    context_js_1.pubsub.publish("Product_Updated", {
                        productUpdated: data,
                    });
                    context_js_1.pubsub.publish("Single_Product_Updated", {
                        singleProductUpdate: data,
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
                    return { status: 200, msg: "review added successfully" };
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
                    const newReview = yield product_js_1.default.findOneAndUpdate({
                        _id: input.productId,
                        "reviews.userId": input.userId,
                    }, {
                        $set: {
                            "reviews.$.rate": rate,
                            "reviews.$.review": review,
                        },
                    }, { new: true });
                    context_js_1.pubsub.publish("Single_Product_Updated", {
                        singleProductUpdate: newReview,
                    });
                    context_js_1.pubsub.publish("Product_Updated", {
                        productUpdated: newReview,
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
        singleProductUpdate: {
            subscribe() {
                return __awaiter(this, void 0, void 0, function* () {
                    return context_js_1.pubsub.asyncIterator("Single_Product_Updated");
                });
            },
        },
    },
};
