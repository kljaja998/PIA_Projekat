import mongoose from 'mongoose'

const Schema = mongoose.Schema

let Offer = new Schema(
    {
        _id:{
            type: Schema.Types.ObjectId
        },
        user:{
            type: String
        },
        property_id:{
            type: String
        },
        owner:{
            type: String
        },
        ammount:{
            type: Number
        },
        status:{
            type: String
        }
    }
)

export default mongoose.model("Offer", Offer, "Offers")