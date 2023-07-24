import React from 'react';
import { useSelector } from 'react-redux';

import Channel from './Channel';
import { getAllChannels } from '../slices/selectors';

const Channels = () => {
  const channels = useSelector(getAllChannels);

  return (
    <ul
      id='channels-box'
      className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'
    >
      {channels.map((channel) => {
        return <Channel key={channel.id} channel={channel} />;
      })}
    </ul>
  );
};

export default Channels;
