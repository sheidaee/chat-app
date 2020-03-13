import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@blueprintjs/core';

import { chatOperations } from '../../..';

import TextAreaField from '../../../../../components/TextAreaField';
import useTranslation from '../../../../../hooks/useTranslation';
import './MessageInput.scss';

const MessageInput = () => {
  const dispatch = useDispatch();
  const socket = useSelector(({ app }: any) => app.socket);
  const chats = useSelector(({ app }: any) => app.chats);
  const activeChat = useSelector(({ app }: any) => app.activeChat);
  const sendOnCtrlEnterSettings = useSelector(
    ({ app }: any) => app.settings.sendMessageOnCtrlEnter
  );
  const { t } = useTranslation();

  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const lastUpdateTime = useRef(-1);
  const typingIntervalRef = useRef<NodeJS.Timeout>();

  function stopCheckingTyping() {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      chatOperations.sendTyping({
        isTyping: false,
        socket,
        chatId: chats[activeChat].id,
      });
    }
  }

  function startCheckingTyping() {
    typingIntervalRef.current = setInterval(() => {
      if (Date.now() - lastUpdateTime.current > 300) {
        setIsTyping(false);
        stopCheckingTyping();
      }
    }, 300);
  }

  async function sendTyping() {
    lastUpdateTime.current = Date.now();
    if (!isTyping) {
      setIsTyping(true);

      await chatOperations.sendTyping({
        isTyping: true,
        socket,
        chatId: chats[activeChat].id,
      });

      startCheckingTyping();
    }
  }

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    dispatch(
      chatOperations.sendMessage({
        message,
        socket,
        activeChatId: chats[activeChat].id,
      })
    );

    setMessage('');
  };

  const handleKeyUp = async (e: React.KeyboardEvent) => {
    if (e.keyCode !== 13) {
      await sendTyping();
    }
  };

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (
      event.ctrlKey &&
      event.keyCode === 13 &&
      sendOnCtrlEnterSettings === '1'
    ) {
      event.preventDefault();
      event.stopPropagation();

      handleSubmit(event);
    }
  };

  return (
    <div className="messageInput">
      <form
        onSubmit={handleSubmit}
        className="messageForm"
        data-testid="messageForm"
      >
        <TextAreaField
          name="message"
          id="message"
          className="formControl"
          value={message}
          autoComplete="off"
          placeholder={t('typePlaceHolder')}
          onKeyUp={handleKeyUp}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          data-testid="message"
        />
        <Button
          disabled={message.length < 1}
          type="submit"
          className="sendBtn"
          data-testid="sendMessageBtn"
        >
          {t('send')}
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
