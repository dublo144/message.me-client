import React from 'react';
import moment from 'moment';
import './Message.less';

const Message = ({ message }) => {
  return (
    <div className={'message'}>
      <img
        src={'https://api.adorable.io/avatars/217/dublo@dublo.png'}
        alt='https://api.adorable.io/avatars/217/dublo@dublo.png'
      />
      <div className='message__info'>
        <h4>
          <strong>{message.user.username} </strong>
          <span className={'message__timestamp'}>
            {moment(Number(message.date)).fromNow()}
          </span>
        </h4>
        <p>{message.content}</p>
      </div>
    </div>
  );
};

export default Message;
