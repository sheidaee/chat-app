import React from 'react';
import { TextArea } from '@blueprintjs/core';

import { Props } from './types';

function TextAreaField(props: Props) {
  return <TextArea {...props} />;
}

export default TextAreaField;
