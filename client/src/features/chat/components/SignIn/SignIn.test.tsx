import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { fireEvent, cleanup } from '@testing-library/react';

import {
  renderWithRedux,
  history as mockHistory,
  initSocket,
  generate,
} from 'til-client-test-utils';
import SignIn from './SignIn';
import useTranslation from '../../../../hooks/useTranslation';
import * as chatOperations from '../../operations';
import { CHAT_PAGE } from '../../../../utilities/constants';

jest.mock('../../operations', () => {
  // const actualChatOperations = require.requireActual('../../operations');

  return {
    startSocket: jest.fn(() => {
      return jest.fn();
    }),
    loginUser: jest.fn(() => {
      return jest.fn();
    }),
    communityChat: jest.fn(() => {
      return jest.fn();
    }),
    verifyUser: jest.fn(() => {
      return jest.fn();
    }),
  };
});

const socket = initSocket({});

beforeEach(jest.clearAllMocks);

afterEach(cleanup);

test('if user does not input username, handle submit is not called', async () => {
  const handleSubmit = jest.fn();

  const { getByTestId, history, finishLoading } = renderWithRedux(
    <SignIn onSubmit={handleSubmit} socket={socket} history={mockHistory} />
  );
  const usernameNode = getByTestId('user');

  fireEvent.change(usernameNode, { target: { value: '' } });
  getByTestId('signInBtn').click();

  await finishLoading();

  expect(handleSubmit).toHaveBeenCalledTimes(0);

  expect(history.location.pathname).not.toContain('chat');
});

test('should start socket', async () => {
  renderWithRedux(<SignIn socket={socket} history={mockHistory} />);

  expect(chatOperations.startSocket).toHaveBeenCalledTimes(1);
});

test('login as a new user', async () => {
  const chats: any = {
    community: {
      id: generate.id(),
      messages: [],
      typingUsers: [],
    },
  };

  const initialState = {
    socket,
    user: null,
    users: [],
    chats,
    activeChat: 'community',
    settings: { clockDisplay: '1' },
  };

  const fakeUser = generate.loginForm();

  const { getByTestId, history, finishLoading } = renderWithRedux(
    <SignIn socket={socket} history={mockHistory} />,
    { initialState }
  );
  const usernameNode = getByTestId('user');

  fireEvent.change(usernameNode, { target: { value: fakeUser.username } });
  // fireEvent.click(getByTestId('signInBtn'));
  getByTestId('signInBtn').click();

  await finishLoading();

  expect(chatOperations.verifyUser).toHaveBeenCalledTimes(1);
  expect(chatOperations.verifyUser).toHaveBeenCalledWith(
    expect.objectContaining({
      user: fakeUser.username,
    })
  );

  // redirect to chat page - verifyUser is mocked and this does not work
  // expect(history.location.pathname).toContain('chat');
});

test('redirect to chat page if user is login', async () => {
  const fakeUser = generate.loginForm();

  const chats: any = {
    community: {
      id: generate.id(),
      messages: [],
      typingUsers: [],
    },
  };

  const initialState = {
    socket,
    user: fakeUser,
    users: [],
    chats,
    activeChat: 'community',
    settings: { clockDisplay: '1' },
  };

  const { history, finishLoading } = renderWithRedux(
    <SignIn socket={socket} history={mockHistory} />,
    {
      initialState,
    }
  );

  await finishLoading();

  expect(history.location.pathname).toEqual(CHAT_PAGE);
});

test('do not allow login if server is not available', async () => {
  const handleSubmit = jest.fn();

  const { getByTestId } = renderWithRedux(
    <SignIn onSubmit={handleSubmit} socket={null} history={mockHistory} />
  );

  const fieldset = getByTestId('fieldset');

  expect(fieldset.getAttribute('aria-busy')).toBeTruthy();
});

test('throw error when user exist', async () => {
  (chatOperations.verifyUser as any).mockImplementation(
    ({ socket, user, callback }: any) => {
      return jest.fn(dispatch => {
        callback({ isUser: true });
      });
    }
  );

  const {
    result: { current: translation },
  } = renderHook(useTranslation);

  const socket = initSocket({ isUser: true });

  const chats: any = {
    community: {
      id: generate.id(),
      messages: [],
      typingUsers: [],
    },
  };

  const initialState = {
    socket,
    user: null,
    users: [],
    chats,
    activeChat: 'community',
    settings: { clockDisplay: '1' },
  };

  const fakeUser = generate.loginForm();

  const { getByTestId, finishLoading } = renderWithRedux(
    <SignIn socket={socket} history={mockHistory} />,
    { initialState }
  );
  const usernameNode = getByTestId('user');

  fireEvent.change(usernameNode, { target: { value: fakeUser.username } });
  getByTestId('signInBtn').click();

  await finishLoading();

  expect(getByTestId('errorMessageContainer').textContent).toEqual(
    translation.dictionary.usernameTaken
  );
});

test('snapshot', () => {
  const chats: any = {
    community: {
      id: generate.id(),
      messages: [],
      typingUsers: [],
    },
  };

  const initialState = {
    socket,
    user: null,
    users: [],
    chats,
    activeChat: 'community',
    settings: { clockDisplay: '1' },
  };

  const { container } = renderWithRedux(
    <SignIn socket={socket} history={mockHistory} />,
    { initialState }
  );

  expect(container).toMatchSnapshot();
});

test('error message snapshot', async () => {
  (chatOperations.verifyUser as any).mockImplementation(
    ({ socket, user, callback }: any) => {
      return jest.fn(dispatch => {
        callback({ isUser: true });
      });
    }
  );

  const socket = initSocket({ isUser: true });

  const chats: any = {
    community: {
      id: generate.id(),
      messages: [],
      typingUsers: [],
    },
  };

  const initialState = {
    socket,
    user: null,
    users: [],
    chats,
    activeChat: 'community',
    settings: { clockDisplay: '1' },
  };

  const fakeUser = generate.loginForm();

  const { container, getByTestId, finishLoading } = renderWithRedux(
    <SignIn socket={socket} history={mockHistory} />,
    { initialState }
  );
  const usernameNode = getByTestId('user');

  fireEvent.change(usernameNode, { target: { value: fakeUser.username } });
  getByTestId('signInBtn').click();

  await finishLoading();

  expect(container).toMatchSnapshot();
});
