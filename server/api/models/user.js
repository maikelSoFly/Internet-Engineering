const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        unique: false,
    }],
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        unique: false,
    }],
    roles: {
        type: Array,
        default: ['USER']
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
