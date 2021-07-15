import express from 'express';
import { SettingsController } from '../controllers/settings.controller';



const settingsRouter = express.Router();

settingsRouter.route('/getRentPercentage').get(
    (req,res)=> new SettingsController().getRentPercentage(req, res)
)
settingsRouter.route('/getBuyPercentage').get(
    (req,res)=> new SettingsController().getBuyPercentage(req, res)
)
settingsRouter.route('/setBuyPercentage').post(
    (req,res)=> new SettingsController().setBuyPercentage(req,res)
)
settingsRouter.route('/setRentPercentage').post(
    (req,res)=> new SettingsController().setRentPercentage(req,res)
)


export default settingsRouter;