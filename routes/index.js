const express = require('express');

const router = express.Router();

const signUp_controller = require("../controllers/sign-up");
const logIn_controller = require("../controllers/log-in");

router.get("/", (req, res) => {
    res.redirect("/messages");
});

router.get("/sign-up", signUp_controller.create_get);

router.post("/sign-up", signUp_controller.create_post);

router.get("/log-in", logIn_controller.login_get);

router.post("/log-in", logIn_controller.login_post);

router.get("/log-out", logIn_controller.logout_get);

router.post("/log-out", logIn_controller.logout_post)

module.exports = router;