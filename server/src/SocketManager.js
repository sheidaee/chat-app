const io = require('../index').io;

const {
  VERIFY_USER,
  USER_CONNECTED,
  USER_DISCONNECTED,
  LOGOUT,
  COMMUNITY_CHAT,
  MESSAGE_RECEIVED,
  MESSAGE_SENT,
  TYPING,
  UPDATE_USER, 
  USER_UPDATED
} = require('../utils/Events');

const { createUser, createMessage, createChat } = require('../utils/Factories');

let connectedUsers = {};

const communityChat = createChat();

module.exports = function(socket) {
  console.log('\x1bc'); // clears console

  console.log('socket id ' + socket.id);

  let sendMessageToChatFromUser;

  let sendTypingFromUser;

  // verify username
  socket.on(VERIFY_USER, (name, callback) => {
    if (isUser(connectedUsers, name)) {
      callback({ isUser: true, user: null });
    } else {
      callback({ isUser: false, user: createUser({ name }) });
    }
  });

  // User connects with username
  socket.on(USER_CONNECTED, user => {
    if (!user) {
      return;
    }
    
    connectedUsers = addUser(connectedUsers, user);
    socket.user = user;
    console.log('sendMessageToChatFromUser', user.id);

    sendMessageToChatFromUser = sendMessageToChat(user.id);

    sendTypingFromUser = sendTypingToChat(user.id);

    io.emit(USER_CONNECTED, connectedUsers);
    console.log(JSON.stringify(connectedUsers, 0, 2));
  });
  // user disconnects
  socket.on('disconnect', () => {
    if ('user' in socket) {
      connectedUsers = removeUser(connectedUsers, socket.user.id);

      io.emit(USER_DISCONNECTED, connectedUsers);
      console.log('Disconnect', JSON.stringify(connectedUsers, 0, 2));
    }
  });

  // user logouts
  socket.on(LOGOUT, () => {
    connectedUsers = removeUser(connectedUsers, socket.user.name);

    io.emit(USER_DISCONNECTED, connectedUsers);
    console.log('Disconnect', connectedUsers);
  });

  //Get Community Chat
  socket.on(COMMUNITY_CHAT, callback => {
    console.log('COMMUNITY_CHAT');
    console.log(JSON.stringify(communityChat, 0, 2));

    callback(communityChat);
  });

  socket.on(MESSAGE_SENT, ({ chatId, message }) => {
    console.log('socket.on MESSAGE_SENT', chatId, message);

    sendMessageToChatFromUser(chatId, message);
  });

  socket.on(TYPING, ({ chatId, isTyping }) => {
    console.log(`${TYPING}-${chatId}`, chatId, isTyping);

    sendTypingFromUser(chatId, isTyping);
  });

  socket.on(UPDATE_USER, ({ userId, newUserName }, callback) => {    
    if (!connectedUsers[userId]) {
      callback({ updated: false, message: 'user does not exists'});
      return;
    }

    if (userNameExists(connectedUsers, userId, newUserName)) {
      callback({ updated: false, message: 'user exist' });
      return;
    }

    const newList = updateUser(connectedUsers, userId, { name: newUserName });
    
    callback({ updated: true });
        
    io.emit(USER_UPDATED, {users: newList, userId});
    connectedUsers = newList;
    // io.emit(USER_CONNECTED, connectedUsers);
  })
};

function sendTypingToChat(userId) {
  return (chatId, isTyping) => {
    io.emit(`${TYPING}-${chatId}`, { userId, isTyping });
  };
}

function sendMessageToChat(sender) {
  console.log('sendMessageToChat', sender);
  return (chatId, message) => {
    console.log(`${MESSAGE_RECEIVED}-${chatId}`);
    // console.log(JSON.stringify(createMessage({ message, sender })));

    io.emit(
      `${MESSAGE_RECEIVED}-${chatId}`,
      createMessage({ message, sender })
    );
  };
}

function addUser(userList, user) {
  const newList = Object.assign({}, userList);
  newList[user.id] = user;

  return newList;
}

function removeUser(userList, userID) {
  const newList = Object.assign({}, userList);
  delete newList[userID];

  return newList;
}

function isUser(userList, username) {  
  return Object.keys(userList).filter( userID => userList[userID].name === username).length === 1;
}

function userNameExists(userList, userRequestedId, username) {  
  return Object.keys(userList).filter( userID => userList[userID].name === username && userID !== userRequestedId).length === 1;
}

function updateUser(userList, userID, props) {
  const newList = Object.assign({}, userList);   
  newList[userID] = { ...newList[userID], ...props };
  
  return newList;
}

