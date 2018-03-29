const express = require('express')
const app = express()
const taskRoutes = require('./api/routes/taskRoutes')
const groupRoutes = require('./api/routes/groupRoutes')
const authRoutes = require('./api/routes/authRoutes')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const auth = require('./api/auth')()
const jwt = require('jwt-simple')


mongoose.connect(
    process.env.MONGO_ATLAS_CONN_STRING_3_4_OR_EARLIER
    //'process.env.MONGO_ATLAS_CONN_STRING_3_4_OR_LATER',   not working with a free cluster
).then(() => {
    console.log('Connected to MongoDB')
}).catch(error => {
    console.log(error)
})
mongoose.Promise = global.Promise

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(auth.initialize())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE')
        return res.status(200).json({})
    }
    next()
})


// Handling routes
app.use('/', authRoutes(auth.authenticate))
app.use('/tasks', taskRoutes())
app.use('/groups', groupRoutes())


app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app
