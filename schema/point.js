const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const point = new Schema({
    name: String,
    osrh: String,
    noqat: Number,
    lgnh: String,
    day: String
})


const Point = mongoose.model('Point', point)

module.exports = Point
