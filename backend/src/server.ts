import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from "path"
import authRouter from './routes/auth.routes';
import { environment } from './environments/environment';
import userRouter from './routes/user.routes';
import fileUpload from 'express-fileupload';
import settingsRouter from './routes/settings.routes';
import realEstateRouter from './routes/realestate.routes';
import offersRouter from './routes/offers.routes';



const app = express();
const assetsDir = path.join(__dirname, "assets")
console.log("assetsDir: "+assetsDir)
app.use(cors())
app.use(bodyParser.json())
app.use("/assets", express.static(assetsDir))
app.use(fileUpload({
    createParentPath:true
}))




mongoose.connect("mongodb://localhost:27017/realestate");
const conn = mongoose.connection;
conn.once('open', ()=>{
    console.log("Connected to the database.")
})

const router = express.Router();
router.use('/auth', authRouter);
router.use('/user', userRouter)
router.use('/settings', settingsRouter)
router.use('/real-estate', realEstateRouter)
router.use('/offers', offersRouter)


app.use('/',router)
app.listen(environment.port, () => console.log(`Express server running on port ${environment.port}`));