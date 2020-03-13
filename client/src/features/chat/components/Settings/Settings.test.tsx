import React from 'react';
import {
  cleanup,
  fireEvent,
  waitForElement,
  act,
} from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { renderWithRedux, generate, initSocket } from 'til-client-test-utils';
import Settings from './Settings';
import useTranslation from '../../../../hooks/useTranslation';
import * as chatOperations from '../../operations';

jest.mock('../../operations', () => {
  // const actualChatOperations = require.requireActual('../../operations');

  return {
    updateUser: jest.fn(() => {
      return jest.fn();
    }),
    updateSettings: jest.fn(() => {
      return jest.fn();
    }),
  };
});

const user = { id: 'abc', name: 'Mike' };
const users = { [user.id]: user };

const socket = initSocket({});

beforeEach(jest.clearAllMocks);

afterEach(cleanup);

test('should display default settings', async () => {
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
    settings: { clockDisplay: '1', language: 'en' },
  };

  const {
    result: { current: translation },
  } = renderHook(useTranslation);

  const { getByText, getByTestId } = renderWithRedux(<Settings />, {
    initialState,
  });

  expect(getByText(translation.dictionary.interfaceColor)).not.toBeEmpty();
  expect(getByText(translation.dictionary.clockDisplay)).not.toBeEmpty();
  expect(
    getByText(translation.dictionary.sendMessageOnCtrlEnter)
  ).not.toBeEmpty();
  expect(getByTestId('language').value).toEqual('en');
});

test('should save settings', async () => {
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
    settings: { clockDisplay: '1', language: 'en' },
  };

  const { getByTestId } = renderWithRedux(<Settings />, {
    initialState,
  });

  await act(async () => {
    const usernameNode = await waitForElement(() => getByTestId('username'));

    fireEvent.change(usernameNode, { target: { value: 'newUser' } });
  });

  expect(chatOperations.updateUser).toBeCalledTimes(1);
  expect(chatOperations.updateUser).toHaveBeenCalledWith(
    expect.objectContaining({
      newUserName: 'newUser',
      userId: 'abc',
    })
  );

  expect(chatOperations.updateSettings).toBeCalledTimes(1);
  expect(chatOperations.updateSettings).toHaveBeenCalledWith(
    expect.objectContaining({
      clockDisplay: '1',
      language: 'en',
    })
  );
});

test('snapshot in English language', async () => {
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
    settings: { clockDisplay: '1', language: 'en' },
  };

  const { container } = renderWithRedux(<Settings />, {
    initialState,
  });

  expect(container).toMatchSnapshot();
});
