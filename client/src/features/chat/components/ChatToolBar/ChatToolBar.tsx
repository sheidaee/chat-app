import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import NavigationItems from '../../../../components/NavigationItems';
import useTranslation from '../../../../hooks/useTranslation';
import { chatOperations } from '../..';
import { withMemo } from '../../../../utilities/utility';
import { CHAT_PAGE } from '../../../../utilities/constants';
import navigationContents from './navigationContents';
import './ChatToolbar.scss';

const ChatToolbar = (props: any) => {
  const dispatch = useDispatch();
  const readMessages = useSelector(({ app }: any) => app.readMessages);
  const receivedMessages = useSelector(({ app }: any) => app.receivedMessages);
  const location = useLocation();

  const { t } = useTranslation();
  // eslint-disable-next-line radix
  let unreadMessages: any = parseInt(receivedMessages) - parseInt(readMessages);

  if (unreadMessages < 1 || location.pathname === CHAT_PAGE) {
    unreadMessages = '';
  }

  useEffect(() => {
    return () => {
      if (location.pathname === CHAT_PAGE) {
        dispatch(chatOperations.userReadMessages(0));
      }
    };
  });

  const messageCounterClass = unreadMessages ? 'blinking' : 'no-blinking';

  return (
    <div className="toolbar" data-testid="toolbar">
      <NavigationItems
        navigationContents={navigationContents({
          messageCounterClass,
          unreadMessages,
          t,
        })}
      />
    </div>
  );
};

export default withMemo(ChatToolbar, ['receivedMessages']);
