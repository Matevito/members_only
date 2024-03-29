const express = require("express");

const router = express.Router();

const message_controller = require("../controllers/messagesController");

// /messages/{route_path}

router.get("/", message_controller.messages_get);

router.get("/create", message_controller.create_get);

router.post("/create", message_controller.create_post);

router.get("/:id/delete", message_controller.delete_get);

router.post("/:id/delete", message_controller.delete_post);

module.exports = router;