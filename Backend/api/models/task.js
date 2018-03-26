const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    workTime: {
        type: Number,
        required: true,
    },
    tier: {
        type: String,
        enum: ['OPTIONALS', 'MODERATE', 'URGENTS'],
        default: 'OPTIONALS',
    }
})

module.exports = mongoose.model('Task', taskSchema)
