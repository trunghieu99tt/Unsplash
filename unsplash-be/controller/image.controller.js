const Image = require("../model/image.model");

exports.createImage = (req, res) => {
    // create new image object
    const image = new Image(req.body);
    // save the image to the database
    image.save((err, image) => {
        if (err) {
            return res.status(500).send({
                message: err,
            });
        }
        res.json(image);
    });
};

// delete image function using mongoose
exports.deleteImageById = (req, res) => {
    // get the image object
    Image.findOne(
        {
            name: req.params.id,
        },
        (err, image) => {
            if (err) {
                return res.status(500).send({
                    message: err,
                });
            }
            // delete the image
            image.remove((err, image) => {
                if (err) {
                    return res.status(500).send({
                        message: err,
                    });
                }
                res.json(image);
            });
        }
    );
};

exports.getImages = (req, res) => {
    const { page, limit, name } = req.query;
    const skip = limit ? (page - 1) * limit : 0;
    const regex = new RegExp(name, "i");
    // get the images
    Image.find(
        { name: { $regex: regex } },
        { name: 1, url: 1, _id: 0 },
        {},
        { skip, limit }
    )
        .sort({ name: 1 })
        .exec((err, images) => {
            if (err) {
                return res.status(500).send({
                    message: err,
                });
            }
            res.json(images);
        });
};
