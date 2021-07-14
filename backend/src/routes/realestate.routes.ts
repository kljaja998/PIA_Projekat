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

export default realEstateRouter;