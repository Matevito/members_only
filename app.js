// app.js

const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

require("dotenv").config()
mongoose.connect(process.env.DB_DATAB, {
    useUnifiedTopology:true,
    useNewUrlParser:true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

//todo: add models

const app = express();
app.set("views", __dirname);
app.set("view engine", "ejs");

app.use(session({
    secret:"cats",
    resave: false,
    saveUninitialized:true
}))//Todo:
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

//todo: routes

app.listen(3000, () => console.log("app running on port 3000"));
