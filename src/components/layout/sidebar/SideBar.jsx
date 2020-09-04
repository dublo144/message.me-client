import React from 'react';
import { Layout, Menu, Button, Tooltip } from 'antd';
import {
  CommentOutlined,
  MessageOutlined,
  NumberOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import { useQuery, useLazyQuery } from '@apollo/client';
import { queries } from '../../../helpers/graphqlQueries';
import {
  useChannelDispatch,
  useChannelState
} from '../../../contexts/ChannelContext';
import NewChannelModal from '../../channel/NewChannelModal';

const { Sider } = Layout;

const SideBar = () => {
  const dispatch = useChannelDispatch();
  const { channels, conversations } = useChannelState();

  const { loading: userDataLoading } = useQuery(queries.USER_DATA, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      dispatch({
        type: 'GET_USER_DATA_SUCCESS',
        payload: {
          channels: data.userData.channels,
          conversations: data.userData.conversations
        }
      });
    },
    onError: (error) =>
      dispatch({
        type: 'GET_USER_DATA_ERROR',
        payload: {
          error
        }
      })
  });

  const [
    channelDetails,
    { loading: channelLoading, subscribeToMore }
  ] = useLazyQuery(queries.CHANNEL_DETAILS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) =>
      dispatch({
        type: 'SELECT_CHANNEL_SUCCESS',
        payload: {
          selectedChannel: data.channelDetails,
          subscribeToMore
        }
      }),
    onError: (error) =>
      dispatch({
        type: 'SELECT_CHANNEL_ERROR',
        payload: {
          error
        }
      })
  });

  const [conversationDetails, { loading: conversationLoading }] = useLazyQuery(
    queries.CONVERSATION_DETAILS,
    {
      fetchPolicy: 'network-only',
      onCompleted: (data) =>
        dispatch({
          type: 'SELECT_CONVERSATION_SUCCESS',
          payload: {
            selectedChannel: data.conversationDetails
          }
        }),
      onError: (error) =>
        dispatch({
          type: 'SELECT_CHANNEL_ERROR',
          payload: {
            error
          }
        })
    }
  );

  React.useEffect(() => {
    dispatch({
      type: 'SET_LOADING',
      payload: {
        loading: userDataLoading || channelLoading || conversationLoading
      }
    });
  }, [userDataLoading, channelLoading, conversationLoading]);

  return (
    <Sider
      width={'15vw'}
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0
      }}
    >
      <Menu
        mode={'inline'}
        theme={'light'}
        defaultOpenKeys={['channels', 'privateConversations']}
        style={{
          paddingLeft: 15,
          paddingTop: '15vh',
          height: '100%',
          borderRight: 0
        }}
      >
        <Menu.SubMenu
          key='channels'
          icon={<CommentOutlined />}
          title='My Channels'
        >
          {channels.map((channel) => (
            <Menu.Item
              key={channel.id}
              onClick={() => {
                channelDetails({ variables: { input: channel.id } });
              }}
              icon={<NumberOutlined />}
            >
              {channel.name}
            </Menu.Item>
          ))}
          <Menu.Item>
            <NewChannelModal />
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu
          key='privateConversations'
          icon={<MessageOutlined />}
          title='Private Conversations'
        >
          {conversations?.map((conversation) => (
            <Menu.Item
              key={conversation.id}
              icon={<MessageOutlined />}
              onClick={() => {
                conversationDetails({ variables: { input: conversation.id } });
              }}
            >
              {conversation.name}
            </Menu.Item>
          ))}
          <Menu.Item>
            <Tooltip title={'New private conversation'} placement={'right'}>
              <Button
                icon={<PlusCircleOutlined />}
                style={{ width: '100%' }}
                type={'dashed'}
              />
            </Tooltip>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Sider>
  );
};

export default SideBar;
