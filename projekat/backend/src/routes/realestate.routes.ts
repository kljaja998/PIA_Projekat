import express from 'express';
import { RealEstatesController } from '../controllers/realestates.controller';



const realEstateRouter = express.Router();

realEstateRouter.route('/getAllRealEstate').get(
    (req,res)=> new RealEstatesController().getAllRealEstate(req, res)
)

realEstateRouter.route('/addRealEstate').post(
    (req,res)=> new RealEstatesController().addRealEstate(req, res)
)

realEstateRouter.route('/getApprovedRealEstate').get(
    (req,res)=> new RealEstatesController().getApprovedRealEstate(req, res)
)

realEstateRouter.route('/getUnapprovedRealEstate').get(
    (req,res)=> new RealEstatesController().getUnapprovedRealEstate(req, res)
)

realEstateRouter.route('/approveRealEstate').post(
    (req,res)=> new RealEstatesController().approveRealEstate(req, res)
)
realEstateRouter.route('/promoteRealEstate').post(
    (req,res)=> new RealEstatesController().promoteRealEstate(req, res)
)
realEstateRouter.route('/unpromoteRealEstate').post(
    (req,res)=> new RealEstatesController().unpromoteRealEstate(req, res)
)


realEstateRouter.route('/addRealEstate').post(
    (req,res)=> new RealEstatesController().addRealEstate(req, res)
)

realEstateRouter.route('/incrementViews').post(
    (req,res)=> new RealEstatesController().addRealEstate(req, res)
)

export default realEstateRouter;