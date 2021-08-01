// post user express route

var express = require("express");
var router = express.Router();

const userController = require("../controller/user.controller");
const requireLogin = require("../middleware/requireLogin");

router.post("/signIn", userController.signIn);
router.post("/signUp", userController.signUp);
router.get("/getMe", requireLogin, userController.getMe);

module.exports = router;
