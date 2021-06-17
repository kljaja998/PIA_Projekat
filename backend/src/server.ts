import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRouter from './routes/auth.routes';


const app = express();
app.use(cors())
app.use(bodyParser.json())


mongoose.connect("mongodb://localhost:27017/realestate");
const conn = mongoose.connection;
conn.once('open', ()=>{
    console.log("Connected to the database.")
})

const router = express.Router();
router.use('/auth', authRouter);


app.use('/',router)
app.listen(4000, () => console.log(`Express server running on port 4000`));