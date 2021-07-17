"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const offers_controller_1 = require("../controllers/offers.controller");
const offersRouter = express_1.default.Router();
offersRouter.route('/sendOffer').post((req, res) => new offers_controller_1.OffersController().sendOffer(req, res));
offersRouter.route('/getOffersForProperty').post((req, res) => new offers_controller_1.OffersController().getOffersForProperty(req, res));
offersRouter.route('/getOffersForOwner').post((req, res) => new offers_controller_1.OffersController().getOffersForOwner(req, res));
offersRouter.route('/acceptOffer').post((req, res) => new offers_controller_1.OffersController().acceptOffer(req, res));
offersRouter.route('/rejectOffer').post((req, res) => new offers_controller_1.OffersController().rejectOffer(req, res));
offersRouter.route('/getOffersByUser').post((req, res) => new offers_controller_1.OffersController().getOffersByUser(req, res));
exports.default = offersRouter;
//# sourceMappingURL=offers.routes.js.map