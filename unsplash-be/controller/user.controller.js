const User = require("../model/user.model");

exports.createUser = function (req, res) {
    var user = new User(req.body);

    try {
        const newUser = user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json(error);
    }
};

// get user by username
exports.getUserByUsername = function (req, res) {
    User.findOne(
        {
            username: req.params.username,
        },
        function (err, user) {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(user);
            }
        }
    );
};

// verify user by username and password with user schema
exports.verifyUser = function (req, res) {
    User.findOne(
        {
            username: req.body.username,
        },
        function (err, user) {
            if (err) {
                res.status(400).json(err);
            } else {
                if (user.validPassword(req.body.password)) {
                    res.status(200).json(user);
                } else {
                    res.status(401).json({
                        message: "Username or password is incorrect",
                    });
                }
            }
        }
    );
};
