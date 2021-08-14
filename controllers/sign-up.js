const async = require("async");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.create_get = (req, res, next) => {
    res.render("sign-up", {
        title:"sign up",
        errors: undefined
    })
};

exports.create_post = [
    //validate and sanitize sign up foorm data
    body("username", "an Email is required.").trim().isLength({ min:1 }).escape(),
    body("first_name", "first name is required").trim().isLength({ min:1 }).escape(),
    body("second_name", "second name is required").trim().isLength({ min: 1}).escape(),
    body("password_1", "a password is required").trim().isLength({ min: 1}).escape(),
    body("password_2").custom((value, { req} ) => {
        // check password confirmation
        if (value !== req.body.password_1) {
            throw new Error("passwords do not match!");
        };

        //succes of the validator
        return true;
    }).escape(),

    // Procces request after sanitization of form data
    (req, res, next) => {

        // Check errors is form data
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            //THere are errors. Render the form again!
            res.render("sign-up", {
                title: "sign up",
                errors: errors.array()
            })
            return;
        }

        // Check if a user with the same username already exist!
        User.findOne({ "username": req.body.username })
            .exec( function(err, found_user) {
                if (err) { return next(err) }

                if (found_user) {
                    foundUser_error = [{
                        msg:"A user already exist with this e-mail.",
                    }];
                    res.render("sign-up", {
                        title: "sign up",
                        errors: foundUser_error,
                    })
                    return
                }

                // a user does not exist with the entered email, continue
                //hashing password
                const password = req.body.password_1;
                bcrypt.hash(password, 10, (err, hashedPassword) => {
                    if (err) {next (err) }
                    const user = new User({
                        username: req.body.username,
                        password: hashedPassword,
                        firstName: req.body.first_name,
                        secondName: req.body.second_name,
                    });
                    user.save(err => {
                        if (err) { return next (err) }
                        //saving succesfull
                        res.redirect("/");
                    })
                })
            }) 
    }
]