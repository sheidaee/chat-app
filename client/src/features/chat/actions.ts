import { action } from 'typesafe-actions';

import {
  chatActionNameTypes,
  ChatActionTypes,
  Chat,
  User,
  ConnectedUsers,
  Settings,
} from './types';

export const initSocket = (socket: object): ChatActionTypes =>
  action(chatActionNameTypes.INIT_SOCKET, { socket });

export const userConnected = (user: User): ChatActionTypes =>
  action(chatActionNameTypes.USER_CONNECTED, { user });

export const addConnectedUsers = (users: ConnectedUsers): ChatActionTypes =>
  action(chatActionNameTypes.ADD_CONNECTED_USERS, { users });

interface UpdateConnectedUsers {
  users: ConnectedUsers;
  userId: string;
}

export const updateConnectedUsers = ({
  users,
  userId,
}: UpdateConnectedUsers): ChatActionTypes =>
  action(chatActionNameTypes.USER_UPDATED, { users, userId });

interface MessageReceived {
  chat: Chat;
  reset: boolean;
  activeChat: string;
}

export const messageReceived = ({
  chat,
  reset,
  activeChat,
}: MessageReceived): ChatActionTypes =>
  action(chatActionNameTypes.MESSAGE_RECEIVED, { chat, reset, activeChat });

interface Typing {
  isTyping: boolean;
  userId: string;
  chatId: string;
}

export const typing = ({ isTyping, userId, chatId }: Typing): ChatActionTypes =>
  action(chatActionNameTypes.TYPING, { isTyping, userId, chatId });

export const updateSettings = (settings: Settings): ChatActionTypes =>
  action(chatActionNameTypes.UPDATE_SETTINGS, { settings });

export const userReadMessages = (readMessages: number): ChatActionTypes =>
  action(chatActionNameTypes.USER_READ_MESSAGES, { readMessages });
