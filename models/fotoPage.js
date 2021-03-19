const {Schema, model,ObjectId} = require("mongoose")


const FotoItems = new Schema({
    title: {type: String, required: true},
    type: {type: String, required: true},
    image_Url_Name: {type: String, default: ''},
    likes: {type: Number, default: 0},
    date: {type: Date, default: Date.now},
    /* а тут незнаю де число сайз береця, тре буде пошукати*/
    size: {type: Number, default: 0},
    accessLink: {type: String},
    fotoComments:[{type:ObjectId,ref:'FotoComments'}]

})
module.exports = model("FotoItems", FotoItems)







