import React from 'react';
import { useSelector } from 'react-redux';
import { Props } from './types';

import themes from '../theme';

function Layout({ children }: Props) {
  const themeValue = useSelector(({ app }: any) => app.settings.interfaceColor);
  const currentThemeName = themes[themeValue - 1];
  return <main className={`theme-${currentThemeName}`}>{children}</main>;
}

export default Layout;
