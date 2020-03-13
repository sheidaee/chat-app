import React from 'react';

import TextField from '../TextField';
import SelectField from '../SelectField';
import RadioGroupField from '../RadioGroupField';

import { classNames } from '../../utilities/utility';

export const CustomInputComponent = (render: any) => ({
  field,
  form: { touched, errors },
  errors: ajaxErrors,
  ...props
}: any) => {
  const fieldError = ajaxErrors ? ajaxErrors[field.name] : errors[field.name];

  return (
    <>
      <div className={props.captionClassName}>{props.label}</div>
      <div
        className={classNames(
          [props.dataClassName],
          'pt-form-group',
          'pt-intent-danger'
        )}
      >
        {render(field, props, touched[field.name], fieldError)}
        <div className="error pt-form-helper-text">
          {touched[field.name] || ajaxErrors ? fieldError : ''}
        </div>
      </div>
    </>
  );
};

export const RenderText = CustomInputComponent((input: any, rest: any) => (
  <TextField {...input} {...rest} />
));

export const RenderSelect = CustomInputComponent((input: any, rest: any) => {
  const { items, 'data-testid': dataTextid } = rest;

  return <SelectField {...input} items={items} data-testid={dataTextid} />;
});

export const RenderRadioGroup = CustomInputComponent(
  (input: any, rest: any) => {
    return <RadioGroupField {...input} items={rest.items} {...rest} />;
  }
);
