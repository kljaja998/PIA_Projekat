import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Setting = new Schema(
    {
        name:{
            type: String
        },
        value:{
            type: Number
        }
    }
)


export default mongoose.model("Setting", Setting, "Settings")