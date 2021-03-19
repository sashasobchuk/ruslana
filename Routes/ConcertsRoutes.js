const Router = require("express")
const router = new Router()
const concertsPageControllers  = require("../file.controlers/ConcertsPage.controlers")

const authMiddleWare = require('../middleware/auth.middleWare')


router.post('/addItem', concertsPageControllers.addConcertItem ,)
router.post('/changeItem', concertsPageControllers.changeConcertItem ,)
router.delete('/deleteConcertItems', concertsPageControllers.deleteConcert ,)
router.get('/getPage', concertsPageControllers.getConcertPage ,)





/*
router.post('/foto',FileController.createFoto)
*/

// router.get('/foto',FileController.getFoto)
module.exports = router