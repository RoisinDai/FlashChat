/*
    Main Chatroom Functions
*/

/*
    1. Connect socket.io service
*/

var socket = io('http://localhost:3000')

document.getElementById('createRoomBtn').addEventListener('click', function() {
    createRoomFunction();
});

function createRoomFunction() {
    alert("Create Room button clicked!");
    // You can add your logic here
}

