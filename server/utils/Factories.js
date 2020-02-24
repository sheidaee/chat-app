const uuidv4 = require('uuid/v4');

const createUser = ({ name = '' } = {}) => ({
  id: uuidv4(),
  name,
});

const createMessage = ({ message = '', sender = '' } = {}) => ({
  id: uuidv4(),
  time: new Date().toISOString(),
  message,
  sender,
});

const createChat = ({
  messages = [],
  name = 'community',
  users = [],
} = {}) => ({
  id: uuidv4(),
  name,
  messages,
  users,
  typingUsers: [],
});

const getTime = date =>
  `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;

module.exports = {
  createMessage,
  createChat,
  createUser,
};
