import React from 'react';
import { Card } from 'react-bootstrap';

const Message = ({ message }) => {
  return (
    <div className='text-break mb-2'>
      <b>{message.user}</b>
      {': '}
      {message.text}
    </div>
  );
};

export default Message;

// {/* <div className={`d-flex ${message.user ? 'justify-content-end' : ''}`}>
// <div bg={`${message.user ? 'info' : 'secondary'}`}>
//   <b className='d-flex justify-content-between align-items-center'>{message.user}</b>
// </div>
// <div className='d-flex justify-content-between align-items-center'>{message.text}</div>
// </div> */}
