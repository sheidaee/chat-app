import React, { useState } from 'react';
import { Field, connect } from 'formik';
import { Button } from '@blueprintjs/core';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  RenderText,
  RenderSelect,
  RenderRadioGroup,
} from '../../../../components/Form';
import {
  interfaceColorItems,
  clockDisplayItems,
  onOffItems,
  languageItems,
  CHAT_PAGE,
} from '../../../../utilities/constants';
import Fieldset from '../../../../components/Fieldset';
import usePrevious from '../../../../hooks/usePrevious';
import { PropsWithFormik } from './types';
import AutoSaveFormik from '../../../../components/AutoSaveFormik';
import { chatOperations } from '../..';
import useTranslation from '../../../../hooks/useTranslation';
import { settings as defaultSettings } from '../../reducers';

import './Settings.scss';

const EditSettingsContent: React.FC<PropsWithFormik> = ({
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  loading,
  values,
  setFieldValue,
  validateForm,
  errors,
}) => {
  const user = useSelector(({ app }: any) => app.user);
  const socket = useSelector(({ app }: any) => app.socket);
  const [updateUserError, setUpdateUserError] = useState('');
  const dispatch = useDispatch();
  const getPreviousValues: any = usePrevious(values);
  const { t, language, setLanguage }: any = useTranslation();
  const history = useHistory();

  interface UpdateUserCallback {
    updated: boolean;
    message?: string;
  }

  const updateUserCallback = ({ updated, message }: UpdateUserCallback) => {
    if (!updated && message) {
      setUpdateUserError(message);
    }
  };

  const formFields: any = [
    {
      name: 'username',
      label: t('username'),
      component: RenderText,
      // callback: handleKeyUp,
    },
    {
      name: 'interfaceColor',
      label: t('interfaceColor'),
      component: RenderRadioGroup,
      items: interfaceColorItems[language.value],
      callback: setFieldValue,
    },
    {
      name: 'clockDisplay',
      label: t('clockDisplay'),
      component: RenderRadioGroup,
      items: clockDisplayItems[language.value],
      callback: setFieldValue,
    },
    {
      name: 'sendMessageOnCtrlEnter',
      label: t('sendMessageOnCtrlEnter'),
      component: RenderRadioGroup,
      items: onOffItems[language.value],
      callback: setFieldValue,
    },
    {
      name: 'language',
      label: t('language'),
      component: RenderSelect,
      items: languageItems,
      callback: setFieldValue,
    },
  ];

  const AutoSaveForm = connect(AutoSaveFormik);

  const saveForm = (newValues: any) => {
    if (newValues.username && newValues.username !== user.name) {
      setUpdateUserError('');
      dispatch(
        chatOperations.updateUser({
          newUserName: newValues.username,
          userId: user.id,
          socket,
          callback: updateUserCallback,
        })
      );
    }

    const { username, ...settings } = newValues;

    dispatch(chatOperations.updateSettings(settings));

    setLanguage(languageItems.find(lng => lng.value === settings.language));
  };

  const handleResetToDefault = () => {
    dispatch(chatOperations.updateSettings(defaultSettings));

    setLanguage(
      languageItems.find(lng => lng.value === defaultSettings.language)
    );

    history.push(CHAT_PAGE);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <Fieldset disabled={isSubmitting} aria-busy={isSubmitting}>
          <div className="row">
            <span className="error">{updateUserError}</span>
          </div>
          <div className="row">
            {formFields.map(
              ({
                name,
                label,
                component,
                callback,
                formatNumber,
                items,
                onKeyUp,
              }: any) => (
                <div key={name}>
                  <Field
                    name={name}
                    label={label}
                    component={component}
                    captionClassName="formCaption"
                    dataClassName="formData"
                    data-testid={name}
                    callback={callback}
                    formatNumber={formatNumber}
                    items={items}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                  />
                </div>
              )
            )}
          </div>
          <div className="pt-dialog-footer-actions actionBar">
            <Button text={t('resetToDefault')} onClick={handleResetToDefault} />
            {/* <Button
              text="save"
              type="submit"
              intent={Intent.PRIMARY}
              disabled={isSubmitting || loading}
            /> */}
          </div>
        </Fieldset>
      </form>
      <AutoSaveForm values={getPreviousValues} onSave={saveForm} />
    </>
  );
};

export default EditSettingsContent;
