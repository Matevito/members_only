const async = require("async");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

exports.messages_get = (req, res, next) => {
    res.render("index", {
        title: "Members Only",
        user: req.user,
    })
};

exports.create_get = (req, res, next) => {
    res.render("message_form", {
        title:"new message",
        user: req.user,
        errors: undefined
    })
}

exports.create_post = (req, res, next) => {
    res.send("todo")
}

exports.update_get = (req, res, next) => {
    res.send("todo")
}

exports.update_post = (req, res, next) => {
    res.send("todo")
}
