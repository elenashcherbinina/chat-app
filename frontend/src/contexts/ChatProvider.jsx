import React from 'react';
import { useSelector } from 'react-redux';

import { ChatContext } from '.';
import { useAuth } from '.';
import { getCurrentChannelId } from '../slices/selectors';

const TIMEOUT_REQUEST = 5000;

const ChatProvider = ({ socket, children }) => {
  const currentChannelId = useSelector(getCurrentChannelId);
  const { getUserName } = useAuth();

  const username = getUserName();

  const addMessage = async ({ message }) => {
    const messageData = {
      channelId: currentChannelId,
      text: message,
      user: username,
    };
    await socket.timeout(TIMEOUT_REQUEST).emit('newMessage', messageData);
  };

  const addChannel = async (channel) => {
    console.log('channel', channel);
    await socket.timeout(TIMEOUT_REQUEST).emit('newChannel', channel);
  };

  const removeChannel = async (id) => {
    await socket.timeout(TIMEOUT_REQUEST).emit('removeChannel', { id });
  };

  const renameChannel = async ({ id, name }) => {
    await socket.timeout(TIMEOUT_REQUEST).emit('renameChannel', { id, name });
  };

  return (
    <ChatContext.Provider value={{ addMessage, addChannel, removeChannel, renameChannel }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
