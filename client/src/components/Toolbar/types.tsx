import { ReactElement } from 'react';

export interface Props {
  link: string;
  exact?: boolean;
  children: ReactElement | string;
}
