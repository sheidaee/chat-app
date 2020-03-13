import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { renderWithRedux, generate, initSocket } from 'til-client-test-utils';
import ChatToolBar from './ChatToolBar';
import navigationContents from './navigationContents';
import useTranslation from '../../../../hooks/useTranslation';

jest.mock('./navigationContents', () => {
  const { default: actualNavigationContents } = require.requireActual(
    './navigationContents'
  );

  return jest.fn(({ messageCounterClass, t, unreadMessages }) =>
    actualNavigationContents({ messageCounterClass, t, unreadMessages })
  );
});

const newUser = generate.userData();
const user = { id: newUser.id, name: newUser.name };
const users = { [user.id]: user };

const socket = initSocket({});

afterEach(cleanup);

test('should display menu items', async () => {
  const {
    result: { current: translation },
  } = renderHook(useTranslation);

  const { getByText } = renderWithRedux(<ChatToolBar />);

  expect(navigationContents).toHaveBeenCalledTimes(1);
  expect(getByText(translation.dictionary.chat)).toBeTruthy();
  expect(getByText(translation.dictionary.settings)).toBeTruthy();
});

test('should blinking for unreadMessages if user is not in chat tab', async () => {
  const chats: any = {
    community: {
      id: generate.id(),
      messages: [],
      typingUsers: [],
    },
  };

  const initialState = {
    receivedMessages: 1,
    readMessages: 0,
    socket,
    user,
    users,
    chats,
    activeChat: 'community',
    settings: { clockDisplay: '1' },
  };

  const { getByTestId, finishLoading } = renderWithRedux(<ChatToolBar />, {
    initialState,
  });

  await finishLoading();

  expect(getByTestId('messageCounter').textContent).toEqual('1');
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
    receivedMessages: 1,
    readMessages: 0,
    socket,
    user,
    users,
    chats,
    activeChat: 'community',
    settings: { clockDisplay: '1' },
  };

  const { container } = renderWithRedux(<ChatToolBar />, {
    initialState,
  });

  expect(container).toMatchSnapshot();
});
