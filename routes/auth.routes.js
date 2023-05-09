const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const saltRounds = 10

const User = require('../models/User.model')
const { isLoggedOut } = require('../middlewares/route-guard')

router.get("/registrarse", isLoggedOut, (req, res, next) => {
    res.render("auth/singup")
})
router.post("/registrarse", (req, res, next) => {
    const { username, planePasword } = req.body
    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(planePasword, salt))
        .then(hashedPassword => User.create({ username, password: hashedPassword }))
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})

router.get(("/inicio-sesion"), isLoggedOut, (req, res, next) => {
    res.render("auth/login")
})

router.post(("/inicio-sesion"), (req, res, next) => {

    const { username, planePasword } = req.body



    if (username === "" || planePasword === "") {
        res.render('auth/login', { errorMessage: 'Los campos son obligatorios' })
        return
    }
    User
        .findOne({ username })
        .then(foundUser => {
            console.log(foundUser)

            if (!foundUser) {
                res.render('auth/login', { errorMessage: 'Usuario no reconocido' })
                return
            }

            if (!bcrypt.compareSync(planePasword, foundUser.password)) {
                res.render('auth/login', { errorMessage: 'Contraseña incorrecta' })
                return
            }

            req.session.currentUser = foundUser // login!
            res.redirect('/perfil')
        })
})


router.get('/desconectar', (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})






module.exports = router