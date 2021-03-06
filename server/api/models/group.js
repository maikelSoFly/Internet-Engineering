const mongoose = require('mongoose')

const groupSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: false,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
        unique: true,
    }],
})

module.exports = mongoose.model('Group', groupSchema)