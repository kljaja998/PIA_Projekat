"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
/*userRouter.route("/addUser").post(
    (req,res)=> new UserController().addUser(req,res)
)*/
userRouter.route("/registerUser").post((req, res) => new user_controller_1.UserController().registerUser(req, res));
userRouter.route("/approveUser").post((req, res) => new user_controller_1.UserController().approveUser(req, res));
userRouter.route("/deleteUser").post((req, res) => new user_controller_1.UserController().deleteUser(req, res));
userRouter.route("/checkEmail").post((req, res) => new user_controller_1.UserController().emailCheck(req, res));
userRouter.route("/checkUsername").post((req, res) => new user_controller_1.UserController().usernameCheck(req, res));
userRouter.route("/getUnapprovedUsers").get((req, res) => new user_controller_1.UserController().getUnapprovedUsers(req, res));
userRouter.route("/getApprovedUsers").get((req, res) => new user_controller_1.UserController().getApprovedUsers(req, res));
userRouter.route("/blockUser").post((req, res) => new user_controller_1.UserController().blockUser(req, res));
userRouter.route("/unblockUser").post((req, res) => new user_controller_1.UserController().unblockUser(req, res));
userRouter.route("/isBlockedCheck").post((req, res) => new user_controller_1.UserController().isBlockedCheck(req, res));
userRouter.route("/editFirstName").post((req, res) => new user_controller_1.UserController().editFirstName(req, res));
userRouter.route("/editLastName").post((req, res) => new user_controller_1.UserController().editLastName(req, res));
userRouter.route("/editCity").post((req, res) => new user_controller_1.UserController().editCity(req, res));
userRouter.route("/editCountry").post((req, res) => new user_controller_1.UserController().editCountry(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map