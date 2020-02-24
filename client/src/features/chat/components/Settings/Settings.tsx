import React from 'react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';

import ChatToolbar from '../ChatToolBar/ChatToolBar';
import { validate } from '../../../../utilities/utility';
import EditSettingsContent from './EditSettingsContent';
import { SettingsFormValues } from '../../types';
import './Settings.scss';

const Settings = (props: any) => {
  const user = useSelector(({ app }: any) => app.user);
  const settings = useSelector(({ app }: any) => app.settings);

  const initialValues = {
    username: user.name,
    ...settings,
  };

  const settingsHandleSubmit = async (
    formValues: SettingsFormValues,
    actions: any
  ) => {
    // const {
    //   username,
    //   interfaceColor,
    //   clockDisplay,
    //   sendMessageOnCtrlEnter,
    //   language,
    // } = formValues;
  };

  const loading = false;
  return (
    <div className="settings">
      <ChatToolbar />
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={settingsHandleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          validateForm,
        }) => (
          <EditSettingsContent
            {...{
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              validateForm,
            }}
            {...props}
            loading={loading}
          />
        )}
      </Formik>
    </div>
  );
};

export default Settings;
