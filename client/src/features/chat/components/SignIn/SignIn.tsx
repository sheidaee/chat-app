import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@blueprintjs/core';
import { IoIosLogIn } from 'react-icons/io';

import useInputChange from '../../../../hooks/inputField';
import { chatOperations } from '../..';
import { User } from '../../types';
import { CHAT_PAGE } from '../../../../utilities/constants';
import useTranslation from '../../../../hooks/useTranslation';

import styles from './SignIn.module.scss';

const Login = ({ history }: any) => {
  const socket = useSelector(({ app }: any) => app.socket);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [input, handleInputChange] = useInputChange();
  const [error, setError] = useState('');

  interface HandleSetUser {
    user: User;
    isUser: boolean;
  }

  const handleSetUser = async ({ user, isUser }: HandleSetUser) => {
    setError('');

    if (isUser) {
      setError(t('usernameTaken'));
      return;
    }

    dispatch(await chatOperations.loginUser({ socket, user }));

    dispatch(await chatOperations.communityChat({ socket }));

    history.push(CHAT_PAGE);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { user }: any = input;
    dispatch(
      chatOperations.verifyUser({ socket, user, callback: handleSetUser })
    );
  };

  useEffect(() => {
    if (socket) {
      return;
    }

    dispatch(chatOperations.startSocket());
  }, [dispatch, socket]);

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit}>
        <fieldset
          disabled={!socket}
          aria-busy={!socket}
          className={styles.loginForm}
        >
          <h3>{t('welcome')}</h3>
          <label htmlFor="user">
            <input
              type="text"
              name="user"
              placeholder={t('username')}
              required
              onChange={handleInputChange as () => void}
            />
          </label>
          {error && <div className={styles.error}>{error}</div>}
          <Button
            type="submit"
            className={styles.loginBtn}
            disabled={!socket}
            intent="success"
          >
            <IoIosLogIn />
            <span className={styles.loginBtnText}>{t('signIn')}</span>
          </Button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
