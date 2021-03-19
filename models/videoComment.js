const {Schema, model,ObjectId} = require("mongoose")


const VideoComments = new Schema({
    value: {type: String, required: true},
    likes: {type: Number, default: 0},
    date: {type: Date, default: Date.now},
    VideoItems:{type:ObjectId,ref:'VideoItems'},
    userId:{type:String},
    
})

module.exports = model("VideoComments", VideoComments)







