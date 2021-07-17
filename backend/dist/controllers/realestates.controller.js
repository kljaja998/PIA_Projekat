"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const RealEstate_1 = __importDefault(require("../models/RealEstate"));
const mongoose_1 = require("mongoose");
class RealEstatesController {
    constructor() {
        this.addRealEstate = (req, res) => {
            //console.log(req.body)
            //console.log(req.files)
            let isApproved = req.body.owner == 'agencija' ? true : false;
            let newRealEstate = new RealEstate_1.default({
                _id: new mongoose_1.Types.ObjectId(),
                name: req.body.name,
                city: req.body.city,
                municipality: req.body.municipality,
                street: req.body.street,
                street_no: req.body.street_no,
                category: req.body.category,
                area: req.body.area,
                floor: req.body.floor,
                room_no: req.body.room_no,
                furnished: req.body.furnished,
                gallery: [],
                sale: req.body.sale,
                price: req.body.price,
                owner: req.body.owner,
                isApproved: isApproved,
                isPromoted: false,
                views: 0
            });
            newRealEstate.save().then((doc) => {
                if (doc) {
                    let id = doc._id;
                    let files = req.files.media;
                    let mediaPath = __dirname + `\\..\\assets\\real_estates\\${id}\\`;
                    let mediaLinkPath = `/real_estates/${id}/`;
                    let mediaLinks = [];
                    for (let file of files) {
                        let filePath = mediaPath + file.name;
                        let fileLink = mediaLinkPath + file.name;
                        file.mv(filePath, (err) => {
                            console.log(err);
                        });
                        mediaLinks.push(fileLink);
                    }
                    RealEstate_1.default.update({ _id: id }, { $set: { gallery: mediaLinks } }).then((docres) => {
                        if (docres)
                            return res.json({ message: "success" });
                        else {
                            return res.json({ message: "error" });
                        }
                    });
                }
                else {
                    return res.json({ message: "error" });
                }
            });
        };
        this.getAllRealEstate = (req, res) => {
            RealEstate_1.default.find((err, docs) => {
                if (err)
                    console.log(err);
                else
                    res.json(docs);
            });
        };
        this.getUnapprovedRealEstate = (req, res) => {
            RealEstate_1.default.find({ isApproved: false }, (err, properties) => {
                if (err)
                    console.log(err);
                else
                    res.json(properties);
            });
        };
        this.getApprovedRealEstate = (req, res) => {
            RealEstate_1.default.find({ isApproved: true }, (err, properties) => {
                if (err)
                    console.log(err);
                else
                    res.json(properties);
            });
        };
        this.approveRealEstate = (req, res) => {
            let id = req.body.id;
            console.log("approve " + id);
            RealEstate_1.default.collection.updateOne({ '_id': mongoose_1.Types.ObjectId(id) }, { $set: { "isApproved": true } });
            res.json({ message: "ok" });
        };
        this.promoteRealEstate = (req, res) => {
            let id = req.body.id;
            console.log("promote " + id);
            RealEstate_1.default.collection.updateOne({ '_id': mongoose_1.Types.ObjectId(id) }, { $set: { "isPromoted": true } });
            res.json({ message: "success" });
        };
        this.unpromoteRealEstate = (req, res) => {
            let id = req.body.id;
            console.log("unpromote " + id);
            RealEstate_1.default.collection.updateOne({ '_id': mongoose_1.Types.ObjectId(id) }, { $set: { "isPromoted": false } });
            res.json({ message: "success" });
        };
        this.deleteRealEstate = (req, res) => {
            let id = req.body.id;
            console.log("delete " + id);
            let path = __dirname + `\\..\\assets\\real_estates\\${id}\\`;
            fs_1.default.rm(path, { force: true, recursive: true }, (err) => {
                if (err)
                    console.log(err);
            });
            RealEstate_1.default.collection.deleteOne({ '_id': mongoose_1.Types.ObjectId(id) });
            res.json({ message: "success" });
        };
        this.incrementViews = (req, res) => {
            //console.log("incrementViews")
            let id = req.body.id;
            //console.log("incrementViews: ",id)
            RealEstate_1.default.
                collection.
                updateOne({ '_id': mongoose_1.Types.ObjectId(id) }, { $inc: { "views": 1 } });
            res.json({ message: "success" });
        };
    }
}
exports.RealEstatesController = RealEstatesController;
//# sourceMappingURL=realestates.controller.js.map