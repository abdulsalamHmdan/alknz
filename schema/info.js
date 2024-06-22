const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const info = new Schema({
    name: String,
    id: String,
    osrh: String
})


const Info = mongoose.model('Info', info)

module.exports = Info