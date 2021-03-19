const FotoItems = require("../models/fotoPage")
const VideoItems = require("../models/videoPage")

class mainPageControllers {
    async getFotoItems(req, res) {
        try {
            let fotoPage = await FotoItems.find({},{image_Url_Name:1}).limit(8).sort({date:-1})
            res.json({fotoPage: fotoPage})
        } catch (e) {
            res.status(400).json({message: "error in getFotoPage"})
            console.log('error in getFotoPage', e)
        }
    }
    async getVideoItems(req, res) {
        try {
            let videoPage = await VideoItems.find({},{video_Url_Name:1}).limit(3).sort({date:-1})
            res.json({videoPage: videoPage})
        } catch (e) {
            res.status(400).json({message: "error in getFotoPage"})
            console.log('error in getFotoPage', e)
        }
    }
}


module.exports = new mainPageControllers()
