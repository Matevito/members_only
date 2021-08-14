// app.js
// dependencies
const createError = require('http-errors');
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("./passport");
require("dotenv").config()

// routes path
const indexRouter = require("./routes/index");
const messagesRouter = require("./routes/messages");
const userRouter = require("./routes/user");

const app = express();
const mongoose = require("mongoose");
const mongoDB = process.env.DB_DATAB
// change process.env.DB_DATAB for your mongodb private route
mongoose.connect(mongoDB, {
    useUnifiedTopology:true,
    useNewUrlParser:true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const User = require("./models/user");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({
    secret:"cats",
    resave:false,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

app.use(express.json());
app.use(express.urlencoded( { extended: false}));


// Setting up routes
app.use("/", indexRouter);
app.use("/messages", messagesRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
})

//* error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
})

app.listen(3000, () => console.log("app running on port 3000"));
