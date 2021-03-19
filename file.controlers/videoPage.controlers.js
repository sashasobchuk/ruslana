const VideoItems = require("../models/videoPage")
const VideoComments = require("../models/videoComment")
// const FotoComments = require("../models/fotoComment")
const fs = require('fs')
const uuid = require('uuid')
const config = require("config")


class fotoControler {
    // /*    async getFoto(req, res) {
    //         try {
    //             let files = await Foto.find()
    //             res.json(files)
    //         } catch (e) {
    //             console.log('error in getFoto', e)
    //         }
    //     }*/

    async getVideoPage(req, res) {

        try {
             // let  videoPage = await VideoItems.find()
             let videoPage = await VideoItems.find().populate('VideoComments')

            if(!videoPage){
                res.json({message:'videoPage dont found'})
            }

            res.json({videoPage:videoPage})

        } catch (e) {
            res.status(400).json({message: "error in getVideoPage"})
            console.log('error in getVideoPage', e)
        }
    }
    async uploadVideo(req, res) {
        try {
            const video = req.files.video
            const video_Url_Name = uuid.v4() + '.mp4'
            video.mv(req.videoStaticPath + '/' + video_Url_Name)
            /* костиль на загрузку fotoType only*/
            const imgType = video.name.split('.').pop()

            let VideoItem = new VideoItems({
                video_Url_Name: video_Url_Name,
                title: ' назви нема поки що ',
                type: imgType,
                likes: 0,
            })
/*            const videoComment = new VideoComments({
                value:'',
                likes: 0,
                VideoItems:VideoItem._id
            })*/
            // await videoComment.save()
            await VideoItem.save()
            return res.json({message: 'video uploaded successfully', VideoItem: VideoItem})
        } catch (e) {
            res.json({message: 'error in upload file'})
            console.log('error in upload videofile', e)
        }
    }
    async deleteVideo(req, res) {
        try {
            const {videoItemId} = req.query
            // console.log("",videoItemId)

            const videoItem = await VideoItems.findById(videoItemId)
            // console.log("deleteVideo",videoItem)

            /* удаляєм фізично*/
            fs.unlinkSync(req.videoStaticPath + '/' + videoItem.video_Url_Name)
            /* затираєм  з бази даних*/
            // fotoItem.image_Url_Name = null
            /* зберігаєм збережену модель*/
            await VideoItems.findByIdAndRemove(videoItemId)
            return res.status(200).json({message: 'video deleted successfully'})

        } catch (e) {
            res.json({message: 'error in deleteVideo'})
            console.log('error deleteVideo', e)
        }
    }
    async addComment(req, res) {
        try {
            /* текст коменту і ід ітуму(в майбутньому для рефу) берем з тіла запиту*/
            const {comment, VideoItemId,userId} = req.body
            /* берем коекретно наш ітем по айді*/
            const videItem = await VideoItems.findOne({_id: VideoItemId})
            // console.log('videItem',videItem)
            if( comment === '' ){
                /** покишо най буде перевірка просто на пусту строку */
               return res.status(412).json({message:'comment null or undefined or ``' })

            }

            if (!videItem) {
                            /* перевіряєм чи воно впринципі існує ,якщо не існує то ...*/
                console.log(videItem)
                console.log('не знайшло відподідне VideoItem по id')
                return res.json({message: 'не знайшло відподідне VideoItem по id'})
            }
             /* створюєм поле фотокоменту локально*/
            const videoComment = new VideoComments({
                value: comment,
                likes: 0,
                VideoItems: VideoItemId,
                userId: userId,
            })
/* пушим фотокомент в фотоітем(а сама приєднуєм ще одну реф ссилку в поле фотоітему)*/
            videItem.VideoComments.push(videoComment._id)
            /*  зберігаєм фотоітем*/
            await videItem.save()
            /* зберігаєм фотосейф*/
            await videoComment.save()

            res.json({message: ' комент додали',videoComment})


            /*            const  fotoItem = await FotoItem.findById(fotoItemId)
                        /!* удаляєм фізично*!/
                        fs.unlinkSync(config.get('staticPath') + '\\' + fotoItem.image_Url_Name)
                        /!* затираєм  з бази даних*!/
                        fotoItem.image_Url_Name = null
                        /!* зберігаєм збережену модель*!/
                        await fotoItem.save()
                        return res.status(200).json({message:'foto deleted'})*/

        } catch (e) {
            res.json({message: 'error in add comment'})
            console.log('error in add comment', e)
        }
    }
    async AdminDeleteComment(req, res) {
        try {
            const {commentID} = req.query 
            if (req.user){
             await VideoComments.findOneAndDelete({_id:commentID})
             return res.status(200).json({message: 'comment deleted successful'})
            }else {
                console.log('troble here')
                return res.json({message: ' permission to delete is denied'})
            }
        } catch (e) {
            res.json({message: 'error in deleteComment'})
            console.log('error in deleteComment', e)
        }
    }
    async deleteComment(req, res) {
        try {
            const {userId,commentID} = req.query 
            const comment = await VideoComments.findById(commentID)
            if (comment.userId === userId){
             await VideoComments.findOneAndDelete({_id:commentID})
             return res.status(200).json({message: 'comment deleted successful'})
            }else {
                console.log('troble here2')
                return res.json({message: ' permission to delete is denied'})
            }
        } catch (e) {
            res.json({message: 'error in deleteComment'})
            console.log('error in deleteComment', e)
        }
    }

}


module.exports = new fotoControler()
