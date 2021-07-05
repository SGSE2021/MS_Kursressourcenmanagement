const mongoose = require('mongoose')
// const { DB_URL } = require('../env')

mongoose
    .connect('mongodb://user:mongo@test-mongodb.support.svc.cluster.local:27017/kursressourcen', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db