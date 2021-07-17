"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const realestates_controller_1 = require("../controllers/realestates.controller");
const realEstateRouter = express_1.default.Router();
realEstateRouter.route('/getAllRealEstate').get((req, res) => new realestates_controller_1.RealEstatesController().getAllRealEstate(req, res));
realEstateRouter.route('/addRealEstate').post((req, res) => new realestates_controller_1.RealEstatesController().addRealEstate(req, res));
realEstateRouter.route('/getApprovedRealEstate').get((req, res) => new realestates_controller_1.RealEstatesController().getApprovedRealEstate(req, res));
realEstateRouter.route('/getUnapprovedRealEstate').get((req, res) => new realestates_controller_1.RealEstatesController().getUnapprovedRealEstate(req, res));
realEstateRouter.route('/approveRealEstate').post((req, res) => new realestates_controller_1.RealEstatesController().approveRealEstate(req, res));
realEstateRouter.route('/promoteRealEstate').post((req, res) => new realestates_controller_1.RealEstatesController().promoteRealEstate(req, res));
realEstateRouter.route('/unpromoteRealEstate').post((req, res) => new realestates_controller_1.RealEstatesController().unpromoteRealEstate(req, res));
realEstateRouter.route('/addRealEstate').post((req, res) => new realestates_controller_1.RealEstatesController().addRealEstate(req, res));
realEstateRouter.route('/incrementViews').post((req, res) => new realestates_controller_1.RealEstatesController().incrementViews(req, res));
exports.default = realEstateRouter;
//# sourceMappingURL=realestate.routes.js.map