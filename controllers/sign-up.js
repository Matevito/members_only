const async = require("async");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

exports.create_get = (req, res, next) => {
    res.render("sign-up", {
        title:"sign up"
    })
};

exports.create_post = (req, res, next) => {
    // code here
    res.send("to do")
};
