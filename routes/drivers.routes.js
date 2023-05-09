const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const saltRounds = 10
const { isLoggedIn } = require('../middlewares/route-guard')

const Driver = require('../models/Driver.model')



router.get("/create", isLoggedIn, (req, res) => {
    res.render("driver/driver-create")
})

router.post("/create", (req, res) => {
    const { name, date, team, img } = req.body

    Driver
        .create({ name, date, team, img })
        .then(() => res.redirect("/drivers"))
        .catch(err => console.log(err))

})

router.get("/", (req, res) => {
    Driver
        .find()
        .then(driver => res.render("driver/driver-list", { driver }))
        .catch(err => console.log(err))
})

router.post("/delete/:id", isLoggedIn, (req, res) => {
    const { id } = req.params
    Driver
        .findByIdAndDelete(id)
        .then(() => res.redirect("/drivers"))
        .catch(err => console.log(err))
})







module.exports = router