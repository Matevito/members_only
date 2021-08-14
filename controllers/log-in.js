const async = require("async");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

exports.login_get = (req, res, next) => {
    res.render("log-in", {
        title:"log in"
    })
};

exports.login_post = (req, res, next) => {
    // code here
    res.send("todo")
};

exports.logout_get = (req, res, next) => {

};

exports.logout_post = (req, res, next) => {

};
