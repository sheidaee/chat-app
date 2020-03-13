import { Dispatch } from 'redux';

import {
  initSocket,
  userConnected,
  messageReceived,
  typing,
  addConnectedUsers,
  updateConnectedUsers,
  updateSettings,
  userReadMessages,
} from './actions';
import { chatActionNameTypes, Chat, User, ConnectedUsers } from './types';

interface StartSocket {
  socket: any;
}

const startSocket = ({ socket }: StartSocket) => (dispatch: Dispatch) => {
  try {
    socket.on('connect', () => {
      console.log('Connected');
    });

    dispatch(initSocket(socket));
  } catch (e) {
    console.log(e);
  }
};

interface VerifyUser {
  user: User;
  socket: any;
  callback: any;
}

const verifyUser = ({ user, socket, callback }: VerifyUser) => (
  dispatch: Dispatch
) => {
  try {
    socket.emit(chatActionNameTypes.VERIFY_USER, user, callback);
  } catch (e) {
    console.log(e);
  }
};

interface LoginUser {
  socket: any;
  user: User;
}

interface UserUpdated {
  users: ConnectedUsers;
  userId: string;
}

const loginUser = async ({ socket, user }: LoginUser) => (
  dispatch: Dispatch
) => {
  try {
    socket.emit(chatActionNameTypes.USER_CONNECTED, user);
    dispatch(userConnected(user));

    socket.on(
      chatActionNameTypes.USER_UPDATED,
      ({ users, userId }: UserUpdated) => {
        // debugger;
        dispatch(updateConnectedUsers({ users, userId }));
      }
    );
  } catch (e) {
    console.log(e);
  }
};

interface UpdateUser {
  socket: any;
  userId: string;
  newUserName: string;
  callback: any;
}

const updateUser = ({ socket, userId, newUserName, callback }: UpdateUser) => (
  dispatch: Dispatch
) => {
  try {
    socket.emit(
      chatActionNameTypes.UPDATE_USER,
      { userId, newUserName },
      callback
    );
  } catch (e) {
    console.log(e);
  }
};

interface UpdateTypingInChat {
  dispatch: Dispatch;
  chatId: string;
}

interface UpdateTypingInChatCallback {
  isTyping: boolean;
  userId: string;
}

const updateTypingInChat = ({ dispatch, chatId }: UpdateTypingInChat) => {
  return ({ isTyping, userId }: UpdateTypingInChatCallback) => {
    dispatch(typing({ isTyping, userId, chatId }));
  };
};

interface AddMessageToChat {
  dispatch: Dispatch;
  activeChat: string;
}

const addMessageToChat = ({ dispatch, activeChat }: AddMessageToChat) => {
  // console.log('addMessageToChat');

  return (message: Chat) => {
    dispatch(messageReceived({ chat: message, reset: false, activeChat }));
    // dispatch(userReadMessages());
  };
};

interface AddChat {
  chat: Chat;
  reset: boolean;
  activeChat: string;
  dispatch: Dispatch;
  socket: any;
}

const addChat = ({ chat, reset, activeChat, dispatch, socket }: AddChat) => {
  dispatch(messageReceived({ chat, reset, activeChat }));

  const messageEvent = `${chatActionNameTypes.MESSAGE_RECEIVED}-${chat.id}`;
  const typingEvent = `${chatActionNameTypes.TYPING}-${chat.id}`;

  socket.on(typingEvent, updateTypingInChat({ dispatch, chatId: chat.id }));
  socket.on(messageEvent, addMessageToChat({ dispatch, activeChat }));
};

const resetChat = (dispatch: Dispatch, socket: any, chat: Chat) => {
  addChat({ chat, reset: true, activeChat: chat.name, dispatch, socket });
};

interface CommunityChat {
  socket: any;
}

const communityChat = async ({ socket }: CommunityChat) => (
  dispatch: Dispatch
) => {
  try {
    socket.emit(
      chatActionNameTypes.COMMUNITY_CHAT,
      resetChat.bind(null, dispatch, socket)
    );

    socket.on(chatActionNameTypes.USER_CONNECTED, (users: ConnectedUsers) => {
      dispatch(addConnectedUsers(users));
    });
  } catch (e) {
    console.log(e);
  }
};

interface SendMessage {
  message: string;
  socket: any;
  activeChatId: string;
}

const sendMessage = ({ message, socket, activeChatId }: SendMessage) => (
  dispatch: Dispatch
) => {
  try {
    socket.emit(chatActionNameTypes.MESSAGE_SENT, {
      chatId: activeChatId,
      message,
    });
  } catch (e) {
    console.log(e);
  }
};

interface SendTyping {
  chatId: string;
  socket: any;
  isTyping: boolean;
  formSubmitted?: boolean;
}

const sendTyping = async ({
  chatId,
  socket,
  isTyping,
  formSubmitted,
}: SendTyping) => {
  try {
    // if (formSubmitted) {
    //   const typingEvent = `${chatActionNameTypes.TYPING}-${chatId}`;
    //   socket.off(typingEvent);
    //   return;
    // }

    socket.emit(chatActionNameTypes.TYPING, { chatId, isTyping });
  } catch (e) {
    console.log(e);
  }
};

export {
  startSocket,
  verifyUser,
  loginUser,
  sendMessage,
  communityChat,
  sendTyping,
  updateUser,
  updateSettings,
  userReadMessages,
  addMessageToChat,
};
