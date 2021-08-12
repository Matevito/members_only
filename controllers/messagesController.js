const async = require("async");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

exports.messages_get = (req, res, next) => {
    res.render("index", {
        title: "Members Only"
    })
};