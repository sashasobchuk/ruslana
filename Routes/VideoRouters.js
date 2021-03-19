const Router = require("express")
const router = new Router()
const VideoPageControlers  = require("../file.controlers/videoPage.controlers")
const authMiddleWare = require('../middleware/auth.middleWare')

router.get('/getVideoPage' ,VideoPageControlers.getVideoPage)

router.post('/videoUpload' ,authMiddleWare,VideoPageControlers.uploadVideo)
router.delete('/deleteVideoItem' , authMiddleWare,VideoPageControlers.deleteVideo)
router.post('/addComment' ,VideoPageControlers.addComment)
router.delete('/deleteComment' ,VideoPageControlers.deleteComment)
router.delete('/AdminDeleteComment' , authMiddleWare,VideoPageControlers.AdminDeleteComment)



/*
router.post('/foto',FileController.createFoto)
*/

// router.get('/foto',FileController.getFoto)
module.exports = router