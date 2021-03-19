const Router = require("express")
const router = new Router()
const fotoPageControllers  = require("../file.controlers/fotoPage.controlers")
// const sendMail = require("../email/sendMail")
const authMiddleWare = require('../middleware/auth.middleWare')


router.post('/fotoUpload', authMiddleWare ,fotoPageControllers.uploadFoto)
router.delete('/deleteFoto',authMiddleWare, fotoPageControllers.deleteFoto)
router.post('/addComment',fotoPageControllers.addComment)
router.get('/fotoPage',fotoPageControllers.getFotoPage)
router.get('/getItemComments',fotoPageControllers.getItemComments)
router.delete('/adminDeleteComment',authMiddleWare, fotoPageControllers.AdmindeleteComment)
router.delete('/DeleteComment', fotoPageControllers.deleteComment)





/*
router.post('/foto',FileController.createFoto)
*/

// router.get('/foto',FileController.getFoto)
module.exports = router