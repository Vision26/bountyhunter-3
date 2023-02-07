const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Movie Blueprint
const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },//enum:['action', 'fantasy']
    genre: {
        type:String,
        required: true
    }
})

//GenerateModel
module.exports = mongoose.model('Movie', movieSchema)