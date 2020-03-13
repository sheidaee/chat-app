import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { renderWithRedux, generate, initSocket } from 'til-client-test-utils';
import Chat from './Chat';
import useTranslation from '../../../../hooks/useTranslation';

const newUser = generate.userData();
const user = { id: newUser.id, name: newUser.name };
const users = { [user.id]: user };

const socket = initSocket({});

afterEach(cleanup);

test('should load Toolbar, Messages and message input', async () => {
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

  const { getByTestId, finishLoading, container } = renderWithRedux(<Chat />, {
    initialState,
  });

  await finishLoading();

  expect(getByTestId('toolbar')).not.toBeEmpty();
  expect(getByTestId('threadContainer')).not.toBeEmpty();
  expect(getByTestId('messageForm')).not.toBeEmpty();
});

test('should not display load Toolbar, Messages and message input if there is no active chat', async () => {
  const {
    result: { current: translation },
  } = renderHook(useTranslation);

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
    activeChat: null,
    settings: { clockDisplay: '1' },
  };

  const { getByText, finishLoading } = renderWithRedux(<Chat />, {
    initialState,
  });

  await finishLoading();

  expect(getByText(translation.dictionary.chooseAChat)).toBeTruthy();
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

  const { container } = renderWithRedux(<Chat />, {
    initialState,
  });

  expect(container).toMatchSnapshot();
});
