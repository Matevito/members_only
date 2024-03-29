const async = require("async");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const Message = require("../models/messages");

exports.messages_get = (req, res, next) => {
    Message.find().populate("author", ["firstName", "secondName", "formatted_name"]).exec((err, messages_list) => {
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
    Message.findById(req.params.id).populate("author", "firstName").exec((err,message) => {
        if (err) { return next(err) }
        res.render("message_delete", {
            title: "message delete",
            user: req.user,
            message: message,
        })
    })
    
}

exports.delete_post = (req, res, next) => {
    const message_id = req.body.message_id;
    Message.findByIdAndRemove(message_id, (err) => {
        if (err) { return next(err) }
        // item deleted, redirect to messages board
        res.redirect("/");
    })
}
