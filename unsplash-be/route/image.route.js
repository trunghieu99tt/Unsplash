// post user express route

var express = require("express");
var router = express.Router();

const imageController = require("../controller/image.controller");

router.get("/:name", imageController.getImages);
router.post("/", imageController.createImage);
router.delete("/:id", imageController.deleteImageById);

module.exports = router;
