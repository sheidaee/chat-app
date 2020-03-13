const omit = require('lodash.omit');
const faker = require('faker');
const { getSaltAndHash, getUserToken } = require('./auth');

function userData(overrides = {}) {
  const password = overrides.password || faker.internet.password();
  return Object.assign(
    {
      id: faker.random.uuid(),
      username: faker.internet.userName(),
      name: faker.name.findName(),
    },
    getSaltAndHash(password),
    omit(overrides, ['password'])
  );
}

function messageData(overrides = {}) {
  return Object.assign(
    {
      id: faker.random.uuid(),
      time: new Date().toISOString(),
      message: faker.lorem.words(),
      sender: faker.random.uuid(),
    },
    overrides
  );
}

function messagesData({ count = 1, overrideMessage = {} }) {
  return Array.from(Array(count), messageData.bind(null, overrideMessage));
}

function postData(overrides) {
  return Object.assign(
    {
      title: faker.lorem.words(),
      // paragraphs return text with \n\r for newlines
      // jsdom doesn't like \r very much I think...
      content: faker.lorem.paragraphs().replace(/\r/g, ''),
      tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()].filter(
        (w, i, a) => a.indexOf(w) === i
      ),
      authorId: faker.random.uuid(),
      date: faker.date.past().toJSON(),
    },
    overrides
  );
}

function loginForm(overrides) {
  return Object.assign(
    {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    },
    overrides
  );
}

function token(user) {
  return getUserToken(userData(user));
}

module.exports = {
  userData,
  messageData,
  messagesData,
  postData,
  loginForm,
  token,
  password: faker.internet.password,
  username: faker.internet.userName,
  id: faker.random.uuid,
  title: faker.lorem.words,
};
