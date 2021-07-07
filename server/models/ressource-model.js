const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ressourceSchema = new Schema({
    filename: String,
    course: String,
    file: Buffer,
    size: Number,
    mimetype: String,
});

module.exports = mongoose.model('ressources', ressourceSchema)