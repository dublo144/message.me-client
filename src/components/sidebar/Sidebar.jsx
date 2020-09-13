import React from 'react';
import { AccountCircle, ExitToApp } from '@material-ui/icons';
import { useQuery } from '@apollo/client';
import {
  useChannelDispatch,
  useChannelState
} from '../../contexts/ChannelContext';
import { queries } from '../../helpers/graphqlQueries';
import SidebarOption from './SidebarOption';

import './Sidebar.less';
import { useAuthState } from '../../contexts/AuthContext';
import { Avatar } from '@material-ui/core';
import StyledBadge from '../user/styledBadge/StyledBadge';

const Sidebar = () => {
  const dispatch = useChannelDispatch();
  const { channels, loading } = useChannelState();
  const { username, email } = useAuthState();

  const { loading: channelsLoading } = useQuery(queries.CHANNELS, {
    onCompleted: (data) => {
      dispatch({
        type: 'GET_CHANNELS_SUCCESS',
        payload: {
          channels: data.channels
        }
      });
    },
    onError: (error) =>
      dispatch({
        type: 'GET_CHANNELS_ERROR',
        payload: {
          error
        }
      })
  });

  React.useEffect(() => {
    dispatch({
      type: 'SET_LOADING',
      payload: {
        loading: channelsLoading
      }
    });
  }, [channelsLoading]);

  return (
    <div className={'sidebar'}>
      <div className='sidebar__userActions'>
        <AccountCircle />
        <ExitToApp />
      </div>
      <div className={'sidebar__header'}>
        <div className={'sidebar__userInfo'}>
          <StyledBadge
            overlap='circle'
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            variant='dot'
          >
            <Avatar
              className={'sidebar__avatar'}
              alt={username}
              src='https://api.adorable.io/avatars/217/dublo@dublo.png'
            />
          </StyledBadge>
          <h2>{username}</h2>
          <h3>{email}</h3>
        </div>
      </div>
      {channels.map((channel) => (
        <SidebarOption key={channel.id} id={channel.id} title={channel.name} />
      ))}
    </div>
  );
};

export default Sidebar;
