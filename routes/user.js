const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

// /user/{route_path}

router.get("/:id/info");

router.get("/:id/messages");

router.get("/:id/update");

router.post("/:id/update")

module.exports = router;