import React from 'react';
import { FaRocketchat } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';

import { CHAT_PAGE, SETTINGS_PAGE } from '../../../../utilities/constants';

interface NavigationContents {
  messageCounterClass: string | null;
  unreadMessages: string | null;
  t: (v: string) => string | null;
}

export default ({
  messageCounterClass,
  unreadMessages,
  t,
}: NavigationContents) => [
  {
    Icon: FaRocketchat,
    children: (
      <>
        {t('chat')}
        <span
          className={`messageCounter ${messageCounterClass}`}
          data-testid="messageCounter"
        >
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
