const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(require("./route/user.route"));
app.use(require("./route/image.route"));

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
).replace("<DB_USERNAME>", process.env.DATABASE_USERNAME);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB connection successful"));

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

module.exports = server;
