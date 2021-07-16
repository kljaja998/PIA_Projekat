"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Setting_1 = __importDefault(require("../models/Setting"));
class SettingsController {
    constructor() {
        this.getRentPercentage = (req, res) => {
            const name = "rentPercentage";
            Setting_1.default.findOne({ "name": name }, (err, setting) => {
                if (err)
                    console.log(err);
                else
                    res.json(setting);
            });
        };
        this.getBuyPercentage = (req, res) => {
            const name = "buyPercentage";
            Setting_1.default.findOne({ "name": name }, (err, setting) => {
                if (err)
                    console.log(err);
                else
                    res.json(setting);
            });
        };
        this.setRentPercentage = (req, res) => {
            const name = "rentPercentage";
            const value = req.body.value;
            //console.log("rentPercentage: "+value)
            Setting_1.default.updateOne({ "name": name }, { $set: { "value": Number(value) } }, (err, obj) => {
                if (err)
                    console.log(err);
                /*else
                    console.log(obj)*/
            });
            res.json({ message: "success" });
        };
        this.setBuyPercentage = (req, res) => {
            const name = "buyPercentage";
            const value = req.body.value;
            //console.log("buyPercentage: "+value)
            Setting_1.default.updateOne({ "name": name }, { $set: { "value": Number(value) } }, (err, obj) => {
                if (err)
                    console.log(err);
                /*else
                    console.log(obj)*/
            });
            res.json({ message: "success" });
        };
    }
}
exports.SettingsController = SettingsController;
//# sourceMappingURL=settings.controller.js.map