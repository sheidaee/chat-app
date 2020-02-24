import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRocketchat } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import { useLocation } from 'react-router-dom';

import NavigationItems from '../../../../components/NavigationItems';
import useTranslation from '../../../../hooks/useTranslation';
import { chatOperations } from '../..';
import { withMemo } from '../../../../utilities/utility';
import { CHAT_PAGE, SETTINGS_PAGE } from '../../../../utilities/constants';

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

  const navigationContents: any = [
    {
      Icon: FaRocketchat,
      children: (
        <>
          {t('chat')}
          <span className={`messageCounter ${messageCounterClass}`}>
            {unreadMessages}
          </span>
        </>
      ),
      link: CHAT_PAGE,
    },
    {
      Icon: IoIosSettings,
      children: t('settings'),
      link: SETTINGS_PAGE,
    },
  ];

  return (
    <div className="toolbar">
      <NavigationItems navigationContents={navigationContents} />
    </div>
  );
};

export default withMemo(ChatToolbar, ['receivedMessages']);
