import { asynchHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Fileupload.js";
import ApiResponce from "../utils/ApiResponce.js";

const registerUser = asynchHandler(async (req, res, next) => {
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

  const { fullname, email, username, password } = req.body;

  console.log(`${email}`);

  // Validation

  if (
    [fullname, email, username, password].some((feild) => feild?.trim === "")
  ) {
    throw new ApiError(400, "all Feilds are required");
  }

  const existUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existUser) {
    throw new ApiError(400, "user Allready exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverLocalPath = req.files?.CoverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverimage = await uploadOnCloudinary(coverLocalPath);

  if (!avatar) throw new ApiError(400, "avatar file is required");

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverimage?.url || "",
    email,
    username: username.toLowerCase(),
    password,
  });

  const createdUser =  await User.findById(user._id).select(
    "-password -refreshtToken"
  )

  if(!createdUser){
    throw new ApiError(500, "Something went wrong while registring a user")
  }

  return  res.status(201).json(
  new ApiResponce(200, createdUser, "user registered succefully")
  )

});

export { registerUser };
