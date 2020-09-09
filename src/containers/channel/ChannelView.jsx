import React from 'react';

import { NumberOutlined } from '@ant-design/icons';
import { Divider, Layout, Menu, Row, Col, Typography, Space } from 'antd';

import './channel.less';
import {
  useChannelState,
  useChannelDispatch
} from '../../contexts/ChannelContext';
import { queries } from '../../helpers/graphqlQueries';
import { useAuthState } from '../../contexts/AuthContext';
import { useLazyQuery } from '@apollo/client';
import MessageView from './MessageView';
import Avatar from 'antd/lib/avatar/avatar';
import NewChannelModal from '../../components/channel/NewChannelModal';

const { Content, Sider } = Layout;
const { Title } = Typography;

const ChannelView = () => {
  const {
    selectedType,
    channels,
    selectedChannel,
    conversations,
    loading
  } = useChannelState();
  const dispatch = useChannelDispatch();
  const userId = useAuthState();

  const handleSelectedTypes = () => {
    if (selectedType === 'channels') return channels;
    if (selectedType === 'conversations') return conversations;
  };

  const handleDetails = (id) => {
    if (selectedType === 'channels')
      channelDetails({ variables: { input: id } });
    if (selectedType === 'conversations')
      conversationDetails({ variables: { input: id } });
  };

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
        loading: channelLoading || conversationLoading
      }
    });
  }, [channelLoading, conversationLoading]);

  return (
    <Layout>
      <Content>
        <Layout
          style={{
            minHeight: '100vh',
            marginLeft: '15vw'
          }}
        >
          <Sider
            className={'channel-view-info'}
            width={'15vw'}
            style={{
              height: '100vh',
              position: 'fixed',
              left: '15vw',
              borderRight: 2
            }}
          >
            <Row
              justify={'center'}
              align={'middle'}
              style={{
                paddingTop: '5vh',
                paddingLeft: 24
              }}
            >
              <Col span={20}>
                <Space>
                  <NumberOutlined />
                  <Typography.Text strong>{`Channels (${
                    handleSelectedTypes().length
                  })`}</Typography.Text>
                </Space>
              </Col>
              <Col span={4}>
                <NewChannelModal />
              </Col>
            </Row>
            <Divider />
            <Menu mode='inline' style={{ height: '100%' }}>
              {handleSelectedTypes()?.map((type) => (
                <Menu.Item
                  key={type.id}
                  icon={<NumberOutlined />}
                  onClick={() => {
                    handleDetails(type.id);
                  }}
                >
                  {type.name}
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Content
            style={{
              backgroundColor: 'white',
              padding: '24px 48px',
              minHeight: '100vh'
            }}
          >
            {selectedChannel && <MessageView />}
          </Content>
        </Layout>
      </Content>
      {/* <Footer
          style={{
            height: '20vh',
            position: 'fixed',
            bottom: 0,
            right: 0,
            width: '85%',
            padding: 24
          }}
        >
          <Editor />
        </Footer> */}
    </Layout>
  );
};

export default ChannelView;
