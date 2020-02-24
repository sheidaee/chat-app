import React from 'react';
import { Classes } from '@blueprintjs/core';

import { Props } from './types';
import { withMemo } from '../../utilities/utility';

function TextField({
  id,
  name,
  value,
  onChange,
  type = 'text',
  className,
  autoComplete,
  placeholder,
  onKeyUp,
  callback,
}: Props) {
  return (
    <input
      className={`${Classes.INPUT} ${className}`}
      dir="auto"
      {...{
        id,
        name,
        value,
        onChange,
        type,
        autoComplete,
        placeholder,
        onKeyUp,
      }}
    />
  );
}

export default withMemo(TextField, ['value']);
