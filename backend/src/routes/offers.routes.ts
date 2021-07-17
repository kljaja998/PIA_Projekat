import express from 'express'
import { OffersController } from '../controllers/offers.controller';


const offersRouter = express.Router();

offersRouter.route('/sendOffer').post(
    (req,res) => new OffersController().sendOffer(req,res)
)

offersRouter.route('/getOffersForProperty').post(
    (req,res) => new OffersController().getOffersForProperty(req,res)
)

offersRouter.route('/getOffersForOwner').post(
    (req,res) => new OffersController().getOffersForOwner(req,res)
)

offersRouter.route('/acceptOffer').post(
    (req,res) => new OffersController().acceptOffer(req,res)
)

offersRouter.route('/rejectOffer').post(
    (req,res) => new OffersController().rejectOffer(req,res)
)

offersRouter.route('/getOffersByUser').post(
    (req,res) => new OffersController().getOffersByUser(req,res)
)

export default offersRouter