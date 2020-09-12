import React from 'react';
import { Layout, Menu } from 'antd';
import { CommentOutlined, MessageOutlined } from '@ant-design/icons';
import { useLazyQuery } from '@apollo/client';
import { queries } from '../../../helpers/graphqlQueries';
import { useChannelDispatch } from '../../../contexts/ChannelContext';
import UserInformation from './UserInformation';
import './sidebar.less';

const { Sider } = Layout;

const SideBar = () => {
  const dispatch = useChannelDispatch();

  const [channels, { loading: channelsLoading }] = useLazyQuery(
    queries.CHANNELS,
    {
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        dispatch({
          type: 'GET_CHANNELS_SUCCESS',
          payload: {
            channels: data.channels
          }
        });
      }
    }
  );

  const [conversations, { loading: conversationsLoading }] = useLazyQuery(
    queries.CONVERSATIONS,
    {
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        dispatch({
          type: 'GET_CONVERSATIONS_SUCCESS',
          payload: {
            conversations: data.conversations
          }
        });
      }
    }
  );

  React.useEffect(() => {
    dispatch({
      type: 'SET_LOADING',
      payload: {
        loading: channelsLoading || conversationsLoading
      }
    });
  }, [channelsLoading, conversationsLoading]);

  return (
    <Sider width={'20vw'} className={'side-bar'}>
      <UserInformation />
      <Menu mode={'inline'} className={'side-bar-menu'} theme={'dark'}>
        <Menu.Item
          key='channels'
          icon={<CommentOutlined />}
          onClick={() => {
            channels();
            dispatch({
              type: 'SET_TYPE',
              payload: { selectedType: 'channels' }
            });
          }}
        >
          Channels
        </Menu.Item>

        <Menu.Item
          key='privateConversations'
          icon={<MessageOutlined />}
          onClick={() => {
            conversations();
            dispatch({
              type: 'SET_TYPE',
              payload: { selectedType: 'conversations' }
            });
          }}
        >
          Conversations
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
