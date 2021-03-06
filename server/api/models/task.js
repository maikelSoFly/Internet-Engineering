const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator')


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
    deadline: {
        type: Date,
        default: Date.now,
    },
    tier: {
        type: String,
        enum: ['OPTIONALS', 'MODERATES', 'URGENTS'],
        default: 'OPTIONALS',
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
})

taskSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Task', taskSchema)
