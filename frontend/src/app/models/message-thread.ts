
export interface MessageThread{
    _id: String,
    user1: String,
    user2: String,
    messages: Array<{
        sender: String,
        message: String,
        time: String
    }>
}