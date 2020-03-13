import { Store, createStore, applyMiddleware, combineReducers } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import throttle from 'lodash/throttle';

import { createLogger } from './middleware';
import { loadState, saveState } from './utils/localStorage';

import chatReducer, {
  initialState as chatInitialState,
  settings as initialSettings,
} from '../features/chat/reducers';
import { ApplicationState, ChatP } from './types';

const rootReducer = combineReducers<ApplicationState>({
  app: chatReducer,
});

export const createRootReducer = () => rootReducer;
//----------------

export default function configureStore(
  initialState: any = {}
): Store<ApplicationState> {
  let middleware = applyMiddleware(thunkMiddleware, createLogger(false));

  // create the composing function for our middle wares
  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const prevState = loadState();

  const persistedState: ChatP = {
    app: {
      ...chatInitialState,
      settings: prevState ? prevState.settings : initialSettings,
      ...initialState,
    },
  };

  const store = createStore(createRootReducer(), persistedState, middleware);

  store.subscribe(
    throttle(() => {
      saveState({ settings: (store.getState() as any).app.settings });
    }, 1000)
  );

  return store;
}
