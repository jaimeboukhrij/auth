const { Schema, model } = require("mongoose");

const driverSchema = new Schema({
    name: String,
    date: Date,
    team: String,
    img: String

});

const Driver = model("Driver", driverSchema);

module.exports = Driver;