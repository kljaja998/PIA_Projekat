"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Offer_1 = __importDefault(require("../models/Offer"));
class OffersController {
    constructor() {
        this.sendOffer = (req, res) => {
            let user = req.body.user;
            let property_id = req.body.property_id;
            let owner = req.body.owner;
            let ammount = req.body.ammount;
            let status = 'Pending';
            let offer = new Offer_1.default({
                _id: new mongoose_1.Types.ObjectId(),
                user: user,
                property_id: property_id,
                owner: owner,
                ammount: ammount,
                status: status
            });
            offer.save().then(doc => {
                if (doc)
                    return res.json({ message: "success" });
                else
                    return res.json({ message: "error" });
            });
        };
        this.getOffersForProperty = (req, res) => {
            let property_id = req.body.property_id;
            Offer_1.default.find({ property_id: property_id }, (err, docs) => {
                if (err)
                    console.log(err);
                else
                    res.json(docs);
            });
        };
        this.getOffersForOwner = (req, res) => {
            let owner = req.body.owner;
            Offer_1.default.find({ owner: owner }, (err, docs) => {
                if (err)
                    console.log(err);
                else
                    res.json(docs);
            });
        };
        this.acceptOffer = (req, res) => {
            let id = req.body.id;
            let property_id = req.body.property_id;
            console.log('accept Offer:', id, property_id);
            Offer_1.default.updateOne({ _id: id }, { $set: { status: "Accepted" } }, (err) => {
                if (err)
                    console.log(err);
            });
            Offer_1.default.updateMany({ $and: [{ _id: { $ne: id } }, { property_id: property_id }] }, { $set: { status: "Rejected" } }, (err) => {
                if (err)
                    console.log(err);
            });
            res.json({ message: "success" });
        };
        this.rejectOffer = (req, res) => {
            let id = req.body.id;
            Offer_1.default.updateOne({ _id: id }, { $set: { status: "Rejected" } }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ message: "success" });
            });
        };
        this.getOffersByUser = (req, res) => {
            let user = req.body.user;
            console.log("getOffersByUser", user);
            Offer_1.default.find({ user: user }, (err, docs) => {
                if (err)
                    console.log(err);
                else
                    res.json(docs);
            });
        };
    }
}
exports.OffersController = OffersController;
//# sourceMappingURL=offers.controller.js.map