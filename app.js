// app.js

// dependencies
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

// routes path
const indexRouter = require("./routes/index");
const messagesRouter = require("./routes/messages");
const userRouter = require("./routes/user");

require("dotenv").config()
mongoose.connect(process.env.DB_DATAB, {
    useUnifiedTopology:true,
    useNewUrlParser:true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();
app.set("views", __dirname);
app.set("view engine", "ejs");

app.use(express.json())
app.use(session({
    secret:"cats",
    resave: false,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

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
