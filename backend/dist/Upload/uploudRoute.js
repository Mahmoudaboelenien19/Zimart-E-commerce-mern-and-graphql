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
// import { upload } from "../middlewares/upload.js";
const product_js_1 = __importDefault(require("../mongoose/schema/product.js"));
const uploadProductImgs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    const images = [];
    if (((_a = req.files) === null || _a === void 0 ? void 0 : _a.length) && Array.isArray(req.files)) {
        req.files.map((fil) => {
            images.push({ productPath: fil.path, ProductName: fil.originalname });
        });
    }
    console.log(images);
    const result = yield product_js_1.default.findByIdAndUpdate(id, { images }, { returnDocument: "after" });
    res.json({ data: result, msg: "product added successfully" });
});
// export const uploadRoute = Router();
// uploadRoute.route("/:id").patch(upload.single("image"), updateUserImgFn);
// uploadRoute
// .route("/products/images/upload/:id")
// .patch(upload.array("images"), uploadProductImgs);
