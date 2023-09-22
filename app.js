/*
    active chatting server application
*/
var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)

server.listen(3000, () => {
    console.log("server activated successfully")
})

// express can process statis resources
// make public list into static resources list
app.use(require('express').static('public'))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
        console.log('New user has connected')
});