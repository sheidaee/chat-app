import React from 'react';
import { NavLink } from 'react-router-dom';

import { Props } from './types';
import './NavigationItem.scss';

const navigationItem = ({ link, exact, children }: Props) => (
  <li className="NavigationItem">
    <NavLink
      to={link}
      exact={exact}
      activeClassName="active"
      data-testid={link}
    >
      {children}
    </NavLink>
  </li>
);

export default navigationItem;
