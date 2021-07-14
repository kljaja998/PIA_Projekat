import express from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = express.Router();

/*userRouter.route("/addUser").post(
    (req,res)=> new UserController().addUser(req,res)
)*/
userRouter.route("/registerUser").post(
    (req,res)=> new UserController().registerUser(req,res)
)
userRouter.route("/approveUser").post(
    (req,res)=> new UserController().approveUser(req,res)
)
userRouter.route("/deleteUser").post(
    (req,res)=> new UserController().deleteUser(req,res)
)
userRouter.route("/checkEmail").post(
    (req,res)=> new UserController().emailCheck(req,res)
)
userRouter.route("/checkUsername").post(
    (req,res)=> new UserController().usernameCheck(req,res)
)
userRouter.route("/getUnapprovedUsers").get(
    (req,res)=> new UserController().getUnapprovedUsers(req,res)
)
userRouter.route("/getApprovedUsers").get(
    (req,res)=> new UserController().getApprovedUsers(req,res)
)
userRouter.route("/blockUser").post(
    (req,res)=> new UserController().blockUser(req,res)
)
userRouter.route("/unblockUser").post(
    (req,res)=> new UserController().unblockUser(req,res)
)


userRouter.route("/isBlockedCheck").post(
    (req,res)=> new UserController().isBlockedCheck(req,res)
)

export default userRouter