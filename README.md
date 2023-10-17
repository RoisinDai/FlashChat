## Overview
FlashChat is a real-time chat application that enables concurrent multi-users connections using Socket.IO.
## Technologies Used
This app is implemented with Javascrip and Express.js, Node.js, Socket.IO frameworks.

## Demo
#### User begins by entering their display name and hitting the create room button
<img width="1710" alt="Screenshot 2023-09-26 at 12 32 05 AM" src="https://github.com/RoisinDai/FlashChat/assets/125154836/8f8c2494-8b02-4f8c-bc33-b9c9f4a7482d">

#### Room options and a unique randomly generated room code will appear
![Create Room](https://github.com/RoisinDai/FlashChat/assets/125154836/8cdad808-7c53-4bcf-9a1a-bb45339b3eab)

#### Upon entering the room, users will find their own username displayed at the top left corner of the chat box and included in the user list
![Chat Room](https://github.com/RoisinDai/FlashChat/assets/125154836/ddc8575e-d3a1-422e-a2fa-7f9910d0e13b)

#### Other users can join the same room by entering their display name and unique room code
![Join room](https://github.com/RoisinDai/FlashChat/assets/125154836/5fe8507b-20c8-465f-a8a7-563f53c1f0a7)

#### New users will append in the user list and the total number of people in the chatroom is updated. These changes are broadcasted to all users in the room
![Joined room](https://github.com/RoisinDai/FlashChat/assets/125154836/6ad47c90-35ee-4be5-a598-2cd5f8478692)

#### Messages sent to others will appear on the right side of the chatbox in blue 
![Bob Speaks](https://github.com/RoisinDai/FlashChat/assets/125154836/284a9c72-18ea-4e9f-a02f-32579cb56f8b)

#### Received messages are displayed on the left of the chatbox in grey
![John responds](https://github.com/RoisinDai/FlashChat/assets/125154836/42e2f024-e76b-4ffa-ba05-7b3130c7408b)

#### All users are notified when a new user joins. The new user will not be able to view previous chat conversations
![Gabe joins](https://github.com/RoisinDai/FlashChat/assets/125154836/39aebfe9-f3fe-4592-b378-291a89f0d6d5)

All users are notified when an user leaves. The userlist and chatroom header will update accordingly

## Features

- **Max People**
  
  The room creater can select the max number of people allowed in the room using the drop down menu in the "Create Room" interface. 

- **Error Handling**

  Error messages are displayed if users do not enter a display name, enter an invalid room code, the room to join has reached max capacity, or do not enter content in the textbox prior to sending messages.

- **Send Messages**

  Messages are sent using either the send button or by pressing ctrl + enter on the keyboard.

## Feature ideas for the future

- **Persistent Storage**
  
  Implement a database to store chat messages persistently. This way, when users leave and re-enter the room, they can retrieve past conversations.

- **User Preferences**
  
  Provide an option for users to choose whether they want to retain or remove past conversations when leaving and re-entering the room.

- **Emoji Support**
  
  Integrate an emoji picker to allow users to easily insert emojis into their messages

- **Message Editing**
  
  Allow users to edit ot delete their messages after sending them.

- **Typing Indicator**
  
  Show a typing indicator to inform users when someone is typing a message in real-time.

