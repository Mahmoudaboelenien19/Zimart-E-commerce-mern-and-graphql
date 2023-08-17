"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const config_js_1 = require("../config.js");
cloudinary_1.default.v2.config({
    cloud_name: config_js_1.CLOUD_ACCESS,
    api_key: config_js_1.API_KEY,
    api_secret: config_js_1.API_SECRET,
});
