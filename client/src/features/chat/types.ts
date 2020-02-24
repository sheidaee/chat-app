export enum chatActionNameTypes {
  INIT_SOCKET = 'INIT_SOCKET',
  VERIFY_USER = 'VERIFY_USER',
  MESSAGE_SENT = 'MESSAGE_SENT',
  MESSAGE_RECEIVED = 'MESSAGE_RECEIVED',
  TYPING = 'TYPING',
  COMMUNITY_CHAT = 'COMMUNITY_CHAT',
  USER_CONNECTED = 'USER_CONNECTED',
  ADD_CONNECTED_USERS = 'ADD_CONNECTED_USERS',
  UPDATE_USER = 'UPDATE_USER',
  USER_UPDATED = 'USER_UPDATED',
  UPDATE_SETTINGS = 'UPDATE_SETTINGS',
  USER_READ_MESSAGES = 'USER_READ_MESSAGES',
}

interface InitSocket {
  type: typeof chatActionNameTypes.INIT_SOCKET;
}

interface UserConnectedAction {
  type: typeof chatActionNameTypes.USER_CONNECTED;
  payload: { user: User };
}

interface AddConnectedUsersAction {
  type: typeof chatActionNameTypes.ADD_CONNECTED_USERS;
  payload: { users: ConnectedUsers };
}

interface UpdateConnectedUsersAction {
  type: typeof chatActionNameTypes.USER_UPDATED;
  payload: { users: ConnectedUsers; userId: string };
}

interface SendMessageAction {
  type: typeof chatActionNameTypes.MESSAGE_SENT;
}

interface MessageReceivedAction {
  type: typeof chatActionNameTypes.MESSAGE_RECEIVED;
  payload: { chat: Chat; reset: boolean; activeChat: string };
}

interface TypingAction {
  type: typeof chatActionNameTypes.TYPING;
  payload: { isTyping: boolean; userId: string; chatId: string };
}

interface UpdateSettingsAction {
  type: typeof chatActionNameTypes.UPDATE_SETTINGS;
  payload: { settings: Settings };
}

interface UserReadMessagesAction {
  type: typeof chatActionNameTypes.USER_READ_MESSAGES;
  payload: { readMessages: number };
}

export interface ChatState {
  socket?: object | null;
  user?: User | null;
  users?: User | null;
  chats: object;
  activeChat?: string;
  settings: object | null;
  readMessages: number;
  receivedMessages: number;
}

export type ChatActionTypes =
  | InitSocket
  | UserConnectedAction
  | AddConnectedUsersAction
  | SendMessageAction
  | MessageReceivedAction
  | TypingAction
  | UpdateConnectedUsersAction
  | UpdateSettingsAction
  | UserReadMessagesAction;

/* General */
/*
id: "3de561db-2a49-4a0f-8788-e7f4c2826e5c"
name: "community"
messages: []
users: []
typingUsers: []
*/
export interface Chat {
  id: string;
  name: string;
  messages: [];
  users: [];
  typingUsers: [];
}

export interface User {
  id: string;
  name: string;
}

export interface ConnectedUsers {
  [key: string]: User;
}

export interface SettingsFormValues {
  username: string;
  interfaceColor: string;
  clockDisplay: string;
  sendMessageOnCtrlEnter: string;
  language: string;
}

export interface Settings {
  interfaceColor: string;
  clockDisplay: string;
  sendMessageOnCtrlEnter: string;
  language: string;
}
