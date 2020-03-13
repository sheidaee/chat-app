import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import useTranslation from '../../../../../hooks/useTranslation';
import { formatTime } from '../../../../../utilities/utility';

import './Messages.scss';

interface Messages {
  id: string;
  time: string;
  message: string;
  sender: string;
}

const Messages = () => {
  const chats = useSelector(({ app }: any) => app.chats);
  const activeChat = useSelector(({ app }: any) => app.activeChat);
  const user = useSelector(({ app }: any) => app.user);
  const users = useSelector(({ app }: any) => app.users);
  const clockDisplay = useSelector(({ app }: any) => app.settings.clockDisplay);
  const { t } = useTranslation();
  const containerRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  });

  const convertToTwentyFourHorse = clockDisplay === '2';

  return (
    <div
      className="threadContainer"
      ref={containerRef}
      data-testid="threadContainer"
    >
      <div className="thread">
        {chats[activeChat] &&
          chats[activeChat].messages.map(
            ({ id, time, message, sender }: Messages) => {
              return (
                <div
                  key={id}
                  className={`messageContainer ${sender === user.id &&
                    'right'}`}
                  data-testid="messageContainer"
                >
                  <div className="time">
                    {formatTime(time, convertToTwentyFourHorse)}
                  </div>
                  <div className="data">
                    <div className="message">{message}</div>
                    <div className="name">{users[sender].name}</div>
                  </div>
                </div>
              );
            }
          )}
        {chats[activeChat].typingUsers.map((userId: string) => (
          <div key={userId} className="typingUser">
            {`${users[userId].name} ${t('isTyping')} . . .`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
