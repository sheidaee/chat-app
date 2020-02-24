import { chatActionNameTypes, ChatState } from './types';

import { createReducer } from '../../store/utils';
import { updateObject } from '../../utilities';

export const settings = {
  interfaceColor: '1',
  clockDisplay: '1',
  sendMessageOnCtrlEnter: '2',
  language: 'en',
};

export const initialState: ChatState = {
  socket: null,
  user: null,
  users: null,
  receivedMessages: 0,
  readMessages: 0,
  chats: {
    community: {
      messages: [],
      typingUsers: [],
    },
  },
  activeChat: 'community',
  settings: {
    interfaceColor: '1',
    clockDisplay: '1',
    sendMessageOnCtrlEnter: '2',
    language: 'en',
  },
};

const messageReceived = (state: any, action: any) => {
  const { chat, reset, activeChat } = action.payload;

  if (reset) {
    return updateObject(state, {
      chats: {
        [activeChat]: chat,
      },
      receivedMessages: 0,
    });
  }

  const activeChatData = state.chats[state.activeChat];

  return updateObject(state, {
    chats: {
      ...state.chats,
      [state.activeChat]: {
        ...activeChatData,
        messages: [...activeChatData.messages, chat],
      },
    },

    receivedMessages:
      chat.sender !== state.user.id
        ? state.receivedMessages + 1
        : state.receivedMessages,
  });
};

const typing = (state: any, action: any) => {
  const { isTyping, userId } = action.payload; // also has chatId

  if (userId === state.user.id) {
    return state;
  }

  const chat = state.chats[state.activeChat];

  let typingUsers = [...chat.typingUsers];
  if (isTyping && !typingUsers.includes(userId)) {
    typingUsers.push(userId);
  } else if (!isTyping && typingUsers.includes(userId)) {
    typingUsers = typingUsers.filter(u => u !== userId);
  }

  return updateObject(state, {
    chats: {
      [state.activeChat]: {
        ...state.chats[state.activeChat],
        typingUsers,
      },
    },
  });
};

const addConnectedUsers = (state: any, action: any) => {
  return updateObject(state, { users: action.payload.users });
};

const userUpdated = (state: any, action: any) => {
  const { users, userId } = action.payload;

  return updateObject(state, {
    users: action.payload.users,
    user: state.user.id === userId ? users[userId] : state.user,
  });
};

const reducer = createReducer(initialState)({
  [chatActionNameTypes.INIT_SOCKET]: (state: ChatState, action: any) =>
    updateObject(state, { socket: action.payload.socket }),
  [chatActionNameTypes.USER_CONNECTED]: (state: ChatState, action: any) =>
    updateObject(state, { user: action.payload.user }),
  [chatActionNameTypes.ADD_CONNECTED_USERS]: (state: ChatState, action: any) =>
    addConnectedUsers(state, action),
  [chatActionNameTypes.MESSAGE_RECEIVED]: (state: ChatState, action: any) =>
    messageReceived(state, action),
  [chatActionNameTypes.TYPING]: (state: ChatState, action: any) =>
    typing(state, action),
  [chatActionNameTypes.USER_UPDATED]: (state: ChatState, action: any) =>
    userUpdated(state, action),
  [chatActionNameTypes.UPDATE_SETTINGS]: (state: ChatState, action: any) =>
    updateObject(state, {
      settings: { ...state.settings, ...action.payload.settings },
    }),
  [chatActionNameTypes.USER_READ_MESSAGES]: (state: ChatState, action: any) =>
    updateObject(state, { receivedMessages: 0 }),
});

export default reducer;
