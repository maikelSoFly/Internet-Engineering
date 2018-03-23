const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    workTime: Number,
})

module.exports = mongoose.model('Task', taskSchema)
