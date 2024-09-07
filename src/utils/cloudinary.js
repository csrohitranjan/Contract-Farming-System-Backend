import dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const uploadOnCloudinary = async (localFilePath, fileName) => {
    if (!localFilePath) return null;

    try {
        const response = await cloudinary.uploader.upload(localFilePath, {
            folder: "addressProofs",
            resource_type: 'auto',
            public_id: fileName
        });
        return response;
    } catch (error) {
        console.log("File Upload Failed on Cloudinary:", error);
        return null;
    } finally {
        try {
            fs.unlinkSync(localFilePath);
            console.log("Local File Deleted Successfully");
        } catch (error) {
            console.log("Error Deleting Local File:", error);
        }
    }
};



export { uploadOnCloudinary };