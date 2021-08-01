// post user express route

var express = require("express");
var router = express.Router();

const requireLogin = require("../middleware/requireLogin");

const imageController = require("../controller/image.controller");

router.get("/image", imageController.getImages);
router.post("/image", requireLogin, imageController.createImage);
router.delete("/image/:id", requireLogin, imageController.deleteImageById);

module.exports = router;
