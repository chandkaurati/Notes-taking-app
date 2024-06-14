 import { asynchHandler } from "../utils/asynchandler.js";
 import { ApiError } from "../utils/ApiError.js";
 import { User } from "../models/user.model.js";

const registerUser = asynchHandler(async (req,res,next)=>{
    // Get user details from front-end  == done
    // Validation  - not Empty 
    // Check if user is already: username, email 
    // check for images , check for avatar
    // upload them to cloudnery, check if avatar uploaded successfully
    // create userObject - create entry in Database
    // remove password and refresh token feils from responce    
    // check if user created scuccesfully     
    // return responce
    // data will come form URL or From 
    // if data is comes form the inpur form or direct json object then we can extract it form the req.body 

    const {fullname, email, username, password } = req.body

    console.log(`${email}`)

    // Validation

    if(
     [fullname, email, username, password].some((feild)=> feild?.trim === "")
    ){
      throw new ApiError(400, "all Feilds are required")
    }

    const existUser =  User.findOne({
        $or : [ { username }, { email } ]
    })

    if(existUser){
         throw new ApiError(400, "user Allready exists" )
    }
})

export {registerUser}