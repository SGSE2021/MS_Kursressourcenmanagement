const mongoose = require('mongoose')

const DB_URL = process.env.dbURL

mongoose
    .connect(DB_URL, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
