// create an image model with name, url and ref to user model using mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ImageSchema = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    user: { type: ObjectId, ref: "User" },
});

module.exports = mongoose.model("Image", ImageSchema);
