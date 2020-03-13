import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@blueprintjs/core';
import { IoIosLogIn } from 'react-icons/io';

import useInputChange from '../../../../hooks/inputField';
import { chatOperations } from '../..';
import { User } from '../../types';
import { CHAT_PAGE } from '../../../../utilities/constants';
import useTranslation from '../../../../hooks/useTranslation';

import styles from './SignIn.module.scss';

const Login = ({ history, socket: initSocket }: any) => {
  const socket = useSelector(({ app }: any) => app.socket);
  const user = useSelector(({ app }: any) => app.user);
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

    if (!user) {
      return;
    }

    dispatch(
      chatOperations.verifyUser({ socket, user, callback: handleSetUser })
    );
  };

  useEffect(() => {
    if (socket || !initSocket) {
      return;
    }

    dispatch(chatOperations.startSocket({ socket: initSocket }));
  }, [dispatch, socket, initSocket]);

  if (user) {
    return <Redirect to={CHAT_PAGE} />;
  }

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit}>
        <fieldset
          disabled={!socket}
          aria-busy={!socket}
          className={styles.loginForm}
          data-testid="fieldset"
        >
          <h3>{t('welcome')}</h3>
          <label htmlFor="user">
            <input
              type="text"
              name="user"
              placeholder={t('username')}
              required
              onChange={handleInputChange as () => void}
              data-testid="user"
            />
          </label>
          {error && (
            <div className={styles.error} data-testid="errorMessageContainer">
              {error}
            </div>
          )}
          <Button
            type="submit"
            className={styles.loginBtn}
            disabled={!socket}
            intent="success"
            data-testid="signInBtn"
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
