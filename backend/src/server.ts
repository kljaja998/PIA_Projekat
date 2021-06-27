import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from "path"
import authRouter from './routes/auth.routes';
import { environment } from './environments/environment';
import userRouter from './routes/user.routes';
import fileUpload from 'express-fileupload';



const app = express();
const assetsDir = path.join(__dirname, "assets")
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


app.use('/',router)
app.listen(environment.port, () => console.log(`Express server running on port ${environment.port}`));