import express from 'express'
import { UploadedFile } from 'express-fileupload'
import  fs  from 'fs'
import RealEstate from '../models/RealEstate'
import { Types } from 'mongoose'

export class RealEstatesController{
    addRealEstate = (req:express.Request,res:express.Response)=>{
        //console.log(req.body)
        //console.log(req.files)
        
        let isApproved = req.body.owner == 'agencija' ? true : false
        let newRealEstate = new RealEstate({
            _id: new Types.ObjectId(),
            name:req.body.name,
            city:req.body.city,
            municipality:req.body.municipality,
            street:req.body.street,
            street_no:req.body.street_no,
            category:req.body.category,
            area:req.body.area,
            floor:req.body.floor,
            room_no:req.body.room_no,
            furnished:req.body.furnished,
            gallery:[],
            sale:req.body.sale,
            price:req.body.price,
            owner:req.body.owner,
            isApproved: isApproved,
            isPromoted: false,
            views: 0
        
        })
        newRealEstate.save().then((doc)=>{
            if(doc){
                let id = doc._id
                let files = req.files.media as UploadedFile[]
                let mediaPath = __dirname + `\\..\\assets\\real_estates\\${id}\\`
                let mediaLinkPath = `/real_estates/${id}/`
                let mediaLinks = []
                for (let file of files){
                    let filePath=mediaPath+file.name
                    let fileLink=mediaLinkPath+file.name
                    file.mv(filePath,(err)=>{
                        console.log(err)
                    })
                    mediaLinks.push(fileLink)
                }
                RealEstate.update({_id:id},{$set:{gallery:mediaLinks}}).then((docres)=>{
                    if(docres)
                        return res.json({message:"success"})
                    else{
                        return res.json({message:"error"})
                    }
                })
            } else{
                return res.json({message:"error"})
            }
        })
    }

    getAllRealEstate = (req:express.Request,res:express.Response)=>{
        RealEstate.find((err,docs)=>{
            if(err)
                console.log(err)
            else
                res.json(docs)
        })
    }

    getUnapprovedRealEstate = (req:express.Request,res:express.Response)=>{
        RealEstate.find({isApproved:false},(err,properties)=>{
            if(err) console.log(err)
            else res.json(properties)
        })
    }

    getApprovedRealEstate = (req:express.Request, res:express.Response)=>{
        RealEstate.find({isApproved:true},(err,properties)=>{
            if(err) console.log(err)
            else res.json(properties)
        })
    }

    approveRealEstate = (req:express.Request,res:express.Response)=>{
        let id = req.body.id
        console.log("approve "+id)
        RealEstate.collection.updateOne({'_id':Types.ObjectId(id)},
        {$set:{"isApproved":true}})
        res.json({message:"ok"})
    }

    promoteRealEstate = (req:express.Request,res:express.Response)=>{
        let id = req.body.id
        console.log("promote "+id)
        RealEstate.collection.updateOne({'_id':Types.ObjectId(id)},
        {$set:{"isPromoted":true}})
        res.json({message:"success"})
    }

    unpromoteRealEstate = (req:express.Request,res:express.Response)=>{
        let id = req.body.id
        console.log("unpromote "+id)
        RealEstate.collection.updateOne({'_id':Types.ObjectId(id)},
        {$set:{"isPromoted":false}})
        res.json({message:"success"})
    }

    deleteRealEstate = (req:express.Request,res:express.Response)=>{
        let id = req.body.id
        console.log("delete "+id)
        let path = __dirname + `\\..\\assets\\real_estates\\${id}\\`
        fs.rm(path,{force:true,recursive:true},(err)=>{
            if(err)
            console.log(err)
        })
        RealEstate.collection.deleteOne({'_id':Types.ObjectId(id)})
        res.json({message:"success"})
    }

    incrementViews = (req:express.Request,res:express.Response)=>{
        //console.log("incrementViews")
        let id = req.body.id
        //console.log("incrementViews: ",id)
        RealEstate.
            collection.
            updateOne(
                {'_id':Types.ObjectId(id)},
                {$inc:{"views":1}})
        res.json({message:"success"})
    }
}