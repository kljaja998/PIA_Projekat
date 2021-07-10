import {json} from 'express'
import express from 'express'
import fileUpload, { FileArray, UploadedFile } from 'express-fileupload';
import User from '../models/User';
import fs from "fs"

export class UserController{
    /*addUser = (req:express.Request, res:express.Response)=>{

    }*/

    
    
    registerUser = (req:express.Request, res:express.Response)=>{
        if(req.body.username=="agencija"){
            res.json({message:"error"})
        }
        //const data = req.body.data//JSON.parse(req.body.data)
        /*console.log("Register user!")
        if(req.files)
            console.log(req.files)
        console.log(req.body)*/

        //res.json({message:"ok"})

        User.findOne({
                $or:[{
                    email:req.body.email
                },{
                    username:req.body.username
                }]
        }).then(user=>{
            if(user){
                let errors ={
                    username:false,
                    email:false
                }
                if(user.toObject().username === req.body.username){
                    errors.username = true
                }
                if(user.toObject().email === req.body.email){
                    errors.email = true
                }
                return res.json({message:"error",errors:errors});
            } else {
                console.log("managed to register user : " + req.body.email +" " + req.body.username)
                console.log(req.files)
                console.log(req.body)
                let approved = req.body.approved=="true"?true:false
                let newUser
                if(req.files){
                    console.log("there is a picture!")
                    //TODO: Skini cast "as Uploaded File", pretvori u ovu proveru iz blok komentara ispod
                    /*
                    function getFooName(foo: Foo | Array<Foo>): Foo['name'] {
                        return (Array.isArray(foo) ? foo : [foo])[0].name
                    } ili
                    function getFooName(foo: Foo | Array<Foo>): Foo['name'] {
                        const [ { name } ] = Array.isArray(foo) ? foo : [foo];
                        return name
                    }
                    */
                    let profilePicture = req.files.profilePicture as UploadedFile
                    let picturePath = __dirname + `\\..\\assets\\profiles\\${req.body.username}\\${profilePicture.name}`
                    let profile_picture = `/assets/profiles/${req.body.username}/${profilePicture.name}`
                    profilePicture.mv(picturePath,(err)=>{
                        console.log(err)
                    })
                    console.log(profile_picture)
                    newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                        firstname: req.body.firstName,
                        lastname: req.body.lastName,
                        city: req.body.city,
                        country: req.body.country,
                        type: req.body.type,
                        profile_picture: profile_picture,
                        approved: approved
                    })

                } else{
                    console.log("no picture!")
                    newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                        firstname: req.body.firstName,
                        lastname: req.body.lastName,
                        city: req.body.city,
                        country: req.body.country,
                        type: req.body.type,
                        profile_picture: "",
                        approved: approved
                    })
                }
                newUser.save().then((doc)=>{
                    if(doc){
                        return res.json({message:"success"})
                    } else {
                        return res.json({message:"error"})
                    }
                })

                
                
                /*
                User.create(data);
                return res.status(200);*/
            }
        })
        
        

    }
    approveUser = (req:express.Request, res:express.Response)=>{
        let username = req.body.username;
        console.log("approve : "+username)

        User.collection.updateOne({'username':username},
        {$set:{"approved":true}})

        res.json({message:"ok"})
    }
    
    deleteUser = (req:express.Request, res:express.Response)=>{
        let username = req.body.username;
        console.log("delete : "+username)
        let path = __dirname + `\\..\\assets\\profiles\\${req.body.username}\\`
        fs.rm(path,{force:true,recursive:true},(err)=>{
            if(err)
                console.log(err)
        })
        User.collection.deleteOne({'username':username})
        res.json({message:"ok"})
    }

    emailCheck = (req:express.Request, res:express.Response)=>{
        let emailLog = req.body.email;
        console.log("email check: "+ emailLog)
        User.findOne({email:req.body.email}, (err,result)=>{
            if(err) console.log(err)
            if(result){
                res.json({message:"duplicate email"})
                console.log("duplicate email")
            }
            else{
                res.json({message:"email ok"})
                console.log("email ok")
            }
        })
    }

    usernameCheck = (req:express.Request, res:express.Response)=>{
        /*let usernameLog = req.body.username;
        console.log("username check: "+ usernameLog)*/
        if(req.body.username == "agencija"){
            res.json({message:"duplicate username"})
        }
        User.findOne({username:req.body.username}, (err,result)=>{
            if(err) console.log(err)
            if(result)
                res.json({message:"duplicate username"})
            else
                res.json({message:"username ok"})
        })
    }

    getUnapprovedUsers = (req:express.Request, res:express.Response)=>{
        User.find({approved:"false"},(err,users)=>{
            if(err) console.log(err)
            else res.json(users)
        })
    }

}