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
  const { selectedType } = useChannelState();
  return (
    <Layout
      style={{
        minHeight: '100%'
      }}
    >
      {/* <AppHeader /> */}
      <Layout>
        <SideBar />
        <Layout
          style={{
            minHeight: '100vh',
            marginLeft: '15vw'
          }}
        >
          <Layout.Content>
            {selectedType ? (
              <ChannelView />
            ) : (
              <Result
                icon={<MessageOutlined />}
                title='Select a channel to the left'
              />
            )}
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Channels;
