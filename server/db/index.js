const mongoose = require('mongoose')
// const { DB_URL } = require('../env')

mongoose
    .connect('mongodb://localhost:27017/sgse', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db