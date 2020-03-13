import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';

import { renderWithRedux, generate, initSocket } from 'til-client-test-utils';
import MessageInput from './MessageInput';
import * as chatOperations from '../../../operations';

const newUser = generate.userData();
const user = { id: newUser.id, name: newUser.name };
const users = { [user.id]: user };

const socket = initSocket({});
jest.mock('../../../operations', () => {
  // const actualChatOperations = require.requireActual('../../../operations');

  return {
    sendMessage: jest.fn(() => {
      return jest.fn();
    }),
  };
});

beforeEach(jest.clearAllMocks);

afterEach(cleanup);

test('should send Messages', async () => {
  const messageItem = generate.messageData({ sender: user.id });

  const chats: any = {
    community: {
      id: generate.id(),
      messages: [],
      typingUsers: [],
    },
  };

  const initialState = {
    socket,
    user,
    users,
    chats,
    activeChat: 'community',
    settings: { clockDisplay: '1' },
  };

  const { getByTestId, finishLoading, state } = renderWithRedux(
    <MessageInput />,
    {
      initialState,
    }
  );

  const messageNode = getByTestId('message');
  fireEvent.change(messageNode, { target: { value: messageItem.message } });
  getByTestId('sendMessageBtn').click();

  await finishLoading();

  const chat = state.app.chats[state.app.activeChat];
  const params = {
    activeChatId: chat.id,
    message: messageItem.message,
    socket: expect.any(Object),
  };

  expect(chatOperations.sendMessage).toBeCalledTimes(1);
  expect(chatOperations.sendMessage).toHaveBeenCalledWith(params);
});

test('should clean message field after sending Messages', async () => {
  const messageItem = generate.messageData({ sender: user.id });

  const chats: any = {
    community: {
      id: generate.id(),
      messages: [],
      typingUsers: [],
    },
  };

  const initialState = {
    socket,
    user,
    users,
    chats,
    activeChat: 'community',
    settings: { clockDisplay: '1' },
  };

  const { getByTestId, finishLoading } = renderWithRedux(<MessageInput />, {
    initialState,
  });

  const messageNode = getByTestId('message');
  fireEvent.change(messageNode, { target: { value: messageItem.message } });
  getByTestId('sendMessageBtn').click();

  await finishLoading();

  expect(messageNode.value).toEqual('');
});

test('should not send Messages when on CTRL+ENTER is no allowed', async () => {
  const messageItem = generate.messageData({ sender: user.id });

  const chats: any = {
    community: {
      id: generate.id(),
      messages: [],
      typingUsers: [],
    },
  };

  const initialState = {
    socket,
    user,
    users,
    chats,
    activeChat: 'community',
    settings: { clockDisplay: '1', sendMessageOnCtrlEnter: '1' },
  };

  const { getByTestId, finishLoading, state } = renderWithRedux(
    <MessageInput />,
    {
      initialState,
    }
  );

  const messageNode = getByTestId('message');
  fireEvent.change(messageNode, { target: { value: messageItem.message } });
  fireEvent.keyDown(messageNode, { ctrlKey: true, keyCode: 13 });

  await finishLoading();

  const chat = state.app.chats[state.app.activeChat];
  const params = {
    activeChatId: chat.id,
    message: messageItem.message,
    socket: expect.any(Object),
  };

  expect(chatOperations.sendMessage).toBeCalledTimes(1);
  expect(chatOperations.sendMessage).toHaveBeenCalledWith(params);
});

test('should send Messages on CTRL+ENTER', async () => {
  const messageItem = generate.messageData({ sender: user.id });

  const chats: any = {
    community: {
      id: generate.id(),
      messages: [],
      typingUsers: [],
    },
  };

  const initialState = {
    socket,
    user,
    users,
    chats,
    activeChat: 'community',
    settings: { clockDisplay: '1', sendMessageOnCtrlEnter: '2' },
  };

  const { getByTestId, finishLoading, state } = renderWithRedux(
    <MessageInput />,
    {
      initialState,
    }
  );

  const messageNode = getByTestId('message');
  fireEvent.change(messageNode, { target: { value: messageItem.message } });
  fireEvent.keyDown(messageNode, { ctrlKey: true, keyCode: 13 });

  await finishLoading();

  expect(chatOperations.sendMessage).toBeCalledTimes(0);
});

test('should not send Messages when there is no message', async () => {
  const { getByTestId, finishLoading, container } = renderWithRedux(
    <MessageInput />
  );

  const messageNode = getByTestId('message');
  fireEvent.change(messageNode, { target: { value: '' } });
  getByTestId('sendMessageBtn').click();

  await finishLoading();

  expect(chatOperations.sendMessage).toBeCalledTimes(0);
});

test('snapshot', async () => {
  const chats: any = {
    community: {
      id: generate.id(),
      messages: [],
      typingUsers: [],
    },
  };

  const initialState = {
    socket,
    user,
    users,
    chats,
    activeChat: 'community',
    settings: { clockDisplay: '1' },
  };

  const { container } = renderWithRedux(<MessageInput />, {
    initialState,
  });

  expect(container).toMatchSnapshot();
});
