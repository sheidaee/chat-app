# Chat app

This project is a simple chat application to help you manage your customers.

### Screenshots

![login](https://github.com/sheidaee/chat-app/blob/master/screenshots/login.JPG)
![chat](https://github.com/sheidaee/chat-app/blob/master/screenshots/chat.JPG)
![settings](https://github.com/sheidaee/chat-app/blob/master/screenshots/settings.JPG)

## Application features

### Chat page

1. writing messages
2. is writing status for receiving messages
3. unread message counter
4. blinking when new message is received until is read, i.e. when the user is on Settings page

### Settings page

1. User name
2. Interface color

   - Light
   - Dark

3. Clock Display

   - 12 hours
   - 24 hours

4. Send messages on CTRL+ENTER

   - On
   - Off

## Getting Started

### Prerequisites

You'll need to install:

* Node.js
* React

### Running the app locally

* please install sever & client dependencies

  ```shell
  npm install
  ```

* To run the server app:

  ```shell
  npm run server
  ```

* To run the client app

  ```shell
  npm start
  ```

### Built With

* [Socket.io](http://socket.io/) - The back-end is built with Node.js and Socket.io for preparing live chat
* [React](https://reactjs.org/) - Used in front-end to build user interface
* [Blueprint](https://reactjs.org/) - A React-based UI toolkit to make UI more beautiful
* [Redux](https://redux.js.org/) - A state management for JavaScript Appps
* [Formik](https://github.com/jaredpalmer/formik) - Managing the form and auto saving
* [Typescript](https://www.typescriptlang.org/) - Type checking for javascript
* [Sass](https://sass-lang.com/) - Adds dynamic features to CSS
* [Lodash](https://lodash.com/) - helps you to write code in an Functional programming / immutability approach
