// to seed your database, use the 'node' command followed by the filename 

const mongoose = require('mongoose')
const User = require('./../models/User.model')

const MONGO_URI = 'mongodb://localhost/lab-express-basic-auth'

const users = [

]

mongoose
    .connect(MONGO_URI)
    .then(x => {
        console.log(`Connected to Mongo database: "${x.connections[0].name}"`)
        return User.create(users)
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