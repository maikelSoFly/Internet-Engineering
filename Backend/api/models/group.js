const mongoose = require('mongoose')

const groupSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
        unique: false,
    }],
})

module.exports = mongoose.model('Group', groupSchema)