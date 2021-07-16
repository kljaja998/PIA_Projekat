"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageThread_1 = __importDefault(require("../models/MessageThread"));
class MessagesController {
    constructor() {
        this.getThreadsForUser = (req, res) => {
            let username = req.body.username;
            MessageThread_1.default.find({ $or: [{ "user1": username }, { "user2": username }] }, (err, docs) => {
                if (err)
                    console.log(err);
                else
                    res.json(docs);
            });
        };
        this.sendMessage = (req, res) => {
            let username = req.body.username;
            let user1 = req.body.user1;
            let user2 = req.body.user2;
            let property = req.body.property;
            let message = req.body.message;
            MessageThread_1.default.
                updateOne({ $and: [
                    { user1: user1 },
                    { user2: user2 },
                    { property: property }
                ] }, { $push: {
                    messages: {
                        sender: username,
                        message: message,
                        time: Date.now()
                    }
                },
                $set: {
                    isArchived: false
                } }, {
                upsert: true
            }, (err, doc) => {
                if (err)
                    console.log(err);
            });
        };
        this.archiveThread = (req, res) => {
            let user1 = req.body.user1;
            let user2 = req.body.user2;
            MessageThread_1.default.updateOne({ $and: [{ "user1": user1 }, { "user2": user2 }] }, { $set: { "isArchived": true } });
        };
        this.unarchiveThread = (req, res) => {
            let user1 = req.body.user1;
            let user2 = req.body.user2;
            MessageThread_1.default.updateOne({ $and: [{ "user1": user1 }, { "user2": user2 }] }, { $set: { "isArchived": false } });
        };
    }
}
exports.MessagesController = MessagesController;
//# sourceMappingURL=messages.controller.js.map