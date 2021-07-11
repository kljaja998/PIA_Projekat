import express from 'express'
import { UploadedFile } from 'express-fileupload'
import RealEstate from '../models/RealEstate'

export class RealEstatesController{
    addRealEstate = (req:express.Request,res:express.Response)=>{
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
            owner:req.body.owner
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
}