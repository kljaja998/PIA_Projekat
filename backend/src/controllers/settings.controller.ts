import { Request, Response } from "express"
import Setting from "../models/Setting"


export class SettingsController{

    getRentPercentage = (req:Request,res:Response)=>{
        const name = "rentPercentage"
        Setting.findOne({"name":name},(err,setting)=>{
            if(err) console.log(err)
            else res.json(setting)
        })
    }
    getBuyPercentage = (req:Request,res:Response)=>{
        const name = "buyPercentage"
        Setting.findOne({"name":name},(err,setting)=>{
            if(err) console.log(err)
            else res.json(setting)
        })
    }
    setRentPercentage = (req:Request,res:Response)=>{
        const name = "rentPercentage"
        const value = req.body.value
        Setting.updateOne({"name":name},
        {$set:{"value":true}})
        res.json({message:"success"})
    }
    setBuyPercentage = (req:Request,res:Response)=>{
        const name = "buyPercentage"
        const value = req.body.value
        Setting.updateOne({"name":name},
        {$set:{"value":true}})
        res.json({message:"success"})
    }

}