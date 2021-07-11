import mongoose from 'mongoose'

const Schema = mongoose.Schema

let MessageThread = new Schema(
    {
        user1:{
            type: String
        },
        user2:{
            type: String
        },
        messages:[{
            sender: String,
            message: String
        }]
    }
)

export default mongoose.model("MessageThread", MessageThread, "Messages")