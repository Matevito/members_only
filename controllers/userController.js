const async = require("async");
const { body, validationResult } = require("express-validator");
const passport = require("../passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.info_get = (req, res, next) => {
    res.render("info", {
        title:"user info",
        user:req.user
    })
}

exports.messages_get = (req, res, next) => {
    res.send("todo:")
}

exports.update_get = (req, res, next) => {
    res.render("info_update", {
        title:"user update",
        user: req.user,
        errors:undefined
    })
}

exports.update_post = [
    body("first_name", "first name required").trim().isLength( {min:1} ).escape(),
    body("second_name", "second name is required").trim().isLength( {min:1} ).escape(),
    body("membership", "membership value is required").trim().isLength( {min:1} ).escape(),
    body("c_password", "*").escape(),
    (req, res, next) => {
        let errors = validationResult(req);
        // error with new user-info data
        if (!errors.isEmpty()){
            res.render("info_update", {
                title: "user update",
                user: req.user,
                errors: errors.array()
            })
        }
        // wrong password
        const user_password = req.user.password
        const c_password = req.body.c_password;
        bcrypt.compare(c_password, user_password, (err, response) => {
            //passwords do not match
            if (!response) {
                errors = [{msg: "Wrong password!"}];
                res.render("info_update", {
                    title: "user update",
                    user: req.user,
                    errors: errors
                })
            } else {
                 //passwords match - update user info.
                const new_user  = new User({
                    _id: req.user._id,
                    username: req.user.username,
                    password: req.user.password,
                    firstName: req.body.first_name,
                    secondName: req.body.second_name,
                    membershipStatus: req.body.membership,
                })
                User.findByIdAndUpdate(req.user._id, new_user, {}, function(err, theUser){
                    if (err) { return next(err) }
                    res.redirect("/user/info")
                })
            }
        })

    }
]