const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Appointment = new Schema(
    {
        name: { type: String, required: true },
        course: String,
        date: String,
    },
    { timestamps: true },
)

module.exports = mongoose.model('appointments', Appointment)
