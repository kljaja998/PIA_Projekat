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
            message: String,
            time: String
        }],
        isArchived:{
            type: Boolean
        }
    }
)

export default mongoose.model("MessageThread", MessageThread, "Messages")