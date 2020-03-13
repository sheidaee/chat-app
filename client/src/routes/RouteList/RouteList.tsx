import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Props } from './types';
import { AppRoute } from '../types';
import Chat from '../../features/chat/components/Chat';
import Settings from '../../features/chat/components/Settings';
import {
  CHAT_PAGE,
  SETTINGS_PAGE,
  LOGIN_PAGE,
} from '../../utilities/constants';

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const user = useSelector(({ app }: any) => app.user);

  return (
    <Route
      render={props =>
        user ? <Component {...props} /> : <Redirect to={LOGIN_PAGE} />
      }
      {...rest}
    />
  );
};

const RouteList = ({ routes }: Props) => (
  <>
    <Switch>
      {routes.map(({ path, Component, exact, cprops }: AppRoute) => (
        <Route key={path} path={path} component={(props: any) => <Component {...props} {...cprops} />} exact={exact} />
      ))}
      <ProtectedRoute path={CHAT_PAGE} component={Chat} />
      <ProtectedRoute path={SETTINGS_PAGE} component={Settings} />
    </Switch>
  </>
);

export default RouteList;
