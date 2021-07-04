const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ressourceSchema = new Schema({
    filename: String,
    course: String,
    file: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('ressources', ressourceSchema)