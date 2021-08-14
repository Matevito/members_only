const async = require("async");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const User = require("../models/user");

exports.login_get = (req, res, next) => {
    res.render("log-in", {
        title:"log in"
    })
};

exports.login_post = (req, res, next) => {
    // code here
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })
};

exports.logout_get = (req, res, next) => {
    req.logout();
    res.redirect("/")
};

exports.logout_post = (req, res, next) => {
    // erase this
};
