import React from 'react';
import { Create, FiberManualRecord, InsertComment } from '@material-ui/icons';
import { useQuery } from '@apollo/client';
import {
  useChannelDispatch,
  useChannelState
} from '../../contexts/ChannelContext';
import { queries } from '../../helpers/graphqlQueries';
import SidebarOption from './SidebarOption';

import './Sidebar.less';

const Sidebar = () => {
  const dispatch = useChannelDispatch();
  const { channels, loading } = useChannelState();

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
      <div className={'sidebar__header'}>
        <div className={'sidebar__info'}>
          <h2>Clever programmer</h2>
          <h3>
            <FiberManualRecord />
            Mads Brandt
          </h3>
        </div>
        <Create />
      </div>
      {channels.map((channel) => (
        <SidebarOption key={channel.id} id={channel.id} title={channel.name} />
      ))}
      <SidebarOption Icon={InsertComment} title={'Threads'} />
      <SidebarOption title={'Channel'} />
      <SidebarOption Icon={InsertComment} title={'Threads'} />
      <SidebarOption title={'Channel'} />
    </div>
  );
};

export default Sidebar;
