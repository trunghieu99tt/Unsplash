const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).json({
            error: "You must be logged in",
        });
    }

    const token = authorization.replace("Bearer ", "");

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            res.status(401).json({
                error: "You must be logged in",
            });
        }
        const { _id } = payload;
        User.findById(_id)
            .select("-password")
            .then((userData) => {
                req.user = userData;
                next();
            });
    });
};
