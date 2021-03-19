const Router = require("express")
const router = new Router()
// const usersControllers  = require("../file.controlers/")
const mainPageControlers = require("../file.controlers/MainPageControllers")

router.get('/getFotoItems', mainPageControlers.getFotoItems)
router.get('/getVideoItems', mainPageControlers.getVideoItems)




module.exports = router