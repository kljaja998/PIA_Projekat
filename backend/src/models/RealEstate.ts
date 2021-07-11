import mongoose from 'mongoose'

const Schema = mongoose.Schema

let RealEstate = new Schema(
    {
        name:{
            type:String
        },
        city:{
            type:String
        },
        municipality:{
            type:String
        },
        street:{
            type:String
        },
        street_no:{
            type:String
        },
        category:{
            type:String
        },
        area:{
            type:Number
        },
        floor:{
            type:String
        },
        room_no:{
            type:String
        },
        furnished:{
            type:String
        },
        gallery:[{
            type:String
        }],
        sale:{
            type:Boolean
        },
        price:{
            type:Number
        },
        owner:{
            type:String
        }
    }
)

export default mongoose.model("RealEstate", RealEstate, "RealEstates")