import React from 'react';
import { createStore } from 'redux';
import { cleanup } from '@testing-library/react';

import { formatTime } from '../../../../../utilities/utility';
import { renderWithRedux, generate } from 'til-client-test-utils';
import Messages from './Messages';

const newUser = generate.userData();
const user = { id: newUser.id, name: newUser.name };
const users = { [user.id]: user };

afterEach(cleanup);

test('should display Messages', async () => {
  const messages = generate.messagesData({
    count: 1,
    overrideMessage: { sender: user.id },
  });

  const chats: any = {
    community: {
      messages,
      typingUsers: [],
    },
  };

  const app = {
    user,
    users,
    chats,
    activeChat: 'community',
    settings: { clockDisplay: '1' },
  };

  const store = createStore(() => ({ app }));

  const { getAllByTestId, getByText } = renderWithRedux(<Messages />, {
    store,
  });

  const items = await getAllByTestId('messageContainer');
  const { time, message }: any = messages[0];

  expect(items).toHaveLength(1);
  expect(getByText(message)).toBeTruthy();
  expect(getByText(user.name)).toBeTruthy();
  expect(getByText(formatTime(time))).toBeTruthy();
});

test('should display all messages', async () => {
  const messages = generate.messagesData({
    count: 10,
    overrideMessage: { sender: user.id },
  });

  const chats: any = {
    community: {
      messages,
      typingUsers: [],
    },
  };

  const app = {
    user,
    users,
    chats,
    activeChat: 'community',
    settings: { clockDisplay: '1' },
  };

  const store = createStore(() => ({ app }));

  const { getAllByTestId } = renderWithRedux(<Messages />, {
    store,
  });

  const items = await getAllByTestId('messageContainer');

  expect(items).toHaveLength(10);
});

test('snapshot', async () => {
  const chats: any = {
    community: {
      messages: [],
      typingUsers: [],
    },
  };

  const app = {
    user,
    users,
    chats,
    activeChat: 'community',
    settings: { clockDisplay: '1' },
  };

  const store = createStore(() => ({ app }));

  const { container } = renderWithRedux(<Messages />, {
    store,
  });

  expect(container).toMatchSnapshot();
});
