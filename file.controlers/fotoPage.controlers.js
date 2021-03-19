const FotoItems = require("../models/fotoPage")
const FotoComments = require("../models/fotoComment")
const fs = require('fs')
const uuid = require('uuid')
const config = require("config")


class fotoControler {
    /*    async getFoto(req, res) {
            try {
                let files = await Foto.find()
                res.json(files)
            } catch (e) {
                console.log('error in getFoto', e)
            }
        }*/

    async getFotoPage(req, res) {
        try {
            let  fotoPage = await FotoItems.find().populate({path:'fotoComments'})
            res.json({fotoPage:fotoPage})
        } catch (e) {
            res.status(400).json({message: "error in getFotoPage"})
            console.log('error in getFotoPage', e)
        }
/*        try {
             let  fotoPage = await FotoItems.findOne()
            let fotoItemComent = await FotoComment.find().populate('FotoItems')

            if(!fotoPage){
                res.json({message:'fotoPage dont found'})
            }

            res.json({fotoPage:fotoPage})

        } catch (e) {
            res.status(400).json({message: "error in getFotoPage"})
            console.log('error in getFotoPage', e)
        }*/
    }
    async uploadFoto(req, res) {
        try {
            //  console.log("files of req 22222222222222 here",req.files.foto)
            const foto = req.files.foto
            const image_Url_Name = uuid.v4() + '.jpg'
            foto.mv(req.fotoStaticPath + '/' + image_Url_Name)

            /* костиль на загрузку fotoType only*/
            const imgType = foto.name.split('.').pop()

            let fotoItem = new FotoItems({
                image_Url_Name: image_Url_Name,
                title: ' назви нема поки що ',
                type: imgType,
                likes: 0,

            })

            await fotoItem.save()
            return res.json({message: 'foto uploaded successfully', fotoItem: fotoItem})
        } catch (e) {
            res.json({message: 'error in upload file'})
            console.log('error in upload Foto', e)
        }
    }
    async deleteFoto(req, res) {
        try {
            const {fotoItemId} = req.query
            const fotoItem = await FotoItems.findById(fotoItemId)
            /* удаляєм фізично*/
            fs.unlinkSync(req.fotoStaticPath + '/' + fotoItem.image_Url_Name)
            /* затираєм  з бази даних*/
            // fotoItem.image_Url_Name = null
            /* зберігаєм збережену модель*/
            await FotoItems.findByIdAndRemove(fotoItemId)
            return res.status(200).json({message: 'foto deleted'})

        } catch (e) {
            res.json({message: 'error in deleting foto'})
            console.log('error in deleting foto', e)
        }
    }
    async addComment(req, res) {
        try {
            /* текст коменту і ід ітуму(в майбутньому для рефу) берем з тіла запиту*/
            const {comment, fotoItemId,userId} = req.body
            /* берем конекретно наш ітем по айді*/
            const fotoItem = await FotoItems.findOne({_id: fotoItemId})

            if( comment === '' ){
               return res.status(412).json({message:'comment null or undefined or ``' })
            }
            if (!fotoItem) {
                            /* перевіряєм чи воно впринципі існує ,якщо не існує то ...*/
                console.log(fotoItem)
                console.log('не знайшло відподідне fotoItem по id')
                return res.json({message: 'не знайшло відподідне fotoItem по id'})
            }
             /* створюєм поле фотокоменту локально*/
            const fotoComment = new FotoComments({
                value: comment,
                likes: 0,
                fotoItems: fotoItemId,
                userId:userId
            })
/* пушим фотокомент в фотоітем(а сама приєднуєм ще одну реф ссилку в поле фотоітему)*/
             fotoItem.fotoComments.push(fotoComment._id)
            /*  зберігаєм фотоітем*/
            await fotoItem.save()
            /* зберігаєм фотосейф*/
            await fotoComment.save()

            res.json({message: ' комент додали',fotoComment})


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
    async AdmindeleteComment(req, res) {
        try {
            const {commentID}=req.query
            if (req.user ){
                await FotoComments.findOneAndDelete({_id:commentID})
                return res.status(200).json({message: 'comment deleted'})
            }else {
                console.log('troble here')
                 return res.status(401).json({message: ' permission to delete is denied'})
}        } catch (e) {
            res.status(404).json({message: 'error in deleteComment'})
            console.log('error in deleteComment', e)
        }
    }
    async deleteComment(req, res) {
        try {
            const {userId,commentID}=req.query
            const comment = await FotoComments.findById(commentID)
            if (comment.userId === userId ){
                await FotoComments.findOneAndDelete({_id:commentID})
                return res.status(200).json({message: 'comment deleted'})
            }else {
                console.log('troble here')
                 return res.status(401).json({message: ' permission to delete is denied'})
}
        } catch (e) {
            res.status(404).json({message: 'error in deleteComment'})
            console.log('error in deleteComment', e)
        }
    }



    async getItemComments(req, res) {
        try {
            let  fotoPage = await FotoItems.find().populate({path:'fotoComments'})
            console.log(FotoItems.findOne().fotoComments)
            res.json({fotoPage:fotoPage})
        } catch (e) {
            res.status(400).json({message: "error in getFotoPage"})
            console.log('error in getFotoPage', e)
        }
    }


    /*
    async createFoto(req, res) {
        try {
            const file = req.files.file
            /!* bth path is already exists a file.name *!/
            let path = `${config.get('filePath')}\\files\\fotoItems\\${file.name}`

            /!* перевірка на інснування*!/
            if (fs.existsSync(path)) {
                return res.status(400).json({message: 'already exist'})
            }

            /!* переміщуєм файл в папку*!/
            file.mv(path)

            const type = file.name.split('.').pop()
            const dbFile = new Foto({
                title: file.name,
                type: type,
                size: file.size,
                imageUrl: path,
            })
            await dbFile.save()

            await res.json(dbFile)
        } catch (e) {
            console.log("error in create foto 11", e)
        }

    }
*/
}


module.exports = new fotoControler()
