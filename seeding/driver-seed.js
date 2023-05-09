
const mongoose = require('mongoose')
const Driver = require('./../models/Driver.model')

const MONGO_URI = 'mongodb://localhost/lab-express-basic-auth'

const drivers = [
]

mongoose
    .connect(MONGO_URI)
    .then(x => {
        console.log(`Connected to Mongo database: "${x.connections[0].name}"`)
        return Driver.create(drivers)
    })
    .then(booksFromDB => {
        console.log(`Created ${booksFromDB.length} books`)
        return mongoose.connection.close()
    })
    .then(() => {
        console.log('DB connection closed!')
    })
    .catch(err => {
        console.log(`An error occurred while creating books from the DB: ${err}`)
    })