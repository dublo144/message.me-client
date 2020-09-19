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
import { useAuthDispatch, useAuthState } from '../../contexts/AuthContext';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from '@material-ui/core';
import StyledBadge from '../user/styledBadge/StyledBadge';

const Sidebar = () => {
  const dispatch = useChannelDispatch();
  const authDispatch = useAuthDispatch();
  const { channels, loading } = useChannelState();
  const { username, email } = useAuthState();
  const [dialogOpen, setDialogOpen] = React.useState(false);

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

  const signOut = () => {
    authDispatch({
      type: 'SIGN_OUT'
    });
    setDialogOpen(false);
  };

  React.useEffect(() => {
    dispatch({
      type: 'SET_LOADING',
      payload: {
        loading: channelsLoading
      }
    });
  }, [channelsLoading]);

  return (
    <>
      <div className={'sidebar'}>
        <div className='sidebar__userActions'>
          <IconButton>
            <AccountCircle />
          </IconButton>
          <IconButton onClick={() => setDialogOpen(true)}>
            <ExitToApp />
          </IconButton>
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
          <SidebarOption
            key={channel.id}
            id={channel.id}
            title={channel.name}
          />
        ))}
      </div>

      <Dialog open={dialogOpen}>
        <DialogTitle id='alert-dialog-title'>
          Are you sure you want to logout?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            We will miss you.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color='primary'>
            Cancel
          </Button>
          <Button onClick={signOut} color='primary' autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;
