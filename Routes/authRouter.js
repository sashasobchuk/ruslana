const Router = require("express")
const router = new Router()
const AuthControllers  = require("../Auth/Auth")
const authMiddleWare = require('../middleware/auth.middleWare')


router.post('/registration',AuthControllers.registration)
router.post('/login',AuthControllers.Login)
router.get('/auth',authMiddleWare,AuthControllers.auth)


module.exports = router

