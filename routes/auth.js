const router = require('express').Router()

const { Login, getLoginPage, getRegisterPage, Register, Logout } = require('../controllers/auth')

router
    .route('/login')
    .get(getLoginPage)
    .post(Login)
router
    .route('/register')
    .get(getRegisterPage)
    .post(Register)
router
    .route('/logout')
    .get(Logout)

module.exports = router