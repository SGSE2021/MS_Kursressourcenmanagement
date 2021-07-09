const mongoose = require('mongoose')
// const { DB_URL } = require('../env')

mongoose
    .connect('mongodb://resourcesdb-user:6dOk6YquhH@resources-mongodb.support.svc.cluster.local:27017/resourcedb', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
