"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let MessageThread = new Schema({
    user1: {
        type: String
    },
    user2: {
        type: String
    },
    property: {
        type: String
    },
    messages: [{
            sender: String,
            message: String,
            time: String
        }],
    isArchived: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model("MessageThread", MessageThread, "Messages");
//# sourceMappingURL=MessageThread.js.map