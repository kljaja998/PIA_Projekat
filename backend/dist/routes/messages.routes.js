"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messages_controller_1 = require("../controllers/messages.controller");
const messagesRouter = express_1.default.Router();
messagesRouter.route('/getThreadsForUser').post((req, res) => new messages_controller_1.MessagesController().getThreadsForUser(req, res));
messagesRouter.route('/sendMessage').post((req, res) => new messages_controller_1.MessagesController().sendMessage(req, res));
messagesRouter.route('/archiveThread').post((req, res) => new messages_controller_1.MessagesController().archiveThread(req, res));
messagesRouter.route('/unarchiveThread').post((req, res) => new messages_controller_1.MessagesController().unarchiveThread(req, res));
exports.default = messagesRouter;
//# sourceMappingURL=messages.routes.js.map