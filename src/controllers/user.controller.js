import { asynchHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Fileupload.js";
import ApiResponce from "../utils/ApiResponce.js";

const genrateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = user.generateAccessToken();
    const accesToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accesToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "someThing went wrong while genrating refresh and access token"
    );
  }
};

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

  // Validation-

  if (
    [fullname, email, username, password].some((feild) => feild?.trim === "")
  ) {
    throw new ApiError(400, "all Feilds are required");
  }

  const existUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existUser) {
    throw new ApiError(400, "user Allready exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverLocalPath = req.files?.coverImage[0]?.path;
  let coverLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.lnegth > 0
  ) {
    coverLocalPath = req.files.coverImage[0].path;
  }
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

  const createdUser = await User.findById(user._id).select(
    "-password -refreshtToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registring a user");
  }

  return res
    .status(201)
    .json(new ApiResponce(200, createdUser, "user registered succefully"));
});

const loginUser = asynchHandler(async (req, res) => {
  // get the credentials from the user  = done
  // check if credentials are empty or invalid == done
  // throw propper errors if credentials are not validatae  = done
  // check user is exist in our database  = done
  // if user is not exist thrwo error = done
  // if user exist check password = done
  // genrate access and refresh token = done
  // send refresh token in database = done
  // send cookis =
  // return a response to the user

  const { email, username, password } = req.body;

  if (!username || email) {
    throw new ApiError(400, "username or password is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "user does not exist");
  }

  // your created mehtods are in your user not inside a User model,user Models contianes mongodb methods
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accesToken, refreshToken } = await genrateAccessAndRefreshTokens(
    user._id
  );

  const loggedInuser = await User.findById(user._id).select(
    "-password",
    "-refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accesToken", accesToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponce(
        200,
        {
          user: loggedInuser,
          accesToken,
          refreshToken,
        },

        "user Logged in succesfully"
      )
    );
});

const logOutUser = asynchHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },

    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accesToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponce(200, {}, "user Logged out succefully"));
});

export { registerUser, loginUser, logOutUser };
