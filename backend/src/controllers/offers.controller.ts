import express from 'express'
import { Types } from 'mongoose'
import Offer from '../models/Offer'

export class OffersController{
    sendOffer = (req:express.Request,res:express.Response)=>{
        let user = req.body.user
        let property_id = req.body.property_id
        let owner = req.body.owner
        let ammount = req.body.ammount
        let status = 'Pending'

        let offer = new Offer({
            _id: new Types.ObjectId(),
            user:user,
            property_id:property_id,
            owner:owner,
            ammount:ammount,
            status:status
        })
        offer.save().then(doc=>{
            if(doc)
                return res.json({message:"success"})
            else
                return res.json({message:"error"})
        })
    }

    getOffersForProperty = (req:express.Request, res:express.Response)=>{
        let property_id = req.body.property_id
        Offer.find({property_id:property_id},(err,docs)=>{
            if(err) console.log(err)
            else res.json(docs)
        })
    }

    getOffersForOwner = (req:express.Request, res:express.Response)=>{
        let owner = req.body.owner
        Offer.find({owner:owner},(err,docs)=>{
            if(err) console.log(err)
            else res.json(docs)
        })
    }
    
    acceptOffer = (req:express.Request, res:express.Response)=>{
        let id = req.body.id
        let property_id = req.body.property_id
        console.log('accept Offer:',id,property_id)
        Offer.updateOne(
            {_id:id},
            {$set:{status:"Accepted"}},
            (err)=>{
                if(err)
                    console.log(err)
            }
        )
        Offer.updateMany(
            {$and:[{_id:{$ne:id}},{property_id:property_id}]},
            {$set:{status:"Rejected"}},
            (err)=>{
                if(err)
                    console.log(err)
            }
        )
        res.json({message:"success"})
    }
    
    rejectOffer = (req:express.Request, res:express.Response)=>{
        let id = req.body.id
        Offer.updateOne(
            {_id:id},
            {$set:{status:"Rejected"}},(err)=>{
                if(err)
                    console.log(err)
                else
                    res.json({message:"success"})
            }
        )
    }

    getOffersByUser = (req:express.Request, res:express.Response)=>{
        let user = req.body.user
        console.log("getOffersByUser",user)
        Offer.find(
            {user:user},
            (err,docs)=>{
                if(err)
                    console.log(err)
                else
                    res.json(docs)
            }
        )
    }

}