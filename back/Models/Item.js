const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    id:{ type : String },
    name:{ type : String },
    src:{ type : String },
    loved:{ type : Boolean }
},{ timestamps : true })

module.exports = mongoose.model("loved", ItemSchema)