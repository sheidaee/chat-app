import React from 'react';

import NavigationItem from '../NavigationItem';
import { Props, NavigationItemP } from './types';

import styles from './NavigationItems.module.scss';

const navigationItems = ({ navigationContents }: Props) => (
  <ul className={styles.NavigationItems}>
    {navigationContents.map(({ Icon, children, link }: NavigationItemP) => (
      <NavigationItem key={link} link={link}>
        <Icon />
        <span>{children}</span>
      </NavigationItem>
    ))}
  </ul>
);

export default navigationItems;
