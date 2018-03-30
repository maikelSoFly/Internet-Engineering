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
    workTime: {
        type: Number,
        required: true,
    },
    deadline: {
        type: Date,
        default: Date.now,
    },
    tier: {
        type: String,
        enum: ['OPTIONALS', 'MODERATE', 'URGENTS'],
        default: 'OPTIONALS',
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
})

taskSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Task', taskSchema)
