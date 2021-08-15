const async = require("async");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const Message = require("../models/messages");

exports.messages_get = (req, res, next) => {
    Message.find().populate("author", ["firstName", "secondName"]).exec((err, messages_list) => {
        if (err) {return next(err)};

        //Messages found, render the view
        res.render("index", {
            title:"Members Only",
            user:req.user,
            messages: messages_list
        })
    })
};

exports.create_get = (req, res, next) => {
    res.render("message_form", {
        title:"new message",
        user: req.user,
        errors: undefined,
        message: undefined,
    })
}

exports.create_post = [
    // sanitize message form data
    body("title", "A title is required").trim().isLength({ min:1}).escape(),
    body("message", "A message cannot be blank!").trim().isLength({ min:1 }).escape(),
    
    // proccess the request
    (req, res, next) => {

        const errors  = validationResult(req);
        if(!errors.isEmpty()) {
            // There are error, redirect to message_form path
            res.render("message_form", {
                title:"new message",
                user:req.user,
                errors:undefined,
                message:undefined,
            })
        };

        // Create message object
        const new_message = new Message({
            title: req.body.title,
            text: req.body.message,
            author: req.user._id,
            timestamp: Date.now()
        });
        
        // save message on the database
        new_message.save(err => {
            if(err) { return next(err) }
            res.redirect("/");
        })
    }
]

exports.delete_get = (req, res, next) => {
    res.send("todo delete get")
}

exports.delete_post = (req, res, next) => {
    res.send("todo delete post")
}

exports.update_get = (req, res, next) => {
    res.send("todo update get")
}

exports.update_post = (req, res, next) => {
    res.send("todo update post")
}
