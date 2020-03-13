import React from 'react';
import { Router } from 'react-router-dom';
import { render, wait } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import * as generate from 'til-shared/generate';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from '../src/store';

import { LanguageProvider } from '../src/context/LanguageProvider';

const history = createMemoryHistory(); // {initialEntries: ['/']}

const waitFor = (amount = 0) =>
  new Promise(resolve => setTimeout(resolve, amount));

const initSocket = ({ isUser = false }) => ({
  on: jest.fn((action, ...params) => {
    console.log('on', action);
  }),
  emit: jest.fn((action, ...params) => {
    const { user, callback, message, chatId } = params;
    console.log(params);

    console.log('emit', action);

    if (callback) {
      console.log({ callback });
      callback({ user, isUser, message, chatId });
    }
  }),
});

function renderWithRouter(ui, { route = '/', ...renderOptions } = {}) {
  const history = createMemoryHistory({ initialEntries: [route] });
  const utils = render(<Router history={history}>{ui}</Router>, renderOptions);
  const finishLoading = () =>
    wait(() => expect(utils.queryByText('Loading')).toBeNull());
  return {
    ...utils,
    finishLoading,
    history,
  };
} /*

{
  "app": {
    "socket": null,
    "user": null,
    "users": null,
    "receivedMessages": 0,
    "readMessages": 0,
    "chats": {
      "community": {
        "messages": [],
        "typingUsers": []
      }
    },
    "activeChat": "community",
    "settings": {
      "interfaceColor": "1",
      "clockDisplay": "1",
      "sendMessageOnCtrlEnter": "2",
      "language": "en"
    }
  }
}
*/
function renderWithRedux(
  ui,
  {
    initialState = {},
    store = configureStore(initialState),
    ...renderOptions
  } = {}
) {
  const state = store.getState();

  const utils = render(
    <ReduxProvider store={store}>
      <Router history={history}>
        <LanguageProvider>{ui}</LanguageProvider>
      </Router>
    </ReduxProvider>,
    renderOptions
  );

  const finishLoading = () =>
    wait(() => expect(utils.queryByText('Loading')).toBeNull());

  return {
    ...utils,
    finishLoading,
    store,
    state,
    history,
  };
}

function renderWithLanguageProvider(ui, { ...renderOptions } = {}) {
  const utils = render(
    <LanguageProvider>{ui}</LanguageProvider>,
    renderOptions
  );

  return {
    ...utils,
  };
}

export {
  Simulate,
  wait,
  render,
  cleanup,
  renderIntoDocument,
  fireEvent,
} from '@testing-library/react';
export {
  renderWithRouter,
  renderWithRedux,
  renderWithLanguageProvider,
  history,
  initSocket,
  generate,
};
