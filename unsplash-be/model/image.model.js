// create a image model with name, url and ref to user model using mongoose
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ImageSchema = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    user: { type: ObjectId, ref: "User" },
});

module.exports = mongoose.model("Image", ImageSchema);
