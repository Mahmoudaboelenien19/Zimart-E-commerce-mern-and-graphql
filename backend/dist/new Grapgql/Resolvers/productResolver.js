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
const AddNotification_1 = require("../../lib/AddNotification");
exports.productResolver = {
    Query: {
        products(_, { limit, skip }) {
            return __awaiter(this, void 0, void 0, function* () {
                const data = yield product_js_1.default.aggregate([
                    { $sort: { createdAt: -1 } },
                    {
                        $group: {
                            _id: null,
                            count: { $sum: 1 },
                            products: { $push: "$$ROOT" },
                        },
                    },
                    {
                        $project: {
                            products: { $slice: ["$products", skip, limit] },
                            count: 1,
                            _id: 0,
                        },
                    },
                ]);
                const { count, products } = data[0];
                return { products, totalProducts: count };
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
                const { skip, limit = 12, sortTarget, sortType } = args.input;
                const sortOptions = {
                    [sortTarget]: sortType,
                };
                const data = yield product_js_1.default.aggregate([
                    { $sort: sortOptions },
                    {
                        $group: {
                            _id: null,
                            count: { $sum: 1 },
                            products: { $push: "$$ROOT" },
                        },
                    },
                    {
                        $project: {
                            products: { $slice: ["$products", skip, limit] },
                            count: 1,
                            _id: 0,
                        },
                    },
                ]);
                const { count, products } = data[0];
                return {
                    totalProducts: count,
                    products,
                };
            });
        },
        SortByRate(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const { skip, sortType, limit = 12 } = args.input;
                const data = yield product_js_1.default.aggregate([
                    {
                        $addFields: {
                            avgRate: { $avg: { $concatArrays: ["$rating", "$reviews.rate"] } },
                        },
                    },
                    { $sort: { avgRate: sortType } },
                    {
                        $group: {
                            _id: null,
                            count: { $sum: 1 },
                            products: { $push: "$$ROOT" },
                        },
                    },
                    {
                        $project: {
                            products: { $slice: ["$products", skip, limit] },
                            count: 1,
                            _id: 0,
                        },
                    },
                ]);
                const { count, products } = data[0];
                return { products, totalProducts: count };
            });
        },
        filterAllTypes(_, args) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { state, category, price, rate, skip, limit = 12 } = args.input;
                    const data = yield product_js_1.default.aggregate([
                        {
                            $addFields: {
                                avgRate: {
                                    $avg: { $concatArrays: ["$rating", "$reviews.rate"] } || 1,
                                },
                            },
                        },
                        {
                            $match: {
                                $or: [{ avgRate: { $lte: rate } }, { avgRate: null }],
                                price: { $lte: price },
                                category: { $in: category },
                                state: { $in: state },
                            },
                        },
                        {
                            $sort: {
                                createdAt: -1,
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                count: { $sum: 1 },
                                products: { $push: "$$ROOT" },
                            },
                        },
                        {
                            $project: {
                                products: { $slice: ["$products", skip, limit] },
                                count: 1,
                                _id: 0,
                            },
                        },
                    ]);
                    return {
                        products: (_a = data[0]) === null || _a === void 0 ? void 0 : _a.products,
                        totalProducts: (_b = data[0]) === null || _b === void 0 ? void 0 : _b.count,
                    };
                }
                catch (err) {
                    console.log(err.message);
                }
            });
        },
        searchProducts(_, args) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                const { word, skip, limit = 12 } = args;
                console.log({ word, skip, limit });
                const data = yield product_js_1.default.aggregate([
                    {
                        $match: {
                            $or: [
                                { category: { $regex: word, $options: "i" } },
                                { title: { $regex: word, $options: "i" } },
                            ],
                        },
                    },
                    {
                        $sort: {
                            createdAt: -1,
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            count: { $sum: 1 },
                            products: { $push: "$$ROOT" },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            count: 1,
                            products: { $slice: ["$products", skip, limit] },
                        },
                    },
                ]);
                console.log(data);
                return {
                    products: (_a = data[0]) === null || _a === void 0 ? void 0 : _a.products,
                    totalProducts: (_b = data[0]) === null || _b === void 0 ? void 0 : _b.count,
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
                    content: `${updatedProduct === null || updatedProduct === void 0 ? void 0 : updatedProduct.title.split(" ").slice(0, 5).join(" ")} is updated`,
                    link: `/product/${updatedProduct === null || updatedProduct === void 0 ? void 0 : updatedProduct._id}`,
                };
                (0, AddNotification_1.AddNotification)(notificationObj);
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
                            content: `${newProduct.title
                                .split(" ")
                                .slice(0, 5)
                                .join(" ")}  is Added`,
                            link: `/${newProduct._id}`,
                        };
                        (0, AddNotification_1.AddNotification)(notificationObj);
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
                    const { userId, rate, review, user } = input;
                    const data = yield product_js_1.default.findByIdAndUpdate(input._id, {
                        $push: { reviews: { userId, rate, review } },
                    });
                    const notificationObj = {
                        content: `${user} added a review on ${data === null || data === void 0 ? void 0 : data.title.split(" ").slice(0, 5).join(" ")}`,
                        link: `/product/${data === null || data === void 0 ? void 0 : data._id}`,
                    };
                    (0, AddNotification_1.AddNotification)(notificationObj);
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
                    const { rate, review, _id, userId } = input;
                    yield product_js_1.default.findOneAndUpdate({
                        _id,
                        "reviews.userId": userId,
                    }, {
                        $set: {
                            "reviews.$.rate": rate,
                            "reviews.$.review": review,
                        },
                    });
                    return { msg: "review updated successfully", status: 200 };
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
