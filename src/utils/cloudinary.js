import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadFileOnCloudinary = async function(localFilePath)
{
    try {
        if(!localFilePath) return null

        const response = cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        //console.log("FILE UPLOAD SUCCESSFUL", response.url);
        //fs.unlinkSync(localFilePath)
        
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export {uploadFileOnCloudinary}