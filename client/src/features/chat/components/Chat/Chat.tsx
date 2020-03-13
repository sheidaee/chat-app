import React from 'react';
import { useSelector } from 'react-redux';

import Messages from './Messages';
import MessageInput from './MessageInput';
import ChatToolbar from '../ChatToolBar/ChatToolBar';
import useTranslation from '../../../../hooks/useTranslation';

import './Chat.scss';

const Chat = () => {
  const activeChat = useSelector(({ app }: any) => app.activeChat);
  const { t } = useTranslation();

  return (
    <div className="chatContainer">
      <div className="chatRoomContainer">
        {activeChat !== null ? (
          <div className="chatRoom">
            <ChatToolbar />
            <Messages />
            <MessageInput />
          </div>
        ) : (
          <div className="chatRoom choose">
            <h3>{t('chooseAChat')}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
