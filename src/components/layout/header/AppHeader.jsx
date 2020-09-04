import React from 'react';
import { Layout, Menu, Space, Button, Tooltip, Dropdown } from 'antd';
import './AppHeader.less';
import {
  UserOutlined,
  BellOutlined,
  DownOutlined,
  DashboardOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuthState, useAuthDispatch } from '../../../contexts/AuthContext';

const { Header } = Layout;

const AppHeader = () => {
  const { username } = useAuthState();
  const dispatch = useAuthDispatch();

  const dropdownMenu = (
    <Menu>
      <Menu.Item key='signOut' onClick={() => dispatch({ type: 'SIGN_OUT' })}>
        Sign out
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className='app-header'>
      <div className='logo' />
      <Menu mode='horizontal' defaultSelectedKeys={['2']}>
        <Space style={{ float: 'right' }}>
          <Tooltip title='Profile'>
            <Link to={`/profile/${username}`}>
              <Button shape='circle' icon={<UserOutlined />} />
            </Link>
          </Tooltip>
          {username}
          <Dropdown overlay={dropdownMenu}>
            <Button shape='circle' icon={<DownOutlined />} />
          </Dropdown>
        </Space>
      </Menu>
    </Header>
  );
};

export default AppHeader;
