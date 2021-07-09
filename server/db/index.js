const mongoose = require('mongoose')

const DB_URL = process.env.dbURL !== undefined ? process.env.dbURL : "mongodb://localhost:27017/sgse"

mongoose
    .connect(DB_URL, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db