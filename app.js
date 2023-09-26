var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)

const rooms = {};

server.listen(3000, () => {
    console.log("server activated successfully")
})

app.use(require('express').static('public'))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

const avatarImages = [
    'avatar1.png',
    'avatar2.png',
    'avatar3.png',
    'avatar4.png',
    'avatar5.png'
];

function getRandomAvatarImage() {
    const randomIndex = Math.floor(Math.random() * avatarImages.length);
    return avatarImages[randomIndex];
}

io.sockets.on('connection', (socket) => {
    console.log('New user has connected')
    socket.on('create room', (roomCode, username, maxNum, avatarUrl) => {
        rooms[roomCode] = {
            generatedCode: roomCode, 
            users: [],
            currNum: 1,
            maxNum: maxNum,
        }
        rooms[roomCode].users.push({username, avatarUrl});

        socket.join(roomCode);
        console.log(socket.id + " has created the room, username = " + username + " avatar: " + avatarUrl + " with maxNum = " + maxNum + " code: " + roomCode);
        console.log(rooms);
        console.table(rooms[roomCode].users);
        const dataToEmits = {
            rooms,
            roomCode: roomCode
          };
        io.emit('userList', dataToEmits);
    });    
    
    socket.on('join room', (enteredCode, username, avatarUrl) => {
        // Check if the room exists
        if (rooms[enteredCode]) {
            if(rooms[enteredCode].currNum != rooms[enteredCode].maxNum) {
                rooms[enteredCode].users.push({username, avatarUrl});
            rooms[enteredCode].currNum++;
            socket.join(enteredCode);
            console.log(socket.id + " has joined the room, username = " + username + " avatar: " + avatarUrl);
            console.log(rooms);
            console.table(rooms[enteredCode].users);
        } else {
                socket.emit('rooms full');
                return;
            } 
        } else {
            socket.emit('roomNotFound'); 
            return;
        }
        const dataToEmit = {
            rooms,
            roomCode: enteredCode
          };
        io.emit('userList', dataToEmit);

        const newUserData = {
            username: username,
            avatarUrl: avatarUrl,
            roomCode: enteredCode
        }

        io.emit('addUser', newUserData);
        socket.username = username;
        socket.avatar = avatarUrl;
        socket.enteredCode = enteredCode;
    });

    socket.on('disconnect', () => {
        // delete username and avatarUrl from users
        // update userList
        let idx = rooms[socket.enteredCode].users.findIndex(item => item.username === socket.username);
        rooms[socket.enteredCode].users.splice(idx, 1);
        io.emit('delUser', {
            username: socket.username,
            avatar: socket.avatarUrl
        });
        const dataToEmit = {
            rooms: rooms,
            roomCode: socket.enteredCode
          };
        io.emit('userList', dataToEmit)
    })

    socket.on('sendMessage', data => {
        console.log(data)
        io.emit('receiveMessage', data)
        })
    });
