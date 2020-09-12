import React from 'react';
import { useHistory } from 'react-router-dom';

import './SidebarOption.less';

const SidebarOption = ({ Icon, title, id, addChannelOption }) => {
  const history = useHistory();

  const selectChannel = () => {
    if (id) history.push(`/channel/${id}`);
  };

  return (
    <div
      className={'sidebarOption'}
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon ? (
        <h3>
          <Icon className={'sidebarOption__icon'} /> {title}
        </h3>
      ) : (
        <h3 className={'sidebarOption__channel'}>
          <span className={'sidebarOption__hash'}>#</span> {title}
        </h3>
      )}
    </div>
  );
};

export default SidebarOption;
