import SignIn from '../features/chat/components/SignIn';

import { AppRoute } from './types';

const routes: AppRoute[] = [
  {
    path: '/',
    component: SignIn,
    exact: true,
  },
];

export default routes;
