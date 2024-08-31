import { Router } from "express";
import { loginUser, logOutUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleweare.js";
import { verify } from "jsonwebtoken";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name : "avatar",
            maxCount : 1
        },

        { 
            name:"coverImage",
            maxCount : 1, 
        }
    ]),
    registerUser
)


router.route("/login").post(loginUser)

// secured routes 

router.route("/logout").post( verify , logOutUser)

export default router
