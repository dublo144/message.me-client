import React from 'react';
import { Layout, PageHeader, Button, Tooltip, Result } from 'antd';
import './channel.less';
import SideBar from '../../components/layout/sidebar/SideBar';
import AppHeader from '../../components/layout/header/AppHeader';
import ChannelView from './ChannelView';
import Editor from '../../components/channel/Editor';
import { useChannelState } from '../../contexts/ChannelContext';
import { MessageOutlined } from '@ant-design/icons';

const Channels = () => {
  const { selectedChannel } = useChannelState();
  return (
    <Layout
      style={{
        minHeight: '100%'
      }}
    >
      <AppHeader />
      <Layout>
        <SideBar />
        <Layout
          style={{
            marginTop: 64,
            minHeight: '90vh',
            padding: '24px 0px',
            marginLeft: '15vw'
          }}
        >
          <Layout.Content
            style={{
              borderRadius: 10,
              overflowY: 'auto',
              backgroundColor: 'white',
              maxHeight: '70vh',
              marginLeft: 24,
              padding: 24
            }}
          >
            {selectedChannel ? (
              <ChannelView />
            ) : (
              <Result
                icon={<MessageOutlined />}
                title='Select a channel to the left'
              />
            )}
          </Layout.Content>
          {selectedChannel && (
            <Layout.Footer
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
            </Layout.Footer>
          )}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Channels;
