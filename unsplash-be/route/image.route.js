// post user express route

const express = require("express");
const router = express.Router();

const requireLogin = require("../middleware/requireLogin");

const imageController = require("../controller/image.controller");

router.get("/image", imageController.getImages);
router.post("/image", requireLogin, imageController.createImage);
router.delete("/image/:id", requireLogin, imageController.deleteImageById);

module.exports = router;
