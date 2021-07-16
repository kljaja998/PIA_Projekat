"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const settings_controller_1 = require("../controllers/settings.controller");
const settingsRouter = express_1.default.Router();
settingsRouter.route('/getRentPercentage').get((req, res) => new settings_controller_1.SettingsController().getRentPercentage(req, res));
settingsRouter.route('/getBuyPercentage').get((req, res) => new settings_controller_1.SettingsController().getBuyPercentage(req, res));
settingsRouter.route('/setBuyPercentage').post((req, res) => new settings_controller_1.SettingsController().setBuyPercentage(req, res));
settingsRouter.route('/setRentPercentage').post((req, res) => new settings_controller_1.SettingsController().setRentPercentage(req, res));
exports.default = settingsRouter;
//# sourceMappingURL=settings.routes.js.map