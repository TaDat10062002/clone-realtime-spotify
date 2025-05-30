import { v2 as cloundinary } from "cloudinary";

import { config } from "dotenv";
config();

cloundinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
})

export default cloundinary;