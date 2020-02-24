import React from 'react';
import { Classes } from '@blueprintjs/core';

import { classNames } from '../../utilities';
import { SelectItem, Props } from './types';

import Styles from './SelectField.module.scss';

function SelectField(props: Props) {
  const { name, items, value, fillSelect, ...rest } = props;

  return (
    <div
      className={classNames(
        Classes.INPUT,
        fillSelect ? Styles.fillSelect : Styles.Select
      )}
    >
      <select name={name} value={value === null ? '...' : value} {...rest}>
        <option value="...">...</option>
        {items.map((item: SelectItem) => (
          <option value={item.value} key={item.value}>
            {item.caption}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
