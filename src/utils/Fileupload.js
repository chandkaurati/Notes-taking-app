import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY ,
  api_secret: process.env.CLOUDINARY_API_SECRET ,
});


const uploadOnCloudinary = async(localFilepath)=>{
     try {
        if(uploadOnCloudinary) return null;
        // upload file on cloud
       const responce =   await  cloudinary.uploader.upload(localFilepath,{
            resource_type:'auto'

        })
        // file has been uploaded succefully
        console.log('file has been uploaded')
        console.log(responce.url)

        return responce 
     } catch (error) {
       fs.unlinkSync(localFilepath)
       //removed the locally saved temporary file as the upload operation failed
       return null;

     }
}


// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });


export {uploadOnCloudinary}

