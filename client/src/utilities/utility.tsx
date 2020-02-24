import { memo, ReactNode } from 'react';
import { SettingsFormValues } from '../features/chat/types';

/**
 * update old object immutable
 *
 * @param {object} oldObject
 * @param {object} updatedProperties
 * @returns updated object
 */
export function updateObject(oldObject: object, updatedProperties: object) {
  return {
    ...oldObject,
    ...updatedProperties,
  };
}

interface Roles {
  required: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  isNumeric?: boolean;
}

/**
 * validating form field
 *
 * @export
 * @param {string|number} value
 * @param {object} rules
 * @returns true if is valid
 */
export function checkValidity(value: any, rules: Roles) {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
}

/**
 * Joining strings with space
 *
 * @param {array|string} class names
 * @param {array} rest
 *
 * @returns {string} class names
 */
export function classNames(classes: string[] | string, ...rest: string[]) {
  if (classes && classes.constructor === Array) {
    return (classes as string[]).join(' ');
  }
  if (arguments[0] !== undefined) {
    return [...(classes as []), ...rest].join(' ');
  }

  return '';
}

export const validate = (values: SettingsFormValues) => {
  const errors: any = {};

  if (!values.username) errors.username = 'Please enter user name';

  return errors;
};

export const withMemo = (Component: ReactNode, checkedProps: any) => {
  function areEqual(prevProps: any, nextProps: any) {
    let isEqual = true;

    checkedProps.forEach((prop: string) => {
      if (prevProps[prop] !== nextProps[prop]) {
        isEqual = false;
      }
    });
    return isEqual;
  }

  return memo(Component as any, areEqual);
};

function convertTime12to24(time12h: string) {
  const [time, modifier] = time12h.split(' ');

  // eslint-disable-next-line prefer-const
  let [hours, minutes]: any = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
}

export function formatTime(str: string, twentyFourHours = false) {
  const date = new Date(str);

  let curHour: any = date.getHours();
  let minutes: any = date.getMinutes();
  let AMorPM: any;

  AMorPM = curHour >= 12 ? (AMorPM = 'PM') : (AMorPM = 'AM');
  curHour = curHour > 12 ? (curHour -= 12) : curHour;

  if (curHour < 10) curHour = `0${curHour}`;
  if (minutes < 10) minutes = `0${minutes}`;

  const finalDate = `${curHour}:${minutes} ${AMorPM}`;

  if (twentyFourHours) {
    return convertTime12to24(finalDate);
  }

  return finalDate;
}
