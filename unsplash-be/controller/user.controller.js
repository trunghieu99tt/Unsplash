const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE_IN = process.env.JWT_EXPIRE_IN;

// verify user by username and password with user schema
const verifyUser = async (username, password) => {
    const user = await User.findOne({ username });
    if (user) {
        return user.validPassword(password);
    }
    return false;
};

exports.signIn = async (req, res) => {
    const { username, password } = req.body;
    const isUserValid = await verifyUser(username, password);
    if (isUserValid) {
        // if user is verified, return user info except password
        const user = await User.findOne({ username }).select("-password");

        if (user) {
            const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
                expiresIn: JWT_EXPIRE_IN,
            });

            res.status(200).json({
                user,
                token,
            });
        } else {
            res.status(422).json({ error: "Invalid email or password" });
        }
    } else {
        return res.status(422).json({ error: "Invalid email or password" });
    }
};

exports.signUp = async (req, res) => {
    const { username, password } = req.body;

    const savedUser = await User.findOne({ username });

    if (savedUser) {
        res.status(401).json({
            message: "This username is taken by other user",
        });
    } else {
        try {
            const user = new User({ username, password });
            const newUser = await user.save();
            const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
                expiresIn: JWT_EXPIRE_IN,
            });
            res.status(201).json({ user: newUser, token });
        } catch (error) {
            res.status(400).json(error);
        }
    }
};

exports.getMe = async (req, res) => {
    if (req.user) {
        res.status(200).json({
            user: req.user,
        });
    } else {
        res.status(401).json({
            message: "Unauthorized",
        });
    }
};

exports.verifyUser = verifyUser;
