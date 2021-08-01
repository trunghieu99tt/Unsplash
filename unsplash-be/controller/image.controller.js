const Image = require("../model/image.model");
const User = require("../model/user.model");
const { verifyUser } = require("../controller/user.controller");

exports.createImage = (req, res) => {
    // create new image object
    const image = new Image(req.body);
    // save the image to the database
    image.save((err, image) => {
        if (err) {
            return res.status(500).json({
                message: err,
            });
        }
        res.status(200).json(image);
    });
};

// delete image function using mongoose
exports.deleteImageById = (req, res) => {
    verifyUser(req.username, req.body.password).then((isOk, err) => {
        if (isOk) {
            // Image.findByIdAndDelete(req.params.id, (err, image) => {
            //     if (err) {
            //         return res.status(500).send({
            //             message: err,
            //         });
            //     }
            //     res.status(200).json({
            //         message: "Image deleted successfully",
            //     });
            // });
        } else {
            res.status(400).json({
                message: "Password is incorrect!",
            });
        }
    });
};

exports.getImages = (req, res) => {
    let { page, limit = 12, name = "" } = req.query;
    const skip = limit ? (page - 1) * limit : 0;
    const regex = new RegExp(name, "i");
    if (limit && typeof limit !== "number") {
        limit = ~~limit;
    }
    // get images from database with limit and give total number of images

    Image.find({ name: regex })
        .skip(skip)
        .limit(limit)
        .populate("user")
        .exec((err, images) => {
            if (err) {
                return res.status(500).send({
                    message: err,
                });
            }
            // get total number of images
            Image.count({ name: regex }, (err, total) => {
                if (err) {
                    return res.status(500).send({
                        message: err,
                    });
                }
                res.status(200).json({ images, total });
            });
        });
};
