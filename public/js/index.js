var socket = io('http://localhost:3000');

var mainBox = document.getElementById('mainBox');
var createRoomBtn = document.getElementById('createRoomBtn')
var createRoomBox = document.getElementById('createRoomBox');
var backButton1 = document.getElementById('backButton1');
var joinRoomBox = document.getElementById('joinRoomBox');
var joinRoomBtn = document.getElementById('joinRoomBtn');
var backButton2 = document.getElementById('backButton2');
var startRoomBtn = document.getElementById('startRoomBtn');
var chatBox = document.getElementById('chatBox');
var enterRoomBtn = document.getElementById('enterRoomBtn');
var generatedCode = document.getElementById('generatedCode');
var username = document.getElementById('username');
var selfUsername = document.getElementById('selfUsername');
var maxPeople = document.getElementById('maxPeople');
var enteredCode = document.getElementById('enteredCode');
var currentNumber = document.getElementById('currentNumber');
var userCount = document.getElementById("userCount");
var selfAvatar = document.getElementById('selfAvatar');

createRoomBtn.addEventListener('click', function() {
    event.preventDefault();
    generatedCode.textContent = codeGeneration();
    console.log(username.value);
    if (!username.value) {
        alert('Please enter a display name');
        return;
    }
    mainBox.style.display = "none";
    createRoomBox.style.display = "block";
});

backButton1.addEventListener('click', function() {
    event.preventDefault();
    createRoomBox.style.display = "none";
    mainBox.style.display = "block  ";
});

joinRoomBtn.addEventListener('click', function() {
    event.preventDefault();
    if (!username.value) {
        alert('Please enter a display name');
        return;
    }
    mainBox.style.display = "none";
    joinRoomBox.style.display = "block";
});

backButton2.addEventListener('click', function() {
    event.preventDefault();
    joinRoomBox.style.display = "none";
    mainBox.style.display = "block";
});

startRoomBtn.addEventListener('click', function() {
    event.preventDefault();
    createRoomBox.style.display = "none";
    chatBox.style.display = "block";
    var image = getRandomAvatarImage();
    selfAvatar.src = image;
    socket.emit('create room', generatedCode, username.value, maxPeople.value, image)
    selfUsername.textContent = username.value;
});

enterRoomBtn.addEventListener('click', function() {
    joinRoomBox.style.display = "none";
    chatBox.style.display = "block";
    if (!enteredCode.value) {
        alert('Please enter a room code');
        return;
    }
    var image = getRandomAvatarImage();
    selfAvatar.src = image;
    socket.emit('join room', enteredCode.value, username.value, image);
    selfUsername.textContent = username.value;
});

function codeGeneration() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';

    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }
    generatedCode = code;
    return code;
}

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

socket.on('roomNotFound', () => {
    joinRoomBox.style.display = "block";
    chatBox.style.display = "none";
    alert('No rooms found. Please enter the correct room code.');
});

socket.on('rooms full', () => {
    joinRoomBox.style.display = "block";
    chatBox.style.display = "none";
    alert('Room has reached maximum capacity.');
});


socket.on('userList', data => {
    // alert(data.rooms[data.roomCode].currNum);
    $('.user-list ul').html('');
    data.rooms[data.roomCode].users.forEach(item => {
        $('.user-list ul').append(`
            <li class="user">
                <div class="avatar"><img src ="${item.avatarUrl}" alt= "" /></div>            
                <div class="username">${item.username}</div>
            </li>
        `);
    });
    userCount.textContent = "ChatRoom (" + data.rooms[data.roomCode].currNum + ")";

});

socket.on('addUser', data => {
    // send a system message
    $('.box-bd').append(`
        <div class="system">
            <p class="message_system">
                <span class="content">${data.username} has joined the chat</span>
            </p>
        </div>
    `);
});

socket.on('delUser', data=> {
    // send a system message
    $('.box-bd').append(`
    <div class="system">
        <p class="message_system">
            <span class="content">${data.username} has left the chat</span>
        </p>
    </div>
`);
});

// chat features

$('.btn-send').on('click', () =>{
    // obtain chat content
    var content = $('#content').val().trim();
    $('#content').val('');
    if(!content) return alert ('Please enter content');

    // send data to server
    socket.emit('sendMessage', {
        msg: content,
        selfUsername: username.value,
        selfAvatar: selfAvatar.src
    });
});


socket.on('receiveMessage', data => {
    if(data.selfUsername === username.value) {
        // my messages
        $('.box-bd').append(`
        <div class="message-box">
        <div class="my-message">
            <img class="avatar" src="${data.selfAvatar}" alt=""/>
            <div class="content">
                <div class="bubble">
                    <div class="bubble_cont">${data.msg}</div>
                </div>
            </div>
        </div>
    </div>
        `)
    } else {
        // others' messages
        $('.box-bd').append(`
        <div class="message-box">
            <div class="other-message">
                <img class="avatar" src="${data.selfAvatar}" alt=""/>
                    <div class="content">
                        <div class="nickname">${data.selfUsername}</div>
                        <div class="bubble">
                            <div class="bubble_cont">${data.msg}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `)

    }
});

