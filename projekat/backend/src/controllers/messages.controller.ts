import express from 'express'
import MessageThread from '../models/MessageThread'

export class MessagesController{
    
    getThreadsForUser = (req:express.Request, res:express.Response)=>{
        let username = req.body.username
        MessageThread.find({$or:[{"user1":username},{"user2":username}]},
        (err,docs)=>{
            if(err)
                console.log(err)
            else
                res.json(docs)
        })
    }

    sendMessage = (req:express.Request, res:express.Response)=>{
        let username = req.body.username
        let user1 = req.body.user1
        let user2 = req.body.user2
        let property = req.body.property
        let message = req.body.message
        MessageThread.
        updateOne(
            {$and:[
                {user1:user1},
                {user2:user2},
                {property:property}
            ]},
            {$push: {
                messages: {
                    sender : username,
                    message : message,
                    time : Date.now()
                }
            },
             $set:{
                 isArchived: false
             }},{
                upsert:true
            },
            (err,doc)=>{
                if(err)
                    console.log(err)
            })
    }

    archiveThread = (req:express.Request, res:express.Response)=>{
        let user1 = req.body.user1
        let user2 = req.body.user2
        MessageThread.updateOne({$and:[{"user1":user1},{"user2":user2}]},
            {$set:{"isArchived":true}})
    }

    unarchiveThread = (req:express.Request, res:express.Response)=>{
        let user1 = req.body.user1
        let user2 = req.body.user2
        MessageThread.updateOne({$and:[{"user1":user1},{"user2":user2}]},
            {$set:{"isArchived":false}})
    }

}