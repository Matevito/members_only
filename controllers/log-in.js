const async = require("async");
const { body, validationResult } = require("express-validator");
const passport = require("../passport");
const User = require("../models/user");

exports.login_get = (req, res, next) => {
    res.render("log-in", {
        title:"log in"
    })
};

exports.login_post =
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/log-in"
    }
);

exports.logout_get = (req, res, next) => {
    req.logout();
    res.redirect("/")
};

exports.logout_post = (req, res, next) => {
    // erase this
};
