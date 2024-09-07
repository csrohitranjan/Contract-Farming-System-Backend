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
    console.log("FileName ", localFilePath)
    if (!localFilePath) return null;

    try {

        const response = await cloudinary.uploader.upload(localFilePath, {
            folder: "addressProofs",
            resource_type: 'auto',
            public_id: fileName
        });
        return response;
    } catch (error) {
        console.log("File upload failed on Cloudinary:", error);
        return null;
    } finally {
        // Always delete the local file regardless of success or failure
        try {
            fs.unlinkSync(localFilePath);
            console.log("Local file deleted successfully.");
        } catch (error) {
            console.log("Error deleting local file:", error);
        }
    }
};

export { uploadOnCloudinary };
