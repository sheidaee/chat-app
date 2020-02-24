import React from 'react';

import { Props } from './types';

const Fieldset = ({ className, children, ...otherProps }: Props) => (
  <fieldset {...otherProps} className={`fieldset ${className}`}>
    {children}
  </fieldset>
);

export default Fieldset;
