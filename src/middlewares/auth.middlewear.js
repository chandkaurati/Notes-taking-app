import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asynchHandler } from "../utils/asynchandler";
import jwt from "jsonwebtoken";

export const verifyJWt = asynchHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accesToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "UnAuthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      // TODO: discuss about frond-end
      throw new ApiError(401, "invalid access token");
    }
    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(401, error?.messege || "invalid access token")
  }
});
