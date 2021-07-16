"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let RealEstate = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String
    },
    city: {
        type: String
    },
    municipality: {
        type: String
    },
    street: {
        type: String
    },
    street_no: {
        type: String
    },
    category: {
        type: String
    },
    area: {
        type: Number
    },
    floor: {
        type: String
    },
    room_no: {
        type: String
    },
    furnished: {
        type: String
    },
    gallery: [{
            type: String
        }],
    sale: {
        type: String
    },
    price: {
        type: Number
    },
    owner: {
        type: String
    },
    isApproved: {
        type: Boolean
    },
    isPromoted: {
        type: Boolean
    },
    views: {
        type: Number
    }
});
exports.default = mongoose_1.default.model("RealEstate", RealEstate, "RealEstates");
//# sourceMappingURL=RealEstate.js.map