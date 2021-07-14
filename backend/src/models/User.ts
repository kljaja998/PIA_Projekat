import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema(
    {
        username:{
            type: String
        },
        password: {
            type: String
        },
        firstname: {
            type: String
        },
        lastname:{
            type: String
        },
        email: {
            type: String
        },
        type: {
            type: String
        },
        profile_picture: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        },
        blocked_users: {
            type: Array
        },
        approved: {
            type: Boolean
        }
    }
)


export default mongoose.model("User", User, "Users")