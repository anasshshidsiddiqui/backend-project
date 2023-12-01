import { Router } from "express";
import { registerUser } from "../Controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
const userRouter = Router()

userRouter.route("/register").post(
    upload.fields(
        {
            name: "Avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ),
    registerUser
    )

export default userRouter