const mongoose = require('mongoose')

const tierSchema = mongoose.Schema({
    _id: String,
    name: String,
    IDs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
})

module.exports = mongoose.model('Tier', tierSchema)