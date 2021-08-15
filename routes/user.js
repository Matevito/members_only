const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

router.get("/info", userController.info_get);

router.get("/messages", userController.messages_get);

router.get("/update", userController.update_get);

router.post("/update", userController.update_post);

module.exports = router;