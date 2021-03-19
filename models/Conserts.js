const {Schema, model} = require("mongoose")


const ConcertItems = new Schema({

    date: {type: Date, default: Date.now},
    citi:{type:String ,require, default:''},
    status:{type:String ,default:''},
    isDone:{type:Boolean ,default:false}

})
module.exports = model("ConcertItems", ConcertItems)







