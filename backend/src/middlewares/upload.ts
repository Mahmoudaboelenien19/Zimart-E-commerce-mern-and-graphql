import cloudinary from "cloudinary";
import { API_KEY, API_SECRET, CLOUD_ACCESS } from "../config.js";

cloudinary.v2.config({
  cloud_name: CLOUD_ACCESS,
  api_key: API_KEY,
  api_secret: API_SECRET,
});
