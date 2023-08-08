import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatContext } from '.';
import { useAuth } from '.';
import { actions as messagesActions } from '../slices/messagesSlice';
import { actions as channelsActions } from '../slices/channelsSlice';

import { getCurrentChannelId } from '../slices/selectors';

const TIMEOUT_REQUEST = 5000;
const DEFAULT_CHANNEL = 1;

const ChatProvider = ({ socket, children }) => {
  const currentChannelId = useSelector(getCurrentChannelId);
  const { getUserName } = useAuth();
  const dispatch = useDispatch();

  const username = getUserName();

  const addMessage = async ({ message }) => {
    const messageData = {
      channelId: currentChannelId,
      text: message,
      user: username,
    };

    await socket.timeout(TIMEOUT_REQUEST).emit('newMessage', messageData);
    await socket.on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
    });
  };

  const addChannel = async ({ name }) => {
    await socket.timeout(TIMEOUT_REQUEST).emit('newChannel', { name });
    await socket.on('newChannel', (payload) => {
      dispatch(channelsActions.addChannel(payload));
      dispatch(channelsActions.setCurrentChannel(payload.id));
    });
  };

  const removeChannel = async (id) => {
    await socket.timeout(TIMEOUT_REQUEST).emit('removeChannel', { id });
    await socket.on('removeChannel', (payload) => {
      dispatch(channelsActions.removeChannel(payload.id));
      if (payload.id === currentChannelId) {
        dispatch(channelsActions.setCurrentChannel(DEFAULT_CHANNEL));
      }
    });
  };

  const renameChannel = async ({ id, name }) => {
    await socket.timeout(TIMEOUT_REQUEST).emit('renameChannel', { id, name });
    await socket.on('renameChannel', (payload) => {
      dispatch(channelsActions.renameChannel(payload));
    });
  };

  return (
    <ChatContext.Provider value={{ addMessage, addChannel, removeChannel, renameChannel }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
