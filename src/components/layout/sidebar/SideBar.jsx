import React from 'react';
import { Layout, Menu, Button, Tooltip, Divider, Space, Row, Col } from 'antd';
import {
  CommentOutlined,
  MessageOutlined,
  NumberOutlined,
  PlusCircleOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useQuery, useLazyQuery } from '@apollo/client';
import { queries } from '../../../helpers/graphqlQueries';
import { useChannelDispatch } from '../../../contexts/ChannelContext';
import NewChannelModal from '../../channel/NewChannelModal';
import Avatar from 'antd/lib/avatar/avatar';

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
    <Sider
      width={'15vw'}
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0
      }}
    >
      <Row
        justify={'center'}
        style={{
          marginTop: '15vh'
        }}
      >
        <Col span={6}>
          <Avatar size={64} icon={<UserOutlined />} />
        </Col>
        <Col span={24}>Some@email.com</Col>
      </Row>

      <Menu
        mode={'inline'}
        theme={'light'}
        style={{
          height: '100%'
        }}
      >
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
