// post user express route

var express = require("express");
var router = express.Router();

const userController = require("../controller/user.controller");

route.get("/:username", userController.getUserByUsername);

router.post("/", userController.createUser);
router.get("/verify", userController.verifyUser);

module.exports = router;
