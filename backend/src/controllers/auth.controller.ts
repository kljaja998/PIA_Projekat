import {json, Request, Response} from 'express'
import express from 'express'
import User from '../models/User';


export class AuthController{
    login = (req: Request, res: Response) =>{
        let username = req.body.username;
        let password = req.body.password;
        console.log(username)
        console.log(password)


        User.findOne({'username': username, 'password': password},(err, user)=>{
            if(err) console.log(err);
            else{
                //TODO: Send auth token
                res.json(user);
            }
        })
    }
}