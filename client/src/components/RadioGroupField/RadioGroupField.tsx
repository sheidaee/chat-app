import React, { useState } from 'react';
import { Radio, RadioGroup, Classes } from '@blueprintjs/core';

import { classNames } from '../../utilities';
import { RadioGroupItem, Props } from './types';

import Styles from './RadioGroupField.module.scss';

function RadioGroupField(props: Props) {
  const { name, items, value, onChange, callback, ...rest } = props;

  const [selectedValue, setSelectedValue] = useState(value);

  const handleChange = (e: any) => {
    if (callback) {
      callback(name, e.target.value);
    }

    setSelectedValue(e.target.value);
  };

  return (
    <div className={classNames(Classes.INPUT, Styles.fillRadioGroup)}>
      <RadioGroup
        selectedValue={selectedValue}
        inline
        {...rest}
        label=""
        onChange={handleChange}
      >
        {items.map((item: RadioGroupItem) => (
          <Radio label={item.label} value={item.value} key={item.value} />
        ))}
      </RadioGroup>
    </div>
  );
}

export default RadioGroupField;
