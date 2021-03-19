const {Schema, model,ObjectId} = require("mongoose")


const FotoComments = new Schema({
    value: {type: String, required: true},
    likes: {type: Number, default: 0},
    date: {type: Date, default: Date.now},
    fotoItems:{type:ObjectId,ref:'FotoItems'},
    userId:{type:String}
})

module.exports = model("FotoComments", FotoComments)







