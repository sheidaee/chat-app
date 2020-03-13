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
  'data-testid': dataTestid,
}: Props) {
  return (
    <input
      className={`${Classes.INPUT} ${className}`}
      dir="auto"
      data-testid={dataTestid}
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
