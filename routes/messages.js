const express = require("express");

const router = express.Router();

const message_controller = require("../controllers/messagesController");

// /messages/{route_path}

router.get("/");

router.get("/create");

router.post("/create")

router.get("/:id/update");

router.post("/:id/update");

module.exports = router;