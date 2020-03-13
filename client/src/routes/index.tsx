import SignIn from '../features/chat/components/SignIn';
import io from 'socket.io-client';

import { SOCKET_URL } from '../utilities/constants';
import { AppRoute } from './types';

const socket = io(SOCKET_URL);

const routes: AppRoute[] = [
  {
    path: '/',
    Component: SignIn,
    exact: true,
    cprops: {
      socket
    }
  },
];

export default routes;
