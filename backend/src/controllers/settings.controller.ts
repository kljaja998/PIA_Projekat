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
        //console.log("rentPercentage: "+value)
        Setting.updateOne({"name":name},
        {$set:{"value":Number(value)}},(err,obj)=>{
            if(err)
                console.log(err)
            /*else
                console.log(obj)*/
        })
        res.json({message:"success"})
    }
    setBuyPercentage = (req:Request,res:Response)=>{
        const name = "buyPercentage"
        const value = req.body.value
        //console.log("buyPercentage: "+value)
        Setting.updateOne({"name":name},
        {$set:{"value":Number(value)}},(err,obj)=>{
            if(err)
                console.log(err)
            /*else
                console.log(obj)*/
        })
        res.json({message:"success"})
    }

}