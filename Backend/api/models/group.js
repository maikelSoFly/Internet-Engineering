const mongoose = require('mongoose')

const groupSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    IDs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
})

module.exports = mongoose.model('Group', groupSchema)