const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ressourceSchema = new Schema({
    filename: String,
    course: String,
    file: {
        data: Buffer,
        mimetype: String,
        size: Number,
        encoding: String,
        name: String,
        md5: String,
    }
});

module.exports = mongoose.model('ressources', ressourceSchema)