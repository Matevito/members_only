const async = require("async");
const { body, validationResult } = require("express-validator");
const passport = require("../passport");
const User = require("../models/user");

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

exports.update_post = (req, res, next) => {
    res.send("todo")
}