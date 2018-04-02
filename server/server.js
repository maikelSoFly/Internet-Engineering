const http = require('http'),
    port = process.env.PORT || 5000,
    app = require('./app'),
    server = http.createServer(app)


server.listen(port, () => {
    console.log('Server is listening on port ' + port)
})
