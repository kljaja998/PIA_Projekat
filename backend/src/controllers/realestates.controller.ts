import express from 'express'
import { UploadedFile } from 'express-fileupload'
import  fs  from 'fs'
import RealEstate from '../models/RealEstate'

export class RealEstatesController{
    addRealEstate = (req:express.Request,res:express.Response)=>{
        let isApproved = req.body.owner == 'agencija' ? true : false
        let newRealEstate = new RealEstate({
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
            isApproved: isApproved
        })
        newRealEstate.save().then((doc)=>{
            if(doc){
                let id = doc.id
                let files = req.files.media as UploadedFile[]
                let mediaPath = __dirname + `\\..\\assets\\real_estates\\${id}\\`
                let mediaLinkPath = `/assets/real_estates/${id}/`
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
        RealEstate.collection.updateOne({'_id':id},
        {$set:{"isApproved":true}})
        res.json({message:"ok"})
    }

    promoteRealEstate = (req:express.Request,res:express.Response)=>{
        let id = req.body.id
        RealEstate.collection.updateOne({'_id':id},
        {$set:{"isPromoted":true}})
        res.json({message:"ok"})
    }

    unpromoteRealEstate = (req:express.Request,res:express.Response)=>{
        let id = req.body.id
        RealEstate.collection.updateOne({'_id':id},
        {$set:{"isPromoted":false}})
        res.json({message:"ok"})
    }

    deleteRealEstate = (req:express.Request,res:express.Response)=>{
        let id = req.body.id
        let path = __dirname + `\\..\\assets\\real_estates\\${id}\\`
        fs.rm(path,{force:true,recursive:true},(err)=>{
            if(err)
            console.log(err)
        })
        RealEstate.collection.deleteOne({'_id':id})
        res.json({message:"ok"})
    }

}