"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Offer = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    user: {
        type: String
    },
    property_id: {
        type: String
    },
    owner: {
        type: String
    },
    ammount: {
        type: Number
    },
    status: {
        type: String
    }
});
exports.default = mongoose_1.default.model("Offer", Offer, "Offers");
//# sourceMappingURL=Offer.js.map