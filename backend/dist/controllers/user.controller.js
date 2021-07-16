"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const fs_1 = __importDefault(require("fs"));
class UserController {
    constructor() {
        this.registerUser = (req, res) => {
            if (req.body.username == "agencija") {
                res.json({ message: "error" });
            }
            User_1.default.findOne({
                $or: [{
                        email: req.body.email
                    }, {
                        username: req.body.username
                    }]
            }).then(user => {
                if (user) {
                    let errors = {
                        username: false,
                        email: false
                    };
                    if (user.toObject().username === req.body.username) {
                        errors.username = true;
                    }
                    if (user.toObject().email === req.body.email) {
                        errors.email = true;
                    }
                    return res.json({ message: "error", errors: errors });
                }
                else {
                    console.log("managed to register user : " + req.body.email + " " + req.body.username);
                    console.log(req.files);
                    console.log(req.body);
                    let approved = req.body.approved == "true" ? true : false;
                    let newUser;
                    if (req.files) {
                        console.log("there is a picture!");
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
                        let profilePicture = req.files.profilePicture;
                        let picturePath = __dirname + `\\..\\assets\\profiles\\${req.body.username}\\${profilePicture.name}`;
                        let profile_picture = `/assets/profiles/${req.body.username}/${profilePicture.name}`;
                        profilePicture.mv(picturePath, (err) => {
                            console.log(err);
                        });
                        console.log(profile_picture);
                        newUser = new User_1.default({
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
                        });
                    }
                    else {
                        console.log("no picture!");
                        newUser = new User_1.default({
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
                        });
                    }
                    newUser.save().then((doc) => {
                        if (doc) {
                            return res.json({ message: "success" });
                        }
                        else {
                            return res.json({ message: "error" });
                        }
                    });
                    /*
                    User.create(data);
                    return res.status(200);*/
                }
            });
        };
        this.approveUser = (req, res) => {
            let username = req.body.username;
            console.log("approve : " + username);
            User_1.default.collection.updateOne({ 'username': username }, { $set: { "approved": true } });
            res.json({ message: "ok" });
        };
        this.deleteUser = (req, res) => {
            let username = req.body.username;
            console.log("delete : " + username);
            let path = __dirname + `\\..\\assets\\profiles\\${req.body.username}\\`;
            fs_1.default.rm(path, { force: true, recursive: true }, (err) => {
                if (err)
                    console.log(err);
            });
            User_1.default.collection.deleteOne({ 'username': username });
            res.json({ message: "ok" });
        };
        this.emailCheck = (req, res) => {
            let emailLog = req.body.email;
            console.log("email check: " + emailLog);
            User_1.default.findOne({ email: req.body.email }, (err, result) => {
                if (err)
                    console.log(err);
                if (result) {
                    res.json({ message: "duplicate email" });
                    console.log("duplicate email");
                }
                else {
                    res.json({ message: "email ok" });
                    console.log("email ok");
                }
            });
        };
        this.usernameCheck = (req, res) => {
            /*let usernameLog = req.body.username;
            console.log("username check: "+ usernameLog)*/
            if (req.body.username == "agencija") {
                res.json({ message: "duplicate username" });
            }
            User_1.default.findOne({ username: req.body.username }, (err, result) => {
                if (err)
                    console.log(err);
                if (result)
                    res.json({ message: "duplicate username" });
                else
                    res.json({ message: "username ok" });
            });
        };
        this.getUnapprovedUsers = (req, res) => {
            User_1.default.find({ approved: "false" }, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        this.getApprovedUsers = (req, res) => {
            User_1.default.find({ approved: "true" }, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        this.blockUser = (req, res) => {
            const blocker = req.body.blocker;
            const user = req.body.user;
            User_1.default.updateOne({ username: blocker }, { $addToSet: { blocked_users: user } });
            res.json({ message: "ok" });
        };
        this.unblockUser = (req, res) => {
            const blocker = req.body.blocker;
            const user = req.body.user;
            User_1.default.updateOne({ username: blocker }, { $pull: { blocked_users: user } });
            res.json({ message: "ok" });
        };
        this.isBlockedCheck = (req, res) => {
            const user1 = req.body.user1;
            const user2 = req.body.user2;
            User_1.default.findOne({ $or: [
                    { $and: [
                            { username: user1 },
                            { blocked_users: user2 }
                        ] },
                    { $and: [
                            { username: user2 },
                            { blocked_users: user1 }
                        ] }
                ] }, (err, user) => {
                if (err)
                    console.log(err);
                else if (user) {
                    res.json({ message: "blocked" });
                }
                else {
                    res.json({ message: "not blocked" });
                }
            });
        };
        this.editFirstName = (req, res) => {
            let username = req.body.username;
            let firstname = req.body.firstname;
            console.log("test:" + username + "test");
            User_1.default.
                findOneAndUpdate({ "username": username }, { $set: { "firstname": firstname } }, (err, doc) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "success" });
            });
        };
        this.editLastName = (req, res) => {
            let username = req.body.username;
            let lastname = req.body.lastname;
            User_1.default.
                findOneAndUpdate({ "username": username }, { $set: { "lastname": lastname } }, (err, doc) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "success" });
            });
        };
        this.editCity = (req, res) => {
            let username = req.body.username;
            let city = req.body.city;
            User_1.default.
                findOneAndUpdate({ "username": username }, { $set: { "city": city } }, (err, doc) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "success" });
            });
        };
        this.editCountry = (req, res) => {
            let username = req.body.username;
            let country = req.body.country;
            User_1.default.
                findOneAndUpdate({ "username": username }, { $set: { "country": country } }, (err, doc) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "success" });
            });
            res.json({ "message": "success" });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map